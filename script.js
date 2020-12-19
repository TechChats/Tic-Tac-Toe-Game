
let xClass = 'x'
let circleClass = 'circle'
let circleTurn


let winning_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]



const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessageID')
const winningMessageText = document.querySelector('[data-winningMessage-text]')
const playAgainButton = document.getElementById('playAgainButton')



startGame()
playAgainButton.addEventListener('click',startGame)


function startGame() {

    circleTurn = false

    cellElements.forEach(cell => {

        cell.classList.remove(xClass)
        cell.classList.remove(circleClass)
        // cell.removeEventListener('click', handleClicks)
        cell.addEventListener('click', handleClicks, { once : true})
    })
    setBoardHover()

    winningMessageElement.classList.remove('show')
}


function handleClicks(e) {
    const cell = e.target
    const currentClass = circleTurn ? circleClass : xClass    
    placeMark(cell, currentClass)
    
    if (checkWins(currentClass)){

        // console.log('wins')
        endTheGame(false)
    }
    else if(isDraw()) {

        endTheGame(true)
    }
    else {

        switchTurns()
        setBoardHover()

    }


}

function endTheGame(draw) {

    if (draw) {
        winningMessageText.innerText = "Draw!"
    }
    else {
        winningMessageText.innerText = `Congrats ${circleTurn ? "Player O " : "Player X "} `
    }

    winningMessageElement.classList.add('show')

}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) || cell.classList.contains(circleClass)
    })
}


function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchTurns() {
    circleTurn = !circleTurn
}

function setBoardHover(){
    board.classList.remove(xClass)
    board.classList.remove(circleClass)

    if(circleTurn) {
        board.classList.add(circleClass)
    }
    else {
        board.classList.add(xClass)
    }
    
}


//selecting winner

function checkWins(currentClass) {
   return winning_combinations.some(combination => {
       return combination.every(index => {
           return cellElements[index].classList.contains(currentClass)
       })
   })
}