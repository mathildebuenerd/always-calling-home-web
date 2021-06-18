const files = [
    '8873_(1992_UM2)_2458048_25593',
    '10144_(1994_AB2)_Loop_Max',
];

const audioList = [];

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
});


export function playSound(audioIndex, callback) {
    const audio = audioList[audioIndex];
    console.log('I am playing ' + files[audioIndex])

    // During the sound playing, we set isActive to true,
    // and prevent the sound to be played again
    // After the sound has end, we set it back to false using the callback
    const {duration: durationInSeconds} = audio;
    const durationInMilliseconds = durationInSeconds * 1000;
    audio.play();
    setTimeout(() => {
        console.log('I stop playing ' + files[audioIndex])
        callback();
    }, durationInMilliseconds)
}
