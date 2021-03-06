import {videoElement} from "../mediapipe/js/camera.js";
import {playSound} from "./sounds.js";

const fingersIndex = {
    thumb: 4,
    index: 8,
    middle: 12,
    ring: 16,
    little: 20,
};
const fingers = Object.keys(fingersIndex);
const hands = ['left', 'right'];

let fingerElements = [];

const boundingBoxes = [];

initFingers();
setTimeout(getAudioButtonsPosition, 5000);

export function initFingers() {
        fingers.map((finger) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.classList.add('dot-' + finger);
        document.body.appendChild(dot);

        dot.addEventListener('fingerHover', (e) => {
            e.stopPropagation();
            const box = boundingBoxes[e.detail.index];

            if (box.isActive) {
                return;
            }

            playSound(e.detail.index, () => box.isActive = false);
            box.isActive = true;
        });
    });
    fingerElements = document.querySelectorAll('.dot');
}

function getAudioButtonsPosition() {
    const triggerAudioButtons = document.querySelectorAll('.trigger-audio');

    for (const button of triggerAudioButtons) {
        const data = {
            boundingBox: button.getBoundingClientRect(),
            isActive: false,
        }
        boundingBoxes.push(data);
    }
}

export function drawFingers(landmarks, classification) {
    // const hand = classification.toLowerCase();
    fingerElements.forEach((finger) => finger.classList.remove('hide-dot'));

    fingers.map((finger) => {
        // const dot = document.querySelector('.dot-' + hand + '-' + finger);
        const dot = document.querySelector('.dot-' + finger);
        const leftPos = landmarks[fingersIndex[finger]].x * videoElement.offsetWidth + 'px';
        const topPos = landmarks[fingersIndex[finger]].y * videoElement.offsetHeight + 'px';
        dot.style.left = leftPos;
        dot.style.top = topPos;

        for (const [index, boundingBox] of boundingBoxes.entries()) {
            if (hasEnteredButton(boundingBox.boundingBox, leftPos, topPos)) {
                const event = new CustomEvent('fingerHover', {detail: {index}});
                dot.dispatchEvent(event);
                return;
            }
        }
    });
}

export function hideFingers() {
    fingerElements.forEach((finger) => finger.classList.add('hide-dot'));
}

function hasEnteredButton(boundingBox, leftPos, topPos) {
   const {top, left, width, height} = boundingBox;

    const fingerLeft = parseInt(leftPos);
    const fingerTop = parseInt(topPos);

    return (fingerLeft > left && fingerLeft < left + width) && (fingerTop > top && fingerTop < top + height);
}

