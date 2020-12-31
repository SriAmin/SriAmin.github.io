import {getSnakeCoordinates, onSnake} from './snake.js'
import {setNewCoordinates as setNewFoodCoordinates, foodCoordinates} from './food.js'
import {setNewCoordinates as setNewPowerupCoordinates, powerupCoordinates} from './powerup.js'

const GRID_SIZE = 32

let walls = []
let wallsIndex = 1
let wallInterval;

export function update() {
    checkItemCollision()
}

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

export function setWallInterval() {
    wallInterval = window.setInterval(setWalls, Math.floor(Math.random() * 2500) + 2500)
}

export function setWalls() {
    let wall = []

    //Create horizontal sides of the wall
    for (let y = 1; y <= 32; y++) {
        let tempCoordinates = {x: wallsIndex, y: y}
        if (!checkWallInclusion(tempCoordinates))
            wall.push(tempCoordinates)
        
        tempCoordinates = {x: (GRID_SIZE - wallsIndex) + 1, y: y}
        if (!checkWallInclusion(tempCoordinates))
            wall.push(tempCoordinates)
    }
    
    //Create vertical sides of the wall
    for (let x = 1; x <= 32; x++) {
        let tempCoordinates = {x: x, y: wallsIndex}
        if (!checkWallInclusion(tempCoordinates))
            wall.push(tempCoordinates)

        tempCoordinates = {x: x, y: (GRID_SIZE - wallsIndex) + 1}
        if (!checkWallInclusion(tempCoordinates))
            wall.push(tempCoordinates)
    }

    walls.push(wall)
    wallsIndex += 1

    // if (wallsIndex < 16) {
    //     window.setTimeout(setWalls, Math.floor(Math.random() * 2500) + 2500)
    // }

    if (wallsIndex >= 16)
        window.clearInterval(wallInterval)
}

export function checkWallCollision() {
    let snakeCoordinates = getSnakeCoordinates()
    
    if(snakeCoordinates.x < wallsIndex || snakeCoordinates.x > (GRID_SIZE - wallsIndex) + 1)
        return true
    if (snakeCoordinates.y < wallsIndex || snakeCoordinates.y > (GRID_SIZE - wallsIndex) + 1)
        return true

    return false
}

export function breakWalls() {
    if (wallsIndex > 1) {
        console.log(walls)
        walls.pop()
        console.log(walls)
    }

    wallsIndex = Math.min(1, wallsIndex)
}

function checkItemCollision() {
    let collisionCheck = false

    walls.forEach(wallSet => {
        wallSet.forEach(wall => {
            //console.log(wall)
            if (wall.x === foodCoordinates.x && wall.y === foodCoordinates.y)
                setNewFoodCoordinates(wallsIndex, wallsIndex)
            if (wall.x === powerupCoordinates.x && wall.y === powerupCoordinates.y)
                setNewPowerupCoordinates(wallsIndex, wallsIndex)
        });
    });
    return collisionCheck
}


function checkWallInclusion(coordinates) {
    let exist = false;
    walls.forEach(wall => {
        exist = wall.includes(coordinates)
    });

    return exist
}
