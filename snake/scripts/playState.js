import {update as updateSnake, draw as drawSnake, checkSnakeIntersections, score} from './snake.js'
import {update as updateFood, draw as drawFood} from './food.js'
import {update as updatePowerup, draw as drawPowerup} from './powerup.js'
import {update as updateWall, draw as drawWall, checkWallCollision, setWallInterval, clearWallInterval} from './wall.js'
import {SNAKE_COORDINATES} from './constants.js'

let scoreInterval
let intervalCheck = false

//Updates logic for snake, food, powerup and walls for the game
export function update(gridSize) {
    //Sets the interval to spawn the walls on a random timer
    if (!intervalCheck) {
        setWallInterval()
        intervalCheck = true
    }

    updateSnake()
    updateFood()
    updatePowerup()
    updateWall()

    //Clears the interval if the snake has died
    if (checkDeathCondition(gridSize)) {
        const deathSound = new Audio('assets/audio/Death.wav')
        deathSound.volume = 0.05
        deathSound.loop = false
        deathSound.play()

        clearWallInterval()
        window.clearInterval(scoreInterval)
        return true
    }
    else {
        return false
    }
}

//Draw function to draw the snake, food, powerup, and walls, along with the score
export function draw(gameBoard) {
    drawSnake(gameBoard)
    drawFood(gameBoard)
    drawPowerup(gameBoard)
    drawWall(gameBoard)

    const scoreElement = document.createElement('h3');

    scoreElement.innerText = 'Score: ' + score
    scoreElement.style.color = "white"
    scoreElement.style.justifySelf = "flex-start"
    scoreElement.style.backgroundColor = "#100F10"
    scoreElement.style.padding = '15px'
    scoreElement.style.borderRadius = '15px'

    gameScreen.appendChild(scoreElement)
}

//Returns the death condition of the game
function checkDeathCondition(gridSize) {
    let snakeCoords = SNAKE_COORDINATES[0]
    return snakeCoords.x < 1 || snakeCoords.x > gridSize
                    || snakeCoords.y < 1 || snakeCoords.y > gridSize || checkSnakeIntersections() || checkWallCollision()
}