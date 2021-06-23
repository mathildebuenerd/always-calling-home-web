const files = [
    '8873_(1992_UM2)_2458048_25593',
    '8873_(1992_UM2)_Loop_Max_',
    '10144_(1994_AB2)_Loop_Max',
    '8369_Miyata_(1991_GR)_Loop_Max',
    '10144_(1994_AB2)_2458055_26304_python',
    '10181_Davidacomba_(1996_FP3)_Loop_Max',
    '11184_Postma_(1998_HJ9)_2458165_40164',
    '11184_Postma_(1998_HJ9)Loop_Max',
    '13169_(1995_XS1)_2458055_26304',
];

// Positions [top, left] in percentage for each trigger
const positions = [
    [15, 60],
    [25, 70],
    [30, 20],
    [40, 15],
    [45, 50],
    [50, 40],
    [65, 30],
    [55, 70],
    [80, 45],
];

const audioList = [];

window.addEventListener('DOMContentLoaded', () => {
    files.map((file, index) => {
        const audio = new Audio('sounds/' + file + '.mp3');
        audioList.push(audio);

        const triggerAudio = document.createElement('figure');
        triggerAudio.classList.add('trigger-audio');
        triggerAudio.style.left = positions[index][0] + '%';
        triggerAudio.style.top = positions[index][1] + '%';

        const image = document.createElement('img');
        image.src = `images/rocks/rock_${index}.png`;

        triggerAudio.appendChild(image);
        document.body.appendChild(triggerAudio);
    });
});


export function playSound(audioIndex, callback) {
    const audio = audioList[audioIndex];

    // During the sound playing, we set isActive to true,
    // and prevent the sound to be played again
    // After the sound has end, we set it back to false using the callback
    const {duration: durationInSeconds} = audio;
    const durationInMilliseconds = durationInSeconds * 1000;
    audio.play();

    // Animate the rock
    giveVisualFeedback(audioIndex, durationInSeconds);

    // Executes after the sound has ended
    setTimeout(callback, durationInMilliseconds)
}

function giveVisualFeedback(index, durationInSeconds) {
    const durationInMilliseconds = durationInSeconds * 1000;

    // Change background color
    const background = document.querySelector('.container');
    background.classList.add('flash-custom-background');

    setTimeout(() => {
        background.classList.remove('flash-custom-background');
    }, 1000)

    // Animate rock
    // We select the element using nth-of-type and this works because
    // only triggerAudio blocks are <figure>. If other figures
    // are added to the page, bugs can appear
    const triggerAudio = document.querySelector(`figure.trigger-audio:nth-of-type(${index + 1})`);
    triggerAudio.style.animation = `rockFloat${index} 4s infinite`;

    // Add the blue ear
    const ear = document.createElement('img');
    ear.src = 'images/blue_ear.png';
    ear.style.position = 'absolute';

    // Adding some offset to put the ear in the center of the image
    // and not on the top left
    ear.style.left = Math.random() * 80 + 'px';
    ear.style.top = Math.random() * 50 + 'px';

    triggerAudio.appendChild(ear);

    setTimeout(() => {
        triggerAudio.style.animation = '';

        // Ear disappears progressively
        ear.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            ear.remove();
        }, 500);
    }, durationInMilliseconds);
}
