
// Game values
let min = 1,
	max = 10,
	winningNum = getRandomNum(min, max),
	guessesLeft = 3;

// UI Elemets
const game = document.querySelector('#game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	guessBtn = document.querySelector('#guess-btn'),
	guessInput = document.querySelector('#guess-input'),
	message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;	

// Play Again event
game.addEventListener('mousedown', function(e) {
	if(e.target.className === 'play-again') {
		window.location.reload();
	}
});

// Listen for guess
guessBtn.addEventListener('click', function (){
	let guess = parseInt(guessInput.value);

	// Validate
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	// Check if WON
	if (guess === winningNum) {
		// Game over - won
		gameOver(true, `${winningNum} is correct, YOU WIN`)
	} else {
		// Wrong number
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			// Game Over - lost
			gameOver(false, `Game Over, you lost. The correct number was ${winningNum}`)
		} else {
			// Game continues - answer wrong
			guessInput.style.borderColor = 'red';

			// Clear input
			guessInput.value = '';

			// Tell user its a wrong number
			setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red');
		}
	}
});

// Game Over
function gameOver(won, msg) {
	// Disable Input
	let color;
	won === true ? color = 'green' : color = 'red';

	guessInput.disabled = true;
	guessInput.style.borderColor = color;

	// Set text color
	message.style.color = color;

	// Set message
	setMessage(msg); 

	// PLay Again ?
	guessBtn.value = 'Play Again'
	guessBtn.className += 'play-again';
}

// Get winnig Number

function getRandomNum(min, max) {
	return Math.floor((Math.random()*(max-min+1)+min));
}

// Set message
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}
