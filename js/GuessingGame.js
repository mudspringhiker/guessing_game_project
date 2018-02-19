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
		return "That is an invalid guess.";
	}
}

Game.prototype.checkGuess = function() {
	if (this.playersGuess === this.winningNumber) {
		this.pastGuesses.push(this.playersGuess);
		return "You Win!";
	} else if (this.pastGuesses.length === 4) {
		this.pastGuesses.push(this.playersGuess);
		return "You Lose.";
	} else if (this.pastGuesses.includes(this.playersGuess)) {
		return "You have already guessed that number.";
	} else {
		var diff = Math.abs(this.playersGuess - this.winningNumber);
		this.pastGuesses.push(this.playersGuess);
		if (diff < 10) {
			return "You're burning up!";
		} else if (diff < 25) {
			return "You're lukewarm.";
		} else if (diff < 50) {
			return "You're a bit chilly.";
		} else if (diff < 100) {
			return "You're ice cold!";
		}
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

var getPlayersInput = function(game) {
		var output = game.playersGuessSubmission(parseInt($("#input").val()));
		$("#input").val("");
		return output;
	}

$(document).ready(function() {

	var game = new Game(); // After the DOM has finished loading, create a new game instance.
	
	$("#submit").click(function() {
		var result = getPlayersInput(game);
		
		$("h1").text(result);

		var index = game.pastGuesses.length - 1;
		$(".guess").text(function(index) {
				return game.pastGuesses[index];
			});

		if (result == "You Lose." || result == "You Win!") {
			$("h2").text("Click the reset button to play again.");
		}
	});

	$("#input").keypress(function(event) {
		if (event.which === 13) {
			getPlayersInput(game);
		}
	});




	

});





