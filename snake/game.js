import {update as updateStartState, draw as drawStartState} from './states/startState.js';
import {update as updatePlayState, draw as drawPlayState} from './states/playState.js' 
import {update as updateEndState, draw as drawEndStae} from './states/endState.js';

const snakeBoard = document.getElementById("snakeBoard")
const overlay = document.getElementById("overlay")

const GRID_SIZE = 32;
const GAME_SPEED = 10;

let gameState = 0;
let lastRenderTime = 0
let wallInterval

function update(){
    switch (gameState) {
        case 0:
            overlay.onclick = function(){
                gameState += 1
                overlay.onclick = null;
                overlay.style.backgroundColor = "rgba(0,0,0,0)"
            }
            break;
        case 1:
            if (updatePlayState(GRID_SIZE)){
                overlay.style.display = "block";
                overlay.style.backgroundColor = "rgba(0,0,0,0.7)"
                gameState += 1;
            }
            break;
        case 2:
            updateEndState(overlay)
            break;
    }
}

function draw(){
    snakeBoard.innerHTML = ''
    overlay.innerHTML = ''
    switch (gameState) {
        case 0:
            drawStartState(overlay);
            break;
        case 1:
            drawPlayState(snakeBoard)
            break;
        case 2:
            drawEndStae(overlay);
            drawPlayState(snakeBoard);
            break;
    }
}

function main(currentTime) {
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime-lastRenderTime) / 1000
    
    if (secondsSinceLastRender < 1 / GAME_SPEED)
        return    

    lastRenderTime = currentTime
    update()
    draw()
}

window.requestAnimationFrame(main)