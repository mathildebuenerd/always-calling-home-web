const files = [
    '8873_(1992_UM2)_2458048_25593',
    '10144_(1994_AB2)_Loop_Max',
];

const audioList = [];

export let triggerAudioButtons;
window.addEventListener('DOMContentLoaded', () => {
    files.map((file) => {
        const audio = new Audio('sounds/' + file + '.mp3');
        audioList.push(audio);

        const button = document.createElement('button');
        button.textContent = 'hover me';
        button.classList.add('trigger-audio');
        button.style.left = Math.random() * window.innerWidth + 'px';
        button.style.top = Math.random() * window.innerHeight + 'px';
        document.body.appendChild(button);
    });

    triggerAudioButtons = document.querySelectorAll('.trigger-audio');
});


export function playSound(audioIndex) {
    const audio = audioList[audioIndex];
    audio.play();
}
