function generateWinningNumber() {
	return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
	var m = array.length, t, i;
	while(m) {
		i = Math.floor(Math.random() * m--);
		t = array[m]
		array[m] = array[i];
		array[i] = t;
	}
	return array;
}

function Game() {
	this.playersGuess = null;
	this.pastGuesses = [];
	this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function() {
	return Math.abs(this.playersGuess - this.winningNumber);
}

Game.prototype.isLower = function() {
	return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(number) {
	if (number >= 1 && number <= 100) {
		this.playersGuess = number;
		return this.checkGuess();
	} else {
		throw "That is an invalid guess.";
	}
}

Game.prototype.checkGuess = function() {
	if (this.playersGuess === this.winningNumber) {
		return "You Win!";
	} 
	if (this.pastGuesses.length === 4) {
		return "You Lose.";
	}
	if (this.pastGuesses.includes(this.playersGuess) /*&& this.pastGuesses.length < 4*/) {
		this.pastGuesses.push(this.playersGuess);
		return "You have already guessed that number.";
	}
	var diff = Math.abs(this.playersGuess - this.winningNumber)
	this.pastGuesses.push(this.playersGuess);
	if (diff < 10) {
		return "You're burning up!";
	}
	if (diff < 25) {
		return "You're lukewarm.";
	}
	if (diff < 50) {
		return "You're a bit chilly.";
	}
	if (diff < 100) {
		return "You're ice cold!";
	}
}


function newGame() {
	return new Game();
}

Game.prototype.provideHint = function() {
	var hint3 = this.winningNumber;
	var hint2 = generateWinningNumber();
	var hint1 = generateWinningNumber();
	this.hint = [hint1, hint2, hint3]
	return shuffle(this.hint);
}

// Tasks from https://learn.fullstackacademy.com/workshop/57ad9e975d2a24030046183a/content/57c472eb8d1bc503003e025d/text

$(document).ready(function() {
	// console.log("Ready!")

	$("#submit").on("click", function() {
		console.log("Submit button was clicked!");
	});

})





