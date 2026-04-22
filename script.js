let gameSeq = [];
let userSeq = [];

let btns = ["red", "blue", "green", "grey"];

let started = false;
let level = 0;

const h2 = document.querySelector("#status-text");
const startBtn = document.querySelector("#start-btn");

function setStartButtonState(isRunning) {
    startBtn.disabled = isRunning;
    startBtn.innerText = isRunning ? "Game Running" : "Start Game";
}

function startGame() {
    if (started) {
        return;
    }

    console.log("Game is started");
    started = true;
    setStartButtonState(true);
    levelup();
}

document.addEventListener("keydown", startGame);
startBtn.addEventListener("click", startGame);

function gameflash(btn){
    btn.classList.add("flash")
    setTimeout(function (){
        btn.classList.remove("flash");
    } , 200); 
}

function userflash(btn){
    btn.classList.add("userflash")
    setTimeout(function (){
        btn.classList.remove("userflash");
    } , 200); 
}

function levelup(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    
    let randInd = Math.floor(Math.random() * 4);
    let randcolor = btns[randInd];
    let randbtn = document.querySelector(`.${randcolor}`);

    gameSeq.push(randcolor);
    console.log(gameSeq);
    
    gameflash(randbtn);

}

function checkAns(idx){
    // console.log("current level :" , level);
    // let idx =level-1;

    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length){
            setTimeout(levelup, 1000) ;
        }
    }
    else{
        h2.innerHTML = `Game Over! Your score was <b>${level}</b><br>Tap Start or press any key to play again.`;
        document.body.classList.add("game-over");
        setTimeout(function (){
            document.body.classList.remove("game-over");
        },200);
        reset();
    }
}


function btnPress(){
    // console.log(this);
    let btn = this;
     userflash(btn);

     let usercolor = btn.getAttribute("id");
     userSeq.push(usercolor);

     checkAns(userSeq.length-1);
};

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns){
    btn.addEventListener("click", btnPress);
}


function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    setStartButtonState(false);
}
 
