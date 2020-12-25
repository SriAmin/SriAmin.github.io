import {onSnake, expandSnake} from './snake.js'

const GRID_SIZE = 21

let foodCoordinates = getRandCoordinates()
let EXPANSION_RATE = 1

export function update(){
    if (onSnake(foodCoordinates)){
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

function getRandCoordinates() {
    let newFoodCoordinates = {x: Math.floor((Math.random() * GRID_SIZE)), y: Math.floor((Math.random() * GRID_SIZE))}

    while(onSnake(newFoodCoordinates)){
        newFoodCoordinates = {x: Math.floor((Math.random() * GRID_SIZE)), y: Math.floor((Math.random() * GRID_SIZE))}
    }
    console.log(newFoodCoordinates)
    return newFoodCoordinates;
}