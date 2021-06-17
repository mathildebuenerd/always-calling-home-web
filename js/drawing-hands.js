import {videoElement} from "../mediapipe/js/camera.js";
import {triggerAudioButtons, playSound} from "./sounds.js";

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



console.log({triggerAudioButtons});

export function drawFingers(landmarks) {
    const triggerAudioButton2 = document.querySelectorAll('.trigger-audio');
    const boundingBox = triggerAudioButton2[0].getBoundingClientRect();

    fingers.map((finger) => {
        const dot = document.querySelector('.dot-' + finger);
        const leftPos = landmarks[fingersIndex[finger]].x * videoElement.offsetWidth + 'px';
        const topPos = landmarks[fingersIndex[finger]].y * videoElement.offsetHeight + 'px';
        dot.style.left = leftPos;
        dot.style.top = topPos;

        if (hasEnteredButton(boundingBox, leftPos, topPos)) {
            const event = new CustomEvent('fingerHover', {detail: {index: 0}});
            dot.dispatchEvent(event);
        }

        dot.addEventListener('fingerHover', (e) => {
            console.log('finger has hovered something!', {e}, e.detail)
            playSound(e.detail.index);
        })
    });
}

function hasEnteredButton(boundingBox, leftPos, topPos) {
   const {top, left, width, height} = boundingBox;

    const fingerLeft = parseInt(leftPos);
    const fingerTop = parseInt(topPos);

    if ((fingerLeft > left && fingerLeft < left + width) && (fingerTop > top && fingerTop < top + height)) {
        console.log('I hovered')
        return true;
    }

    return false;
}

