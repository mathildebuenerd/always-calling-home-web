const instructions = document.querySelector('.instructions');

window.addEventListener('pageLoaded', () => {
    setTimeout(showInstructions, 1000);
    const closeIntructions = document.querySelector('.close-instructions');
    closeIntructions.addEventListener('click', closeInstructions)
});

function showInstructions() {
    instructions.classList.add('show-instructions');
}

function closeInstructions() {
    instructions.classList.remove('show-instructions');
}
