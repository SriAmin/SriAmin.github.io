import {update as updateStartState, draw as drawStartState} from './states/startState.js';
import {update as updatePlayState, draw as drawPlayState} from './states/playState.js' 
import {update as updateEndState, draw as drawEndStae} from './states/endState.js';

const snakeBoard = document.getElementById("snakeBoard")
const startScreen = document.getElementById("startScreen")
const gameScreen = document.getElementById("gameScreen")
const endScreen = document.getElementById("endScreen")

gameScreen.style.background = "rgba(0,0,0,0)"

const GRID_SIZE = 32;
const GAME_SPEED = 10;

let gameState = 0;
let lastRenderTime = 0
let wallInterval

function update(){
    switch (gameState) {
        case 0:
            startScreen.style.display = "flex"
            startScreen.onclick = function(){
                gameState += 1
                startScreen.onclick = null;
                startScreen.style.display = "none"
                gameScreen.style.display = "flex"
            }
            break;
        case 1:
            if (updatePlayState(GRID_SIZE)){
                gameScreen.style.display = "none"
                endScreen.style.display = "flex";
                gameState += 1;

                endScreen.onclick = function () {
                    window.location.reload();
                }
            }
            break;
        case 2:
            //updateEndState(overlay)
            break;
    }
}

function draw(){
    snakeBoard.innerHTML = ''
    gameScreen.innerHTML = ''
    switch (gameState) {
        case 0:
            //drawStartState(overlay);
            break;
        case 1:
            drawPlayState(snakeBoard)
            break;
        case 2:
            //drawEndStae(overlay);
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