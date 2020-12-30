import {draw as drawSnake} from '../snake.js'

export function update(overlay){
    overlay.onclick = function () {
        window.location.reload();
    }
}

export function draw(gameBoard) {    
    const title = document.createElement('h1');
    title.classList.add('overlayText')
    title.innerText = "Game Over";
    title.style.left = "46%"

    
    const subtitle = document.createElement("h2")
    subtitle.classList.add('overlayText')
    subtitle.innerText = "Click Anywhere to Reload"
    subtitle.style.marginTop = "25vh"
    subtitle.style.left = "43%"

    gameBoard.appendChild(title)
    gameBoard.appendChild(subtitle)
}