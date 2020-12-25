import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeCoordinates, checkSnakeIntersections} from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'

const snakeBoard = document.getElementById("snakeBoard")
const GRID_SIZE = 21;

let lastRenderTime = 0
let gameOver = false;

function update(){
    updateSnake()
    updateFood()
    checkDeathCondition()
}

function draw(){
    snakeBoard.innerHTML = ''
    drawSnake(snakeBoard)
    drawFood(snakeBoard)
}

function main(currentTime) {
    if (gameOver){
        if (confirm('You lost. Press ok to try again!'))
            window.location.reload()
        return
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
    gameOver = snakeCoords.x < 1 || snakeCoords.x > GRID_SIZE
                    || snakeCoords.y < 1 || snakeCoords.y > GRID_SIZE || checkSnakeIntersections()

}

window.requestAnimationFrame(main)