import {update as updateSnake, draw as drawSnake, getSnakeCoordinates, checkSnakeIntersections} from '../snake.js'
import { update as updateFood, draw as drawFood } from '../food.js'

export function update(gridSize){
    updateSnake()
    updateFood()
    return checkDeathCondition(gridSize)
}

export function draw(gameBoard){
    drawSnake(gameBoard)
    drawFood(gameBoard)

    const score = document.createElement('h3');

    score.innerText = "Score: 0";
    score.style.color = "white"
    score.style.alignSelf = "flex-start"
    overlay.appendChild(score)
}

function checkDeathCondition(gridSize) {
    let snakeCoords = getSnakeCoordinates();
    return snakeCoords.x < 1 || snakeCoords.x > gridSize
                    || snakeCoords.y < 1 || snakeCoords.y > gridSize || checkSnakeIntersections()
}