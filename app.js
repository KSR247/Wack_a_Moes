const fields = document.querySelectorAll('.field');
const scoreBoard = document.querySelector('.score');
const homers = document.querySelectorAll('.homer');
const newGame = document.getElementById('startGame');
const progressBar = document.getElementById("progressBar");
let lastField;
let timeUp = false;
let score = 0;


//-------------- random time function ----------------

function randomTime(max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

// ------------- random bar selector -----------------

function randomHole(fields) {
    const idx = Math.floor(Math.random() * fields.length);
    const field = fields[idx];
    if (field === lastField) {
        return randomHole(fields);
    }
    lastField = field;
    return lastField
}

// ---- pop up fucntion, homer will pop up in random bars(fields) at ramdom times, until time runs out. -------

function peep() {
    const time = randomTime(200, 2000);
    const field = randomHole(fields);
    field.classList.add('up');
    setTimeout(() => {
        field.classList.remove('up');
        if (!timeUp) peep();
      }, time);
      
}

//------------- start game function, progress bar will show and run for 10 seconds ----



newGame.addEventListener('click', function(){
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    newGame.style.display = 'none';
    progressBar.style.display = 'block';
    var timeleft = 10;
    var downloadTimer = setInterval(function(){
        progressBar.value = 10 - --timeleft;
    if(timeleft <= 0){
        newGame.style.display = 'block';
        progressBar.style.display = 'none';
        clearInterval(downloadTimer);
        }},1000);
        peep();
    setTimeout(() => timeUp = true, 10000)

});

// --------  score counter, will add to the score everytime a homer is clicked. --------

function hit(e) {
    if(!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
  }
  homers.forEach(function(homer) {
      homer.addEventListener('click', hit)
    });

    
