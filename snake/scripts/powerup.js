import {onSnake} from './snake.js'
import {breakWalls} from './wall.js'
import {GRID_SIZE} from './constants.js'

export let powerupCoordinates = getRandCoordinates()

//Updates and checks if the snake intersects with the powerup
export function update(){
    if (onSnake(powerupCoordinates)) {
        const powerupSound = new Audio('assets/audio/Powerup.wav')
        powerupSound.volume = 0.15
        powerupSound.loop = false
        powerupSound.play()

        breakWalls()
        powerupCoordinates = getRandCoordinates()
    }
}

//Draws the powerup element on the snake board
export function draw(gameBoard){
    const powerup = document.createElement('div')
    powerup.style.gridRowStart = powerupCoordinates.x
    powerup.style.gridColumnStart = powerupCoordinates.y

    powerup.classList.add("powerup")
    gameBoard.appendChild(powerup)
}

//Sets the new cooordinates for the powerup within the walls if it collides with the walls
export function setNewCoordinates(boundry){
    let newPowerupCoordinates = {x: Math.floor((Math.random() * (GRID_SIZE - boundry))) + boundry, y: Math.floor((Math.random() * (GRID_SIZE - boundry))) + boundry}
    
    while(onSnake(newPowerupCoordinates)){
        newPowerupCoordinates = {x: Math.floor((Math.random() * (GRID_SIZE - boundry))) + boundry, y: Math.floor((Math.random() * (GRID_SIZE - boundry))) + boundry}
    }    
    powerupCoordinates = newPowerupCoordinates
}

//Set random coordinates for the powerup, makes sure it doesn't intersect with the snake
function getRandCoordinates() {
    let newPowerupCoordinates = {x: Math.floor((Math.random() * GRID_SIZE)) + 1, y: Math.floor((Math.random() * GRID_SIZE)) + 1}

    while(onSnake(newPowerupCoordinates)){
        newPowerupCoordinates = {x: Math.floor((Math.random() * GRID_SIZE)), y: Math.floor((Math.random() * GRID_SIZE))}
    }    
    return newPowerupCoordinates;
}