/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he wishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/* 
THE 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn.
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. 
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 
*/


// *** Declaring the game's variables
var scores, roundScore, activePlayer, gamePlaying, previousDiceRoll, winningScore;


// *** Initial setup 
init(); 


// *** Set up winning score
document.getElementById('winning-score').addEventListener('input', function() {
  winningScore = Number(document.getElementById('winning-score').value);
})


// *** Event listener on "Roll Dice"
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {
    // 1. Random number
    var diceOne = Math.floor(Math.random() * 6) + 1;
    var diceTwo = Math.floor(Math.random() * 6) + 1;
    // var dice = 6;
    previousDiceRoll.push(diceOne, diceTwo);
    console.log(previousDiceRoll);

    // 2. Display the result
    var diceDOMOne = document.getElementById('dice-1');
    diceDOMOne.style.display = 'block';
    diceDOMOne.src = 'dice-' + diceOne + '.png';

    var diceDOMTwo = document.getElementById('dice-2');
    diceDOMTwo.style.display = 'block';
    diceDOMTwo.src = 'dice-' + diceTwo + '.png';

    // 3. Update the round score IF the rolled number was not a 1
    if (diceOne !== 1 && diceTwo !== 1 && !((diceOne === 6 || diceTwo === 6) && ((previousDiceRoll[previousDiceRoll.length - 4] === 6) || (previousDiceRoll[previousDiceRoll.length - 3] === 6)))) {
      roundScore += diceOne + diceTwo;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } 
    // Reset player's global score if two 6 in a row
    else if (((diceOne === 6 || diceTwo === 6) && ((previousDiceRoll[previousDiceRoll.length - 4] === 6) || (previousDiceRoll[previousDiceRoll.length - 3] === 6)))) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      
      nextPlayer();
    }
    // Don't update round score, go to next player
    else {
      nextPlayer();
    }
  } 
});


// *** Event listener on "Hold"
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
     // 1. Add current score to global score
    scores[activePlayer] += roundScore;

    // 2. Update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // 3. Check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.getElementById('name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});


// *** Function nextPlayer
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  previousDiceRoll = [];

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}


// *** Event listener on "New Game"
document.querySelector('.btn-new').addEventListener('click', init);


// *** Function init
function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  previousDiceRoll = [];
  winningScore = 100;
  document.getElementById('winning-score').value = '';

  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
}

