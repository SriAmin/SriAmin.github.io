import {update as updateSnake, draw as drawSnake, getSnakeCoordinates, checkSnakeIntersections} from '../snake.js'
import { update as updateFood, draw as drawFood } from '../food.js'
import {update as updatePowerup, draw as drawPowerup} from '../powerup.js'
import {update as updateWall, draw as drawWall, checkWallCollision, setWalls, setWallInterval} from '../wall.js'

let wallIntervalCheck = false

export function update(gridSize) {
    if (!wallIntervalCheck){
        setWallInterval()
        wallIntervalCheck = true
    }
    updateSnake()
    updateFood()
    updatePowerup()
    updateWall()
    return checkDeathCondition(gridSize)
}

export function draw(gameBoard){
    drawSnake(gameBoard)
    drawFood(gameBoard)
    drawPowerup(gameBoard)
    drawWall(gameBoard)

    const score = document.createElement('h3');

    score.innerText = "Score: 0";
    score.style.color = "white"
    score.style.justifySelf = "flex-start"
    score.style.backgroundColor = "#100F10"
    gameScreen.appendChild(score)
}

function checkDeathCondition(gridSize) {
    let snakeCoords = getSnakeCoordinates();
    return snakeCoords.x < 1 || snakeCoords.x > gridSize
                    || snakeCoords.y < 1 || snakeCoords.y > gridSize || checkSnakeIntersections() || checkWallCollision()
}