const cards = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o', 'fa-anchor','fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube', 'fa-leaf', 'fa-leaf','fa-bicycle',  'fa-bicycle', 'fa-bomb', 'fa-bomb'];
//with help from Robert/tutor/youtube videos//https://www.youtube.com/watch?v=c_ohDPWmsM0&t=338s
const deck = document.querySelector('.deck');
const moveCounter = document.querySelector('.moves');
let moves = 0;

const cardsWin = document.querySelector('.win'); //changed name because other grader didn't like previous name // 
const resetWon = document.getElementById('reset-won');
const restart = document.querySelector('.restart');

const stars = document.querySelector('.stars');
let star = 3;
//new timer, works thanks to bobbodigig //
const time = document.getElementById("time"); //got from https://codepen.io/bobbidigi34/pen/XqvbGN // my timer was not working, got help here
let t = 0;

function Timer() {
  var timer = setInterval(function() {
    console.log(t);
    t++;
    if (t >= 0) {
      time.innerHTML = t; /*clearInterval(timer);*/
    }
  }, 1000);
}

var timer = new Timer();

function initGame() {      //video with Udacity Mike //
    let cardHTML = shuffle(cards).map(function(card) {
        return makeCard(card);
    });
    deck.innerHTML = cardHTML.join(" ");
    makeStars(star);
}

// This timer did not work, am replacing it. See above.
 //   second = t;
  //  minute = 0;
   // var timer = document.querySelector(".timer");
   // timer.innerHTML = "0 mins 0 secs";
   // clearInterval(interval);
initGame();


function makeCard(card) { //with help form Robert//youtube videos//https://www.youtube.com/watch?v=c_ohDPWmsM0&t=338s
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

const allCards = document.querySelectorAll('.card'); // from video with Mike Udacity
let openCards = [];
let matchedCards = [];
allCards.forEach(function(card) { //from video Udacity Mike //

    card.addEventListener('click', function(e) {
        // open two cards //

        if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match') && !(openCards.length >= 2)) {
            openCards.push(card);
            open(card);

            // if  2 open cards //

            if (openCards.length > 1) { //udacity mike
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
                } else { //udacity mike
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
function open(el) { //help from Robert/youtube videos//https://www.youtube.com/watch?v=JQu4i7Ok1EE&list=PLNgOYdAlV1KF3XlKjMh1zVifRJfBLQg_q
    el.classList.add('open', 'show');
}
//match
function match(el) {
    el.classList.add('open', 'show', 'match');
}

//moves counter //https://www.youtube.com/watch?v=lX64QPxtjBs&t=25s
function movesCount(i) {
    moves += i;
    moveCounter.innerText = moves;
}
function makeStars(el) { //help from Robert/youtube videos
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

function winner(moves) { //help form Robert and youtube videos and slack//https://www.youtube.com/watch?v=3MMjTYVs5is&t=3s
    cardsWin.style.display = 'marker';
    cardsWin.innerHTML = `<h1>Congrats! It took ${moves} moves</h1>
                                <h1>You earned ${star} stars</h1>
                                <h1>It took ${t} seconds!</h1>
                                  <button id='reset-won'> Play Again?</button>`;
    cardsWin, addEventListener('click', function(e) {
        if (e.target.id == 'reset-won') {
            cardsWin.style.display = 'none';
            reset();
        }
    });
}

// restart
restart.addEventListener('click', reset);

function reset() {
  //  location.reload();
}
