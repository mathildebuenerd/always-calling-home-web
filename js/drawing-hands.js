import {videoElement} from "../mediapipe/js/camera.js";

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
    fingers.map((finger) => {
        const dot = document.querySelector('.dot-' + finger);
        dot.style.left = landmarks[fingersIndex[finger]].x * videoElement.offsetWidth + 'px';
        dot.style.top = landmarks[fingersIndex[finger]].y * videoElement.offsetHeight + 'px';
    });
}
