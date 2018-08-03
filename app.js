/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// if (document.querySelector('.final-score').value = '') {console.log('true');}

let scores, roundScore, activePlayer, gamePlaying, finalScore;

const init = ()=> {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector('.dice').style.display = 'none';
  document.querySelectorAll('#score-0, #score-1').forEach(el => el.textContent = 0);
  document.querySelectorAll('#current-0, #current-1').forEach(el => el.textContent = 0);
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('#name-0').textContent = 'player 1';
  document.querySelector('#name-1').textContent = 'player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('.final-score').value = '';
}

 init();

const nextPlayer = ()=> {
  document.querySelector('#current-' + activePlayer).textContent = 0;
  activePlayer === 0 ? activePlayer = 1: activePlayer = 0;
  roundScore = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
};

 document.querySelector('.btn-roll').addEventListener('click', ()=> {
  if (gamePlaying) {
    // Random number from 1 to 6
    const dice = Math.floor((Math.random() * 6) + 1);

    // Display result
    const diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    // Update roundscore only if rolled number > 1
    if (dice > 1) {
      // Add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  }
 });

 document.querySelector('.btn-hold').addEventListener('click', ()=> {
   if (gamePlaying) {
     // Add current score to global score
     scores [activePlayer] += roundScore;
     // Update UI global score
     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

     // Check if player won the game
     finalScore = document.querySelector('.final-score').value;
     if (finalScore === '') { finalScore = 100; }

     if (scores[activePlayer] >= finalScore) {
       document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
       document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
       document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
       gamePlaying = false;
       setTimeout( ()=> alert('Press the New Game button to start a new game'), 500);
     } else {
       // Next player
       nextPlayer();
     }
   }
 });

 document.querySelector('.btn-new').addEventListener('click', init);
