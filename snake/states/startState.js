export function draw(gameBoard){
    const instruction = document.createElement('h1');

    instruction.innerText = "-Enter-";

    instruction.style.gridColumnStart = 10;
    instruction.style.gridRowStart = 10;
    instruction.style.gridArea = "span 5 / span 5";
    instruction.style.color = "white"
    gameBoard.appendChild(instruction)
}