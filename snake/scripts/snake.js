import {SNAKE_COORDINATES, EXPANSION_RATE} from './constants.js'

let newSegments = 0
let velocity = {x: 0, y: 1}
let lastVelocity = {x: 0, y:0}

export let score = 0;

//Updates the snake to check if new segments are added and move it based on velocity
export function update(){
    addSegments();

    for (let i = SNAKE_COORDINATES.length - 2; i >= 0; i--){
        SNAKE_COORDINATES[i + 1] = {...SNAKE_COORDINATES[i]}
    }

    SNAKE_COORDINATES[0].x += velocity.x;
    SNAKE_COORDINATES[0].y += velocity.y;
}

//Draws each segment of the snake
export function draw(gameBoard){
    SNAKE_COORDINATES.forEach(coordinate => {
        const segment = document.createElement('div')
        segment.style.gridRowStart = coordinate.x
        segment.style.gridColumnStart = coordinate.y

        segment.classList.add("snake")
        gameBoard.appendChild(segment)
    })
}

//Returns if a position intersects with the snake
export function onSnake(position, ignoreHead = false) {
    return SNAKE_COORDINATES.some((segment, index) => {
        if (ignoreHead && index === 0)
            return false
        return equalPositions(segment, position)
    })
}

//Add a segment to the snake when it eats food
export function expandSnake() { newSegments += EXPANSION_RATE; }

//Checks if the head of a snake intersects with its own body
export function checkSnakeIntersections() { return onSnake(SNAKE_COORDINATES[0], {ignoreHead: true}) }

export function updateScore() { score += 1000 }

//Check if two postions and equal to each other
function equalPositions(pos1, pos2) { return pos1.x === pos2.x && pos1.y === pos2.y; }

//Adds segments to the snake
function addSegments() {
    for (let i = 0; i < newSegments; i++){
        SNAKE_COORDINATES.push({...SNAKE_COORDINATES[SNAKE_COORDINATES.length-1]})
    }

    newSegments = 0
}

//Event listner to change the velocity based on the key entered
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastVelocity.x === 0)
                velocity = {x: -1, y: 0}
            break;
        case 'ArrowDown':
            if (lastVelocity.x === -0)
                velocity = {x: 1, y: 0}
            break;
        case 'ArrowLeft':
            if (lastVelocity.y === 0) 
                velocity = {x: 0, y: -1}
            break;
        case 'ArrowRight':
            if (lastVelocity.y === 0) 
                velocity = {x: 0, y: 1}
            break;
    }

    lastVelocity = velocity
})