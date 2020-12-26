import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeCoordinates, checkSnakeIntersections} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import {draw as drawStartState} from './states/startState.js';
import {draw as drawEndStae} from './states/endState.js';

const snakeBoard = document.getElementById("snakeBoard")
const title = document.getElementById("title")

const GRID_SIZE = 21;
let gameState = 0;
let lastRenderTime = 0

function update(){
    switch (gameState) {
        case 0:
            document.addEventListener('keydown', gameStateIncrement)
            break;
        case 1:
            updateSnake()
            updateFood()
            break;
        case 2:
            document.addEventListener('keydown', () => {
                window.location.reload()
            })
            break;
    }
}

function draw(){
    snakeBoard.innerHTML = ''
    title.innerHTML = ''
    switch (gameState) {
        case 0:
            drawStartState(title);
            break;
        case 1:
            drawSnake(snakeBoard)
            drawFood(snakeBoard)
            break;
        case 2:
            drawEndStae(title);
            break;
    }
}

function main(currentTime) {
    if (checkDeathCondition()){
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

function gameStateIncrement(){
    gameState += 1;
    document.removeEventListener('keydown', gameStateIncrement)
}

function checkDeathCondition() {
    let snakeCoords = getSnakeCoordinates();
    return snakeCoords.x < 1 || snakeCoords.x > GRID_SIZE
                    || snakeCoords.y < 1 || snakeCoords.y > GRID_SIZE || checkSnakeIntersections()
}

window.requestAnimationFrame(main)