//Selecting HTML elements
const twoPlayerButton = document.querySelector('#two-player-game-select')
const threePlayerButton = document.querySelector('#three-player-game-select')
const playerSelectionPane = document.querySelector('#num-player-select')
const scoreTrackerPane = document.querySelector('#score-tracker')
const scoringButtons = document.querySelector('#scoring-buttons')
const nextPlayerButtonDiv = document.querySelector('#next-player-button-div')
const nextPlayerButton = document.querySelector('#next-player-button')
const currentPlayerElement = document.querySelector('#current-player')
const resetButton = document.querySelector('#reset-button')
var maxPlayers
var currentRolls = 0

//Parsing maximum score game will be played to
const maxscoreElement = document.querySelector('#max-score')
let maxScore = maxscoreElement.value

//update max score variable when selection is changed
maxscoreElement.addEventListener('change', function () {
	maxScore = parseInt(this.value)
})

//Initializing players
const p1 = {
	score: 0,
	scoreElement: document.querySelector('#p1-score'),
}

const p2 = {
	score: 0,
	scoreElement: document.querySelector('#p2-score'),
}

const p3 = {
	score: 0,
	scoreElement: document.querySelector('#p3-score'),
}

var currentPlayer = 1

//Adding click listeners
twoPlayerButton.addEventListener('click', () => {
	playerSelectionPane.classList.toggle('hide')
	scoreTrackerPane.classList.toggle('hide')
	document.querySelector('#p3-score').classList.toggle('hide')
	scoringButtons.classList.toggle('hide')
	nextPlayerButtonDiv.classList.toggle('hide')
	maxPlayers = 2
})

threePlayerButton.addEventListener('click', () => {
	playerSelectionPane.classList.toggle('hide')
	scoreTrackerPane.classList.toggle('hide')
	scoringButtons.classList.toggle('hide')
	nextPlayerButtonDiv.classList.toggle('hide')
	maxPlayers = 3
})

nextPlayerButton.addEventListener('click', () => {
	var playerColor
	currentPlayer = (currentPlayer % maxPlayers) + 1
	if (currentPlayer === 1) {
		playerColor = '(Blue)'
		currentPlayerElement.style.color = 'blue'
	} else if (currentPlayer === 2) {
		playerColor = '(Green)'
		currentPlayerElement.style.color = 'green'
	} else {
		playerColor = '(Red)'
		currentPlayerElement.style.color = 'red'
	}
	currentPlayerElement.textContent = `P${currentPlayer} ${playerColor}`
	removeDisabled()
	currentRolls = 0
})

resetButton.addEventListener('click', reset)

//Gathering all score buttons and adding a click listener to each
const scoreButtonsArray = document.querySelectorAll('.score-button')
for (b of scoreButtonsArray) {
	const value = parseInt(b.textContent)
	b.addEventListener('click', () => {
		addScoreValue(value)
		if (currentPlayer === 1) {
			p1.scoreElement.textContent = p1.score
		} else if (currentPlayer === 2) {
			p2.scoreElement.textContent = p2.score
		} else {
			p3.scoreElement.textContent = p3.score
		}
		currentRolls++
		checkRolls()
	})
}

//reset scores
function reset() {
	p1.score = 0
	p2.score = 0
	p3.score = 0

	p1.scoreElement.textContent = 0
	p2.scoreElement.textContent = 0
	p3.scoreElement.textContent = 0

	currentRolls = 0

	currentPlayer = 1
	currentPlayerElement.textContent = 'P1 (Blue)'
	currentPlayerElement.style.color = 'blue'

	removeDisabled()
	nextPlayerButton.removeAttribute('disabled')
	victoryAnimationElement.classList.remove('victory')
	victoryAnimationElement.classList.add('hide')
}

//If 4 rolls have been counted, disable buttons
function checkRolls() {
	if (currentRolls >= 4) {
		toggleButtonDisable()
	}
}

//restore buttons from disabled state
function toggleButtonDisable() {
	for (b of scoreButtonsArray) {
		b.toggleAttribute('disabled')
	}
}

//remove disabled attribute from score buttons
function removeDisabled() {
	for (b of scoreButtonsArray) {
		b.removeAttribute('disabled')
	}
}

function addScoreValue(amount) {
	if (currentPlayer === 1) {
		p1.score += amount
	} else if (currentPlayer === 2) {
		p2.score += amount
	} else {
		p3.score += amount
	}
	checkVictory()
}

function checkVictory() {
	if (p1.score >= maxScore) {
		playVictoryAnimation(1)
	} else if (p2.score >= maxScore) {
		playVictoryAnimation(2)
	} else if (p3.score >= maxScore) {
		playVictoryAnimation(3)
	}
}

const victoryAnimationElement = document.querySelector('#victory-animation')
function playVictoryAnimation(player) {
	if (player === 1) {
		victoryAnimationElement.textContent = 'Player 1 Wins!'
	} else if (player === 2) {
		victoryAnimationElement.textContent = 'Player 2 Wins!'
	} else {
		victoryAnimationElement.textContent = 'Player 3 Wins!'
	}
	victoryAnimationElement.classList.remove('hide')
	victoryAnimationElement.classList.add('victory')
	toggleButtonDisable()
	console.log(nextPlayerButton)
	nextPlayerButton.setAttribute('disabled', '')
}
