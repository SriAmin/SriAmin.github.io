import {onSnake} from './snake.js'
import {breakWalls} from './wall.js'

const GRID_SIZE = 32

export let powerupCoordinates = getRandCoordinates()

export function update(){
    if (onSnake(powerupCoordinates)) {
        breakWalls()
        powerupCoordinates = getRandCoordinates()
    }
}

export function draw(gameBoard){
    const powerup = document.createElement('div')
    powerup.style.gridRowStart = powerupCoordinates.x
    powerup.style.gridColumnStart = powerupCoordinates.y

    powerup.classList.add("powerup")
    gameBoard.appendChild(powerup)
}

export function setNewCoordinates(xBoundry, yBoundry){
    console.log(xBoundry)
    let newPowerupCoordinates = {x: Math.floor((Math.random() * (GRID_SIZE - xBoundry))) + xBoundry, y: Math.floor((Math.random() * (GRID_SIZE - yBoundry))) + yBoundry}
    
    while(onSnake(newPowerupCoordinates)){
        newPowerupCoordinates = {x: Math.floor((Math.random() * (GRID_SIZE - xBoundry))) + xBoundry, y: Math.floor((Math.random() * (GRID_SIZE - yBoundry))) + yBoundry}
    }    
    powerupCoordinates = newPowerupCoordinates
}

function getRandCoordinates() {
    let newPowerupCoordinates = {x: Math.floor((Math.random() * GRID_SIZE)) + 1, y: Math.floor((Math.random() * GRID_SIZE)) + 1}

    while(onSnake(newPowerupCoordinates)){
        newPowerupCoordinates = {x: Math.floor((Math.random() * GRID_SIZE)), y: Math.floor((Math.random() * GRID_SIZE))}
    }    
    return newPowerupCoordinates;
}