const snakeCoordinates = [
    {x: 11, y: 11},
]
let newSegments = 0
let lastVelocity = {x: 0, y:0}
let velocity = {x: 0, y: 1}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (lastVelocity.x != 0) {
                break;
            }
            velocity = {x: -1, y: 0}
            break;
        case 'ArrowDown':
            if (lastVelocity.x != -0)
                break;
            velocity = {x: 1, y: 0}
            break;
        case 'ArrowLeft':
            if (lastVelocity.y != 0) 
                break;
            velocity = {x: 0, y: -1}
            break;
        case 'ArrowRight':
            if (lastVelocity.y != 0) 
                break;
            velocity = {x: 0, y: 1}
            break;
    }
    lastVelocity = velocity
})

export function update(){
    addSegments();

    for (let i = snakeCoordinates.length - 2; i >= 0; i--){
        snakeCoordinates[i + 1] = {...snakeCoordinates[i]}
    }

    snakeCoordinates[0].x += velocity.x;
    snakeCoordinates[0].y += velocity.y;
}

export function draw(gameBoard){
    snakeCoordinates.forEach(coordinate => {
        const segment = document.createElement('div')
        segment.style.gridRowStart = coordinate.x
        segment.style.gridColumnStart = coordinate.y

        segment.classList.add("snake")
        gameBoard.appendChild(segment)
    })
}

export function onSnake(position, ignoreHead = false) {
    return snakeCoordinates.some((segment, index) => {
        if (ignoreHead && index === 0)
            return false
        return equalPositions(segment, position)
    })
}

export function expandSnake(amount) {
    newSegments += amount;
}

export function getSnakeCoordinates() {
    return snakeCoordinates[0]
}

export function checkSnakeIntersections(){
    return onSnake(snakeCoordinates[0], {ignoreHead: true})
}

function equalPositions(pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y;
}

function addSegments() {
    for (let i = 0; i < newSegments; i++){
        snakeCoordinates.push({...snakeCoordinates[snakeCoordinates.length-1]})
    }

    newSegments = 0
}