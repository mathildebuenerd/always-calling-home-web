const files = [
    '8873_(1992_UM2)_2458048_25593',
    '8873_(1992_UM2)_Loop_Max_',
    '10144_(1994_AB2)_Loop_Max',
    '8369_Miyata_(1991_GR)_Loop_Max',
    '10144_(1994_AB2)_2458055_26304_python',
];

const audioList = [];

window.addEventListener('DOMContentLoaded', () => {
    files.map((file, index) => {
        const audio = new Audio('sounds/' + file + '.mp3');
        audioList.push(audio);

        const offset = 200;

        const image = document.createElement('img');
        image.src = `images/rocks/rock_${index}.png`;
        image.classList.add('trigger-audio');
        image.style.left = Math.random() * (window.innerWidth - offset) + offset/2 + 'px';
        image.style.top = Math.random() * (window.innerHeight - offset) + offset/2 + 'px';

        document.body.appendChild(image);
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

    // Animate the rock
    giveVisualFeedback(audioIndex, durationInSeconds);

    setTimeout(() => {
        console.log('I stop playing ' + files[audioIndex])
        callback();
    }, durationInMilliseconds)
}

function giveVisualFeedback(index, durationInSeconds) {
    const image = document.querySelector(`.trigger-audio:nth-of-type(${index + 1})`);
    image.style.animation = `rockFloat${index} 4s infinite`;
    setTimeout(() => {
        image.style.animation = '';
    }, durationInSeconds * 1000)
}
