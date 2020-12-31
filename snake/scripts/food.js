import {onSnake, expandSnake} from './snake.js'
import {GRID_SIZE} from './constants.js'

export let foodCoordinates = getRandCoordinates()

//Updates the food element and see if it intersects with the snake
export function update(){
    if (onSnake(foodCoordinates)) {
        expandSnake()
        foodCoordinates = getRandCoordinates()
    }
}

//Draws the food element on the snake board
export function draw(gameBoard){
    const food = document.createElement('div')
    food.style.gridRowStart = foodCoordinates.x
    food.style.gridColumnStart = foodCoordinates.y

    food.classList.add("food")
    gameBoard.appendChild(food)
}

//Sets the new cooordinates for the food within the walls if it collides with the walls
export function setNewCoordinates(boundry){
    let newFoodCoordinates = {x: Math.floor((Math.random() * (GRID_SIZE - boundry))) + boundry, y: Math.floor((Math.random() * (GRID_SIZE - boundry))) + boundry}
    
    while(onSnake(newFoodCoordinates)){
        newFoodCoordinates = {x: Math.floor((Math.random() * (GRID_SIZE - boundry))) + boundry, y: Math.floor((Math.random() * (GRID_SIZE - boundry))) + boundry}
    }    
    console.log(newFoodCoordinates)
    foodCoordinates = newFoodCoordinates
}

//Set random coordinates for the food, makes sure it doesn't intersect with the snake
function getRandCoordinates() {
    let newFoodCoordinates = {x: Math.floor((Math.random() * GRID_SIZE)) + 1, y: Math.floor((Math.random() * GRID_SIZE)) + 1}

    while(onSnake(newFoodCoordinates)){
        newFoodCoordinates = {x: Math.floor((Math.random() * GRID_SIZE)), y: Math.floor((Math.random() * GRID_SIZE))}
    }    
    return newFoodCoordinates;
}