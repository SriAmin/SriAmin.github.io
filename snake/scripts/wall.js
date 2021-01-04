import {GRID_SIZE, SNAKE_COORDINATES} from './constants.js'
import {setNewCoordinates as setNewFoodCoordinates, foodCoordinates} from './food.js'
import {setNewCoordinates as setNewPowerupCoordinates, powerupCoordinates} from './powerup.js'

let walls = []
let wallsIndex = 1
let wallInterval;

//Update function to check if the wall collides with food or a powerup
export function update() {
    checkItemCollision()
}

//Draw function to draw each wall in the walls array
export function draw(gameBoard) {
    walls.forEach(wall => {
        wall.forEach(block => {
            const blockElement = document.createElement('div')
            blockElement.style.gridRowStart = block.x
            blockElement.style.gridColumnStart = block.y

            blockElement.classList.add("wall")
            gameBoard.appendChild(blockElement)
        });
    });
}

//Set the interval for the wall spawning
export function setWallInterval() { wallInterval = window.setInterval(setWalls, Math.floor(Math.random() * 2500) + 2500) }

//Clears the wall spawning interval when the game is over
export function clearWallInterval() { window.clearInterval(wallInterval) }

export function setWalls() {
    let wall = []

    //Create horizontal sides of the walls
    for (let y = 1; y <= 32; y++) {
        let tempCoordinates = {x: wallsIndex, y: y}
        if (!checkWallInclusion(tempCoordinates))
            wall.push(tempCoordinates)
        
        tempCoordinates = {x: (GRID_SIZE - wallsIndex) + 1, y: y}
        if (!checkWallInclusion(tempCoordinates))
            wall.push(tempCoordinates)
    }
    
    //Create vertical sides of the walls
    for (let x = 1; x <= 32; x++) {
        let tempCoordinates = {x: x, y: wallsIndex}
        if (!checkWallInclusion(tempCoordinates))
            wall.push(tempCoordinates)

        tempCoordinates = {x: x, y: (GRID_SIZE - wallsIndex) + 1}
        if (!checkWallInclusion(tempCoordinates))
            wall.push(tempCoordinates)
    }

    //Adds the new array of walls and increases the index
    walls.push(wall)
    wallsIndex += 1
}

//Checks if the snake collides with the walls
export function checkWallCollision() {
    let snakeCoordinates = SNAKE_COORDINATES[0]
    
    if(snakeCoordinates.x < wallsIndex || snakeCoordinates.x > (GRID_SIZE - wallsIndex) + 1)
        return true
    if (snakeCoordinates.y < wallsIndex || snakeCoordinates.y > (GRID_SIZE - wallsIndex) + 1)
        return true

    return false
}

//Take the last set of walls and removes them, makes sure that walls exist in the array
export function breakWalls() {
    if (wallsIndex > 1) {
        walls.pop()
    }

    wallsIndex = Math.min(1, wallsIndex)
}

//Returns if food or the powerups collides with the walls
function checkItemCollision() {
    let collisionCheck = false

    walls.forEach(wallSet => {
        wallSet.forEach(wall => {
            if (wall.x === foodCoordinates.x && wall.y === foodCoordinates.y)
                setNewFoodCoordinates(wallsIndex)
            if (wall.x === powerupCoordinates.x && wall.y === powerupCoordinates.y)
                setNewPowerupCoordinates(wallsIndex)
        });
    });
    return collisionCheck
}

//Makes sure that the new segments don't exist in the walls arrays
function checkWallInclusion(coordinates) {
    let exist = false;
    walls.forEach(wall => {
        exist = wall.includes(coordinates)
    });

    return exist
}
