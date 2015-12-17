/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber = generateWinningNumber();

var playersGuessArr = [];

/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor((Math.random() * 100) +1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	playersGuess = $('#guessedNumber').val();
	if ($.isNumeric(playersGuess)) {
		if (playersGuessArr.indexOf(playersGuess) < 0) { 
			playersGuessArr.push(playersGuess);
			checkGuess();
		} else {
			$('#gameMessage').html("<p>Duplicate guess! Guess again!</p>");
		}
	$('#guessedNumber').val('');
	} else {
		$('#gameMessage').html("<p>Enter a number!</p>");
	} 
	if (playersGuess.length === 0) {
		$('#gameMessage').html("<p>Come on, give it a shot! Enter a number!</p>");
	}
}

// Determine if the next guess should be a lower or higher number

function guessDiff() {
	return Math.abs(winningNumber - playersGuess);
}

function getDistance() {
	if (guessDiff() > 40) {
		return "much more than 20"
	} else if (guessDiff() <= 40 && guessDiff() >= 20) {
		return "more than 20";
	} else if (guessDiff() < 20 && guessDiff() >= 5) {
		return "less than 20";
	} else if (guessDiff() < 5) {
		return "within 5";
	}
}

function lowerOrHigher(){
	if (winningNumber > playersGuess) {
		return "lower"; //playersGuess is lower than winningNumber
	} else {
		return "higher";
	}
}

function guessMessage() {
	return "Your guess is " + lowerOrHigher() + " and " + getDistance() + " digits of the winning number"
}

function winAnimation() {
	for (var i = 5; i > 0; i--) {
		$('#gameMessage').fadeOut(1000).fadeIn(1000);
	}		
}


// Check if the Player's Guess is the winning number 

function checkGuess(){
	if (parseInt(winningNumber) === parseInt(playersGuess)) {
		$('#gameMessage').html("<p>Congratulations! You Won!</p>")
		winAnimation();
		$('#guessMessage').html("");
	} else {
		$('#guessMessage').html("<p>"+ guessMessage() + "</p>");
		$('#gameMessage').html("<p>Try again!</p>");
	}
	if (playersGuessArr.length > 4) { //player gets 5 guesses
		$('#gameMessage').html("<p>Game over!</p>");
		$('#guessMessage').html("");
		$('#guessedNumber').prop('disabled', true);	
		$("#playAgainBtn").show();
	}
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint() {
	if (winningNumber < 90 && winningNumber > 1) {
		$('#hintMessage').html("<p>One of these numbers is the winning number: " + (winningNumber + 10) + ", " + (winningNumber - 1) + ", " + winningNumber + "</p>");
	}
}

// Allow the "Player" to Play Again

function playAgain(){
	winningNumber = generateWinningNumber();
	playersGuessArr = [];
	playersGuess = null;
	$('#guessMessage').html("");
	$('#gameMessage').html("");
	$('#hintMessage').html("");
	$('#playAgainBtn').hide();
}


/* **** Event Listeners/Handlers ****  */
$(document).ready(function() {
	$("#playerGuess").click(function() {
		playersGuessSubmission();
	});
	$('#hint').click(function() {
		provideHint();
	});
	$('.reset').click(function() {
		playAgain();
	}); 

	$(document).keypress(function (e) {
	    if(e.which == 13) {
    	    playersGuessSubmission();	
    	}
	});
});



