const bg = document.querySelector(".bg");
const player = document.querySelector(".player");
const obj = document.querySelector(".obj");
const start = document.querySelector(".start");
const again = document.querySelector(".again");
const scoreSpan = document.querySelector(".score-span");
const hScoreSpan = document.querySelector(".h-score-span");
const btnJump = document.querySelector(".btn-jump");

let gameStatus = "PAUSE";

let speed = 25;
let pos = 999;
let userH = 200;
let bgInterval, objInterval;
let score = 0;

hScoreSpan.textContent = localStorage.getItem("highscoreJump")
  ? localStorage.getItem("highscoreJump")
  : 0;

// JUMP
let isJumping = false;
const letJump = () => {
  if (gameStatus == "PAUSE") {
    startGame();
  }
  if (!isJumping) {
    isJumping = true;
    userH = 200;
    let status = "UP";
    let conntFly = 0;
    let b = setInterval(() => {
      player.style.bottom = userH + "px";
      if (status == "UP") {
        if (userH > 300) userH = userH + 3;
        else userH = userH + 5;
        player.style.backgroundImage = `url("./imgs/fly.gif")`;
        player.style.backgroundRepeat = `no-repeat`;
      } else if (status == "FLY") {
        conntFly++;
        if (conntFly == 10) status = "DOWN";
      } else userH = userH - 3;
      if (userH < 205 && status == "DOWN") {
        clearInterval(b);
        isJumping = false;
        player.style.bottom = "200px";
        player.style.backgroundImage = `url("./imgs/run.gif")`;
      }
      if (userH > 400 && status == "UP") status = "FLY";
    }, 10);
  }
};

// random obj
let hObj = [67, 67];
let doubleObj = [50, 50, 50, 50];
let spaceObj = [-75, -75, -100];
let opac = [1, 1, 1, 1];
let nowOpac = 1;
let objPos = 1200;
let nowHObj = 67;
let nowWObj = 50;
let nowSpace = -150;

const check = () => {
  //   if (objPos < 180 && objPos > 70) {

  if (objPos < 180 && objPos > 110 - nowWObj) {
    if (userH - 180 < nowHObj) {
      //thua
      let highscore = localStorage.getItem("highscoreJump");
      if (score > highscore) {
        localStorage.setItem("highscoreJump", score);
        hScoreSpan.textContent = score;
      }
      endGame();
    }
  }
};

const startGame = () => {
  start.classList.add("hidden");
  again.classList.add("hidden");
  if (gameStatus != "PLAY") {
    gameStatus = "PLAY";
    score = 0;
    objPos = 1200;
    obj.classList.remove("hidden");
    playInterval(speed, 100);
  }
};

const changeSpeed = () => {
  clearInterval(bgInterval);
  clearInterval(objInterval);
  // 25 20 15

  if (speed > 19) {
    speed = speed - 5;
    playInterval(speed, score + 100);
  } else if (speed > 10) {
    // 13 11
    hObj = [140, 67];
    doubleObj = [50, 50, 100, 100];
    playInterval(speed, score + 200);
    speed = speed - 2;
    spaceObj = [-150, -150, -100];
    opac = [1, 1, 0.7, 0.7];
  } else if (speed > 5) {
    // 9 8 7 6 5
    speed = speed - 1;
    doubleObj = [50, 100, 100, 150];
    spaceObj = [-200, -100, -100];
    opac = [1, 1, 0.7, 0.4];
    playInterval(speed, score + 300);
  } else {
    opac = [0.7, 0.7, 0.4, 0.2];
    bg.style.filter =
      "hue-rotate(" + (Math.floor(Math.random() * 180) - 180) + "deg)";
    playInterval(speed, score + 5000);
  }
};

const playInterval = (newSpeed, breakScore) => {
  console.log(newSpeed);
  console.log(breakScore);
  console.log("--------");
  bgInterval = setInterval(() => {
    bg.style.backgroundPositionX = pos + "px";
    pos = pos - 5;
    if (pos < 0) pos = 999;
    check();
  }, newSpeed);

  objInterval = setInterval(() => {
    obj.style.left = objPos + "px";
    objPos = objPos - 5;
    console.log(hObj);
    console.log(doubleObj);
    console.log(spaceObj);
    console.log(opac);
    if (objPos < nowSpace) {
      nowHObj = hObj[Math.floor(Math.random() * 2)]; // 0 or 1
      nowWObj = doubleObj[Math.floor(Math.random() * 4)]; // 0 or 1 2 3
      nowSpace = spaceObj[Math.floor(Math.random() * 3)]; // 0 or 1 2
      nowOpac = opac[Math.floor(Math.random() * 4)]; // 0 or 1 2 3
      obj.style.height = nowHObj + "px";
      obj.style.width = nowWObj + "px";
      obj.style.opacity = nowOpac;
      objPos = 1200;
    }
    if (objPos % 10 == 0) {
      score++;
      scoreSpan.textContent = score;
    }
    if (score > breakScore) {
      changeSpeed();
    }
  }, newSpeed);
};

const endGame = () => {
  clearInterval(bgInterval);
  clearInterval(objInterval);
  gameStatus = "PAUSE";
  objPos = 1200;
  hObj = [67, 67];
  doubleObj = [50, 50, 50, 50];
  spaceObj = [-75, -75, -100];
  opac = [1, 1, 1, 1];
  speed = 20;
  nowOpac = 1;
  objPos = 1200;
  nowHObj = 67;
  nowWObj = 50;
  nowSpace = -150;

  obj.classList.add("hidden");
  again.classList.remove("hidden");
};
start.addEventListener("click", startGame);
again.addEventListener("click", startGame);
// btnJump.addEventListener("click", () => {
//   letJump();
// });
bg.addEventListener("click", () => {
  letJump();
});
document.addEventListener("keyup", (even) => {
  if (even.code === "Space") {
    console.log("Space pressed");
    letJump();
  }
});
