export function update(overlay){
    overlay.onclick = function(){
        gameState += 1
        overlay.onclick = null;
    }
}

export function draw(gameBoard){
    // const title = document.createElement('h1');
    // title.classList.add('overlayText')
    // title.innerText = "Welcome to Snake";

    // const subtitle = document.createElement("h2")
    // subtitle.classList.add('overlayText')
    // subtitle.innerText = "Click Anywhere to Play"
    // subtitle.style.marginTop = "25vh"

    // gameBoard.appendChild(title)
    // gameBoard.appendChild(subtitle)
}