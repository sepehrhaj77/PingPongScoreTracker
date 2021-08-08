const maxscoreElement = document.querySelector('#max-score')
let maxScore = maxscoreElement.value

maxscoreElement.addEventListener('change', function () {
	maxScore = parseInt(this.value)
	reset()
})

const p1 = {
	score: 0,
	scoreButton: document.querySelector('#p1-score-button'),
	scoreElement: document.querySelector('#p1-score'),
}

const p2 = {
	score: 0,
	scoreButton: document.querySelector('#p2-score-button'),
	scoreElement: document.querySelector('#p2-score'),
}

const resetButton = document.querySelector('#reset-button')

function reset() {
	p1.scoreElement.innerText = 0
	p2.scoreElement.innerText = 0
	p1.score = 0
	p2.score = 0
	p1.scoreButton.disabled = false
	p2.scoreButton.disabled = false
	p1.scoreElement.classList.remove('green', 'red')
	p2.scoreElement.classList.remove('green', 'red')
}

p1.scoreButton.addEventListener('click', function () {
	p1.score++
	p1.scoreElement.innerText = p1.score
	checkVictory()
})
p2.scoreButton.addEventListener('click', function () {
	p2.score++
	p2.scoreElement.innerText = p2.score
	checkVictory()
})
resetButton.addEventListener('click', reset)
function checkVictory() {
	if (p1.score >= maxScore) {
		p1.scoreButton.disabled = true
		p2.scoreButton.disabled = true

		p1.scoreElement.classList.add('green')
		p2.scoreElement.classList.add('red')
	} else if (p2.score >= maxScore) {
		p1.scoreButton.toggleAttribute('disabled')
		p2.scoreButton.toggleAttribute('disabled')
		p2.scoreElement.classList.add('green')
		p1.scoreElement.classList.add('red')
	}
}
