import {onSnake, expandSnake} from './snake.js'

const GRID_SIZE = 32
const EXPANSION_RATE = 1

export let foodCoordinates = getRandCoordinates()

export function update(){
    if (onSnake(foodCoordinates)) {
        expandSnake(EXPANSION_RATE)
        foodCoordinates = getRandCoordinates()
    }
}

export function draw(gameBoard){
    const food = document.createElement('div')
    food.style.gridRowStart = foodCoordinates.x
    food.style.gridColumnStart = foodCoordinates.y

    food.classList.add("food")
    gameBoard.appendChild(food)
}

export function setNewCoordinates(xBoundry, yBoundry){
    console.log(xBoundry)
    let newFoodCoordinates = {x: Math.floor((Math.random() * (GRID_SIZE - xBoundry))) + xBoundry, y: Math.floor((Math.random() * (GRID_SIZE - yBoundry))) + yBoundry}
    
    while(onSnake(newFoodCoordinates)){
        newFoodCoordinates = {x: Math.floor((Math.random() * (GRID_SIZE - xBoundry))) + xBoundry, y: Math.floor((Math.random() * (GRID_SIZE - yBoundry))) + yBoundry}
    }    
    console.log(newFoodCoordinates)
    foodCoordinates = newFoodCoordinates
}

function getRandCoordinates() {
    let newFoodCoordinates = {x: Math.floor((Math.random() * GRID_SIZE)) + 1, y: Math.floor((Math.random() * GRID_SIZE)) + 1}

    while(onSnake(newFoodCoordinates)){
        newFoodCoordinates = {x: Math.floor((Math.random() * GRID_SIZE)), y: Math.floor((Math.random() * GRID_SIZE))}
    }    
    return newFoodCoordinates;
}