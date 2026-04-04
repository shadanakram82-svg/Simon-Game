let gameSeq = [];
let userSeq = [];

let btns = ["red" , "blue" , "green" ,"grey"]

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function (){
  if(started == false){
    console.log("Game is started")
    started = true;

    levelup();
  }

}); 

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
    h2.innerText = `Level ${level}` ;
    
    let randInd = Math.floor(Math.random() *3);
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
        h2.innerHTML = `Game Over!Your score was <b>${level} </b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function (){
            document.querySelector("body").style.backgroundColor = "white";
        },200);
        reset();
    }
}


function btnPress(){
    // console.log(this);
    let btn = this;
     userflash(btn);

     usercolor = btn.getAttribute("id");
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
}
 