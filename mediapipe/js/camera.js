// Colors
import {drawFingers} from "../../js/drawing-hands.js";

const colorWhite = '#FFF';

// Our input frames will come from here.
export const videoElement =
    document.getElementsByClassName('input_video')[0];
const canvasElement =
    document.getElementsByClassName('output_canvas')[0];
const controlsElement =
    document.getElementsByClassName('control-panel')[0];
const canvasCtx = canvasElement.getContext('2d');

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new FPS();

// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector('.loading');
spinner.ontransitionend = () => {
    spinner.style.display = 'none';
};

function onResults(results) {
    // Hide the spinner.
    document.body.classList.add('loaded');

    // Update the frame rate.
    fpsControl.tick();

    if (results.multiHandLandmarks && results.multiHandedness) {
        for (let index = 0; index < results.multiHandLandmarks.length; index++) {
            const classification = results.multiHandedness[index];
            const isRightHand = classification.label === 'Right';
            const landmarks = results.multiHandLandmarks[index];
            drawFingers(landmarks)
        }
    }
}

const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
    }});
hands.onResults(onResults);

/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.
 */
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({image: videoElement});
    },
    width: 640,
    height: 360
});
camera.start();

// Present a control panel through which the user can manipulate the solution
// options.
new ControlPanel(controlsElement, {
    selfieMode: true,
    maxNumHands: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
})
    .add([
        new StaticText({title: 'MediaPipe Hands'}),
        fpsControl,
        new Toggle({title: 'Selfie Mode', field: 'selfieMode'}),
        new Slider(
            {title: 'Max Number of Hands', field: 'maxNumHands', range: [1, 4], step: 1}),
        new Slider({
            title: 'Min Detection Confidence',
            field: 'minDetectionConfidence',
            range: [0, 1],
            step: 0.01
        }),
        new Slider({
            title: 'Min Tracking Confidence',
            field: 'minTrackingConfidence',
            range: [0, 1],
            step: 0.01
        }),
    ])
    .on(options => {
        videoElement.classList.toggle('selfie', options.selfieMode);
        hands.setOptions(options);
    });
