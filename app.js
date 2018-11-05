const fields = document.querySelectorAll('.field');
const scoreBoard = document.querySelector('.score');
const homers = document.querySelectorAll('.homer');
const newGame = document.getElementById('startGame');
let restart = newGame.display = "block";
let lastField;
let timeUp = false;
let score = 0;



//-------------- random time function ----------------

function randomTime(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

// ------------- random hole selector -----------------

function randomHole(fields) {
    const idx = Math.floor(Math.random() * fields.length);
    const field = fields[idx];
    if (field === lastField) {
        return randomHole(fields);
    }
    lastField = field;
    return lastField
}

// ---- pop up fucntion, mole will pop up in random fields at ramdom times, until time runs out. -------

function peep() {
    const time = randomTime(200, 1000);
    const field = randomHole(fields);
    field.classList.add('up');
    setTimeout(() => {
        field.classList.remove('up');
        if (!timeUp) peep();
      }, time);
      
}

//------------- start game function, will run for 10 seconds. ---------------------------

newGame.addEventListener('click', function(){
    newGame.style.display = "none";
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 20000, restart)

});

// --------  score counter, will add to the score evertime a mole is cliked. --------

function bonk(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
  homers.forEach(function(homer) {
      homer.addEventListener('click', bonk)
    });
