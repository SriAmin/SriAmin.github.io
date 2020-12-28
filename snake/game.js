import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeCoordinates, checkSnakeIntersections} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import {draw as drawStartState} from './states/startState.js';
import {draw as drawEndStae} from './states/endState.js';

const snakeBoard = document.getElementById("snakeBoard")
const overlay = document.getElementById("overlay")
overlay.style.display = "block"

overlay.onclick = function () {
    overlay.style.display = "none";
}

const GRID_SIZE = 21;
let gameState = 0;
let lastRenderTime = 0

function update(){
    switch (gameState) {
        case 0:
            if (overlay.style.display == "none")
                gameState += 1;
            break;
        case 1:
            updateSnake()
            updateFood()
            break;
        case 2:
            if (overlay.style.display == "none")
                window.location.reload();
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
            drawSnake(snakeBoard)
            drawFood(snakeBoard)
            const score = document.createElement('h5');

            score.innerText = "Score: 0";

            score.style.gridColumnStart = 0;
            score.style.gridRowStart = 0;
            score.style.color = "white"
            overlay.appendChild(score)
            break;
        case 2:
            drawEndStae(overlay);
            break;
    }
}

function main(currentTime) {
    if (checkDeathCondition()){
        overlay.style.display = "block";
        gameState = 2;
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime-lastRenderTime) / 1000
    
    if (secondsSinceLastRender < 1 / SNAKE_SPEED)
        return    

    lastRenderTime = currentTime
    update()
    draw()
}

function checkDeathCondition() {
    let snakeCoords = getSnakeCoordinates();
    return snakeCoords.x < 1 || snakeCoords.x > GRID_SIZE
                    || snakeCoords.y < 1 || snakeCoords.y > GRID_SIZE || checkSnakeIntersections()
}

window.requestAnimationFrame(main)