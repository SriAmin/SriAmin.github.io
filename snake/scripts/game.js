import {update as updatePlayState, draw as drawPlayState} from './playState.js' 
import {GRID_SIZE, GAME_SPEED} from './constants.js'

const snakeBoard = document.getElementById("snakeBoard")
const startScreen = document.getElementById("startScreen")
const gameScreen = document.getElementById("gameScreen")
const endScreen = document.getElementById("endScreen")

const backgroundMusic = new Audio('assets/audio/GourmetRace.mp3')
backgroundMusic.volume = 0.15;
backgroundMusic.loop = true
backgroundMusic.play()

let gameState = 0;
let lastRenderTime = 0

gameScreen.style.background = "rgba(0,0,0,0)"

//Update function updates the logic of the game and its states
function update() {
    switch (gameState) {
        //If the game state is the start screen, adds a function to update the game state
        case 0:
            startScreen.style.display = "flex"

            startScreen.onclick = function(){
                gameState += 1
                startScreen.onclick = null;
                startScreen.style.display = "none"
                gameScreen.style.display = "flex"

                const selectSound = new Audio('assets/audio/Select.wav')
                selectSound.volume = 0.15
                selectSound.loop = false
                selectSound.play()
            }
            break;
        //If the game state is the play state
        case 1:
            //Checks if the snake in the play state was died and update game state if so
            if (updatePlayState(GRID_SIZE)){
                gameScreen.style.display = "none"
                gameState += 1;
                endScreen.style.display = "flex";

                endScreen.onclick = function () {
                    window.location.reload();
                }
            }
            break;
    }
}

//Draw function that restarts the innerHTML and draws the elements based on the game state
function draw(){
    snakeBoard.innerHTML = ''
    gameScreen.innerHTML = ''

    if (gameState != 0)
        drawPlayState(snakeBoard)
}

//Runs the update and draw function constatly
function main(currentTime) {
    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime-lastRenderTime) / 1000
    
    if (secondsSinceLastRender < 1 / GAME_SPEED)
        return

    lastRenderTime = currentTime
    update()
    draw()
}

window.requestAnimationFrame(main)