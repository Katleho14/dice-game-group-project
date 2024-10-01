// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display rolling dice animation
    let roll = 1;
    const rollDice = setInterval(function () {
      diceEl.src = `dice-${roll}.png`;
      roll++;
      if (roll > 6) {
        roll = 1;
      }
    }, 100);

    // 3. Stop rolling dice animation after 1 second
    setTimeout(function () {
      clearInterval(rollDice);
      diceEl.src = `dice-${dice}.png`;

      // 4. Check for rolled 1
      if (dice !== 1) {
        // Add dice to current score
        currentScore += dice;
        document.getElementById(
          `current--${activePlayer}`
        ).textContent = currentScore;
      } else {
        // Switch to next player
        switchPlayer();
      }
    }, 1000);
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

// Dice rolling animation
const diceContainer = document.getElementById('dice-container');
const diceImages = [];

for (let i = 1; i <= 6; i++) {
  const diceImage = document.createElement('img');
  diceImage.src = `images/dice-${i}.png`;
  diceImage.alt = `Dice ${i}`;
  diceImage.classList.add('dice');
  diceContainer.appendChild(diceImage);
  diceImages.push(diceImage);
}

let currentDice = 1;
let rolling = false;

function rollDice() {
  if (!rolling) {
    rolling = true;
    const intervalId = setInterval(() => {
      currentDice++;
      if (currentDice > 6) {
        currentDice = 1;
      }
      diceImages.forEach((image) => {
        image.src = `images/dice-${currentDice}.png`;
      });
    }, 100);

    setTimeout(() => {
      clearInterval(intervalId);
      rolling = false;
    }, 1000);
  }
}

diceContainer.addEventListener('click', rollDice);