var scores = void 0,
    roundScore = void 0,
    activePlayer = void 0,
    gamePlaying = void 0,
    finalScore = void 0;

var init = function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  document.querySelector('.dice').style.display = 'none';
  document.querySelectorAll('#score-0, #score-1').forEach(function (el) {
    return el.textContent = 0;
  });
  document.querySelectorAll('#current-0, #current-1').forEach(function (el) {
    return el.textContent = 0;
  });
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
};

init();

var nextPlayer = function nextPlayer() {
  document.querySelector('#current-' + activePlayer).textContent = 0;
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gamePlaying) {
    // Random number from 1 to 6
    var dice = Math.floor(Math.random() * 6 + 1);

    // Display result
    var diceDOM = document.querySelector('.dice');
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

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add current score to global score
    scores[activePlayer] += roundScore;
    // Update UI global score
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Check if player won the game
    finalScore = document.querySelector('.final-score').value;
    if (finalScore === '') {
      finalScore = 100;
    }

    if (scores[activePlayer] >= finalScore) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
      setTimeout(function () {
        return alert('Press the New Game button to start a new game');
      }, 500);
    } else {
      // Next player
      nextPlayer();
    }
  }
});
