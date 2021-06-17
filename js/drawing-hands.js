import {videoElement} from "../mediapipe/js/camera.js";
import {playSound} from "./sounds.js";

const fingersIndex = {
    thumb: 4,
    index: 8,
    middle: 12,
    ring: 16,
    little: 20,
}

const fingers = Object.keys(fingersIndex);

initFingers();

export function initFingers() {
    fingers.map((finger) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.classList.add('dot-' + finger);
        document.body.appendChild(dot);
    });
}

export function drawFingers(landmarks) {
    const triggerAudioButtons = document.querySelectorAll('.trigger-audio');

    const boundingBoxes = [];
    for (const button of triggerAudioButtons) {
        boundingBoxes.push(button.getBoundingClientRect());
    }

    fingers.map((finger) => {
        const dot = document.querySelector('.dot-' + finger);
        const leftPos = landmarks[fingersIndex[finger]].x * videoElement.offsetWidth + 'px';
        const topPos = landmarks[fingersIndex[finger]].y * videoElement.offsetHeight + 'px';
        dot.style.left = leftPos;
        dot.style.top = topPos;

        for (const [index, boundingBox] of boundingBoxes.entries()) {
            if (hasEnteredButton(boundingBox, leftPos, topPos)) {
                const event = new CustomEvent('fingerHover', {detail: {index}});
                dot.dispatchEvent(event);
            }
        }

        dot.addEventListener('fingerHover', (e) => {
            playSound(e.detail.index);
        })
    });
}

function hasEnteredButton(boundingBox, leftPos, topPos) {
   const {top, left, width, height} = boundingBox;

    const fingerLeft = parseInt(leftPos);
    const fingerTop = parseInt(topPos);

    return (fingerLeft > left && fingerLeft < left + width) && (fingerTop > top && fingerTop < top + height);
}

