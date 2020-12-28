export function draw(gameBoard) {
    const instruction = document.createElement('h1');
    instruction.classList.add('overlayText')
    instruction.innerText = "-Game Over-";
    gameBoard.appendChild(instruction)
}