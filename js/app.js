const cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor','fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf','fa-bicycle',  'fa-bicycle', 'fa-bomb', 'fa-bomb'];

const deck = document.querySelector('.deck');
const moveCounter = document.querySelector('.moves');
let moves = 0;

const showWin = document.querySelector('.win');
const resetWon = document.getElementById('reset-won');
const restart = document.querySelector('.restart');

const stars = document.querySelector('.stars');
let star = 3;
let t = 1;

function initGame() {      //video with Udacity Mike //
    let cardHTML = shuffle(cards).map(function(card) {
        return makeCard(card);
    });
    deck.innerHTML = cardHTML.join(" ");
    makeStars(star);
}
// timer
    second = t;
    minute = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
   // clearInterval(interval);

initGame();

function makeCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}


// Shuffle function provided http://stackoverflow.com/a/2450976 //
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const allCards = document.querySelectorAll('.card');
let openCards = [];
let matchedCards = [];
allCards.forEach(function(card) { //from video Udacity Mike //

    card.addEventListener('click', function(e) {
        // open two cards //

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && !(openCards.length >= 2)) {
            openCards.push(card);
            open(card);

            // if  2 open cards //

            if (openCards.length > 1) {
                // check if they match
                if (openCards[0].dataset.card == openCards[1].dataset.card) {
                    console.log(openCards);
                    // add match class and push to matchedCards array
                    matchedCards.push(openCards[0]);
                    matchedCards.push(openCards[1]);
                    match(openCards[0]);
                    match(openCards[1]);
                    openCards = [];
                    // add star for match
                    star += 1;
                    // add move
                    movesCount(1);
                    makeStars(star);

                    // if all cards matched
                    if (matchedCards.length == 16) {
                        winner(moves);
                    }
                } else {
                    // add move
                    movesCount(1);
                    star -= 1;
                    makeStars(star);
                    // flip back if no match
                    openCards.forEach(function(card) {

                        setTimeout(function() { // udacity Mike video //
                            card.classList.remove('open', 'show');
                            openCards = [];
                        }, 1000);
                    });
                }
            }

        }
    });
});
//open
function open(el) {
    el.classList.add('open', 'show');
}
//match
function match(el) {
    el.classList.add('open', 'show', 'match');
}

//moves counter
function movesCount(i) {
    moves += i;
    moveCounter.innerText = moves;
}
function makeStars(el) {
    while (stars.hasChildNodes()) {
        stars.removeChild(stars.firstChild);
    }
    for (let i = 1; i <= el; i++) {
        const starLi = document.createElement('li');
        const starI = document.createElement('i');
        starI.classList.add('fa', 'fa-star');
        starLi.appendChild(starI);
        stars.appendChild(starLi);
    }
}

function winner(moves) {
    showWin.style.display = 'marker';
    showWin.innerHTML = `<h1>Congrats! It took ${moves} moves</h1>
                                <h1>You earned ${star} stars</h1>
                                <h1>It took ${t} seconds!</h1>
                                  <button id='reset-won'> Play Again?</button>`;
    showWin, addEventListener('click', function(e) {
        if (e.target.id == 'reset-won') {
            showWin.style.display = 'none';
            reset();
        }
    });
}

// restart
restart.addEventListener('click', reset);

function reset() {
    location.reload();
}
