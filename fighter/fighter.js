const jet = document.querySelector(".jet");
// const bullet = document.querySelector(".bullet");
const bg = document.querySelector(".bg");
const map = document.querySelector(".map");
const magazineElement = document.querySelector(".magazine");
const again = document.querySelector(".again");
const fireBtn = document.querySelector(".fire-btn");
const leftBtn = document.querySelector(".left-btn");
const rightBtn = document.querySelector(".right-btn");
const levelElement = document.querySelector(".level");

let width = window.innerWidth;
let innerHeight = window.innerHeight;

let speedBullet = 20;
// console.log(innerHeight);
// if (innerHeight < 1280) window.resizeBy(1280, 812);
// document.body.style.zoom = "80%";

let aBlock = width / 7;
let nowPos = 3; // 0 1 2 3 4 5 6
let readyFire = true;
let removeAllBullet = false;
let level = 0;

const magazine = [10, 10, 15, 15, 10, 20, 10, 20, 25, 25];
const allmap = [
  [
    [1, 1, 3, 0, 5, 3, 5],
    [2, 1, 4, 2, 2, 1, 2],
    [2, 1, 1, 1, 2, 2, 1],
    [1, 2, 3, 5, 1, 3, 2],
    [2, 2, 2, 2, "x", 2, 2],
  ],
  [
    [0, 2, 2, 2, 2, 2, 2],
    [2, 1, 4, 4, 2, 2, 2],
    [2, 1, "rm99", 2, 1, 2, 5],
    [2, 2, 98, 5, 1, "r", 2],
    [99, 2, 2, 2, 2, "x", 2],
  ],
  [
    [3, 2, 1, 0, 2, 1, 4],
    [2, 1, 4, 8, 2, 2, "r"],
    [10, 10, 10, 2, 10, 10, 10],
    [2, "rm10", 98, 10, 1, 5, 1],
    [3, 2, 3, 1, 2, 3, 2],
  ],
  [
    [1, 1, 1, 1, 1, 1, 0],
    ["rm98", 99, 99, 99, 99, 99, 99],
    [99, 99, 99, 99, "r", 99, 99],
    [2, 5, 7, 2, 8, 2, 1],
    [1, 5, 3, "x", 2, 8, 3],
  ],
  [
    [1, 1, 1, 1, 0, 1, 1],
    ["r", 9, 8, 9, 5, 9, 4],
    [8, 6, 7, 4, 9, "r", 7],
    [3, 5, "r", 2, "x", 2, 1],
    [1, 2, 5, "x", 4, "rm5", 9],
  ],
  [
    [35, 1, 25, "x", 0, 1, 1],
    [10, 35, 30, 25, 50, "rm35", 15],
    [10, "r", 15, 30, 40, 45, 20],
    [35, 30, 35, 45, 25, "rm25", 30],
    [40, 25, "x", 40, 25, 5, 35],
  ],
  [
    ["x", 6, 10, "x", 7, "x", 0],
    ["rm5", 5, "rm7", 7, 5, 10, 99],
    [20, "x", 20, "r", 20, 20, 20],
    [20, 20, "r", 20, 20, 20, 20],
    [20, 20, 20, "r", 20, 20, 20],
  ],
  [
    ["x", 20, 0, "rm20", "x", 55, 35],
    [2, "x", 30, 25, 2, 30, 2],
    [55, "x", 25, 35, 1, 30, "r"],
    [35, "r", 40, 2, 25, 2, 1],
    [5, 2, 25, 2, 1, "rm35", 2],
  ],
  [
    ["r", "rm50", 50, 0, 50, "rm55", "r"],
    [2, 2, "x", 50, "x", 2, 2],
    [55, 2, 50, 55, 50, 2, 55],
    [55, "x", 1, "x", 1, "x", 55],
    [5, 5, 55, 5, 55, 5, 5],
  ],
  [
    ["rm22", 40, 44, "rm25", 0, "x", "rm40"],
    [45, "rm44", "x", 44, 25, 40, 2],
    [10, 22, 1, 10, 1, 22, 44],
    [22, "x", 44, "r", 22, "x", 2],
    [40, 2, 22, 44, 22, 2, 22],
  ],
];

// [
//   [1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1],
//   [1, 1, 1, 1, 1, 1, 1],
// ];

let myMagazine = JSON.parse(JSON.stringify(magazine[level]));
let map1 = JSON.parse(JSON.stringify(allmap[level]));
console.log(map1);
// 0 = king
// -1 = không có

const loadMap = () => {
  map.innerHTML = "";
  magazineElement.textContent = "🖍 " + magazine[level];
  map1.map((e, i) => {
    e.map((el, j) => {
      let block = document.createElement("div");
      block.classList.add("block", "row-" + i, "col-" + j);
      block.setAttribute("id", "block-" + i + "" + j);
      if (el == 0) {
        block.classList.add("king-block");
        block.textContent = "👑";
      } else if (el > 0) block.textContent = el;
      else if (el == "x") {
        block.classList.add("x-block");
        block.textContent = "❌";
      } else if (el == "r") {
        block.classList.add("r-block");
        block.textContent = "↔";
      } else if (el.toString().includes("rm")) {
        block.classList.add("rm-block");
        block.textContent = el;
      }
      //   newBlock[i].push(block);
      map.appendChild(block);
    });
  });
};
loadMap();

const moveRight = () => {
  if (nowPos < 6) {
    nowPos++;
    jet.style.left = "calc(" + (5 + nowPos * 15) + "%)";
    readyFire = false;
    setTimeout(() => {
      readyFire = true;
    }, 200);
  }
};

const moveLeft = () => {
  if (nowPos > 0) {
    nowPos--;
    jet.style.left = "calc(" + (5 + nowPos * 15) + "%)";
    readyFire = false;
    setTimeout(() => {
      readyFire = true;
    }, 200);
  }
};

const fire = () => {
  if (readyFire && myMagazine > 0) {
    var newBullet = document.createElement("div");

    newBullet.classList.add("bullet");
    bg.appendChild(newBullet);
    let newBulletY = 110;
    let newBulletX = 5 + nowPos * 15;
    let bulletPos = nowPos;
    newBullet.style.left = "calc(" + newBulletX + "%)";
    myMagazine = myMagazine - 1;
    magazineElement.textContent = "🖍 " + myMagazine;
    let fireInter = setInterval(() => {
      newBulletY = newBulletY + 5;
      newBullet.style.bottom = newBulletY + "px";
      checkBullet(newBulletY, fireInter, newBullet, bulletPos);
      if (innerHeight < newBulletY || removeAllBullet) {
        clearInterval(fireInter);
        newBullet.remove();
      }
    }, speedBullet);
  }
};

// trục Y, interval, element, vị trí (0 đến 6)
// trục y: 400 == 3  (++ 105)
const checkBullet = (bulletY, interval, bulletElement, position) => {
  console.log(innerHeight - bulletY);
  let subed = innerHeight - bulletY;
  console.log(subed);

  if (subed <= 110) {
    // if (bulletY == 400 + 315) {
    if (map1[0][position] !== -1) {
      // change map1 block ---------------
      const thisBlock = document.querySelector("#block-0" + position);
      checkBlockDame(0, position, thisBlock);
      // ---------------
      clearInterval(interval);
      bulletElement.remove();
    }
  } else if (subed <= 215) {
    // } else if (bulletY == 400 + 210) {
    if (map1[1][position] !== -1) {
      // change map1 block ---------------
      const thisBlock = document.querySelector("#block-1" + position);
      checkBlockDame(1, position, thisBlock);
      // ---------------
      clearInterval(interval);
      bulletElement.remove();
    }
    // } else if (bulletY == 400 + 105) {
  } else if (subed <= 320) {
    if (map1[2][position] !== -1) {
      // change map1 block ---------------
      const thisBlock = document.querySelector("#block-2" + position);
      checkBlockDame(2, position, thisBlock);
      // ---------------
      clearInterval(interval);
      bulletElement.remove();
    }
    // } else if (bulletY == 400) {
  } else if (subed <= 425) {
    if (map1[3][position] !== -1) {
      // change map1 block ---------------
      const thisBlock = document.querySelector("#block-3" + position);
      checkBlockDame(3, position, thisBlock);
      // ---------------
      clearInterval(interval);
      bulletElement.remove();
    }
    // } else if (bulletY == 295) {
  } else if (subed <= 530) {
    if (map1[4][position] !== -1) {
      // change map1 block ---------------
      const thisBlock = document.querySelector("#block-4" + position);
      checkBlockDame(4, position, thisBlock);
      // ---------------
      clearInterval(interval);
      bulletElement.remove();
    }
  }
};

const checkBlockDame = (x, y, thisBlock) => {
  valueBlock = map1[x][y];
  console.log(valueBlock);
  if (valueBlock == 0) {
    {
      removeAllBullet = true;
      setTimeout(() => {
        removeAllBullet = false;
        alert("win");
        if (level === allmap.length - 1) alert("Bạn đã thắng màn cuối cùng");
        else {
          level++;
          levelElement.textContent = "level " + (level + 1);
          map1 = JSON.parse(JSON.stringify(allmap[level]));
          myMagazine = JSON.parse(JSON.stringify(magazine[level]));
          loadMap();
        }
      }, 30);
    }
  } else if (valueBlock > 1) {
    valueBlock = valueBlock - 1;
    thisBlock.textContent = valueBlock;
    map1[x][y] = valueBlock;
  } else if (valueBlock == 1) {
    valueBlock = -1;
    thisBlock.remove();
    map1[x][y] = valueBlock;
  } else if (valueBlock == "x") {
    // nổ chữ X
    valueBlock = -1;
    let xplus = x + 1;
    let xsub = x - 1;
    let yplus = y + 1;
    let ysub = y - 1;
    if (xplus != 5 && ysub != -1) {
      map1[xplus][ysub] = -1;
      let rm = document.querySelector("#block-" + xplus + "" + ysub);
      if (rm) rm.remove();
    }
    if (xplus != 5 && yplus != 7) {
      map1[xplus][yplus] = -1;
      let rm = document.querySelector("#block-" + xplus + "" + yplus);
      if (rm) rm.remove();
    }
    if (xsub != -1 && ysub != -1) {
      map1[xsub][ysub] = -1;
      let rm = document.querySelector("#block-" + xsub + "" + ysub);
      if (rm) rm.remove();
    }
    if (xsub != -1 && yplus != 7) {
      map1[xsub][yplus] = -1;
      let rm = document.querySelector("#block-" + xsub + "" + yplus);
      if (rm) rm.remove();
    }
    map1[x][y] = valueBlock;
    thisBlock.remove();
  } else if (valueBlock == "r") {
    // xóa hàng
    map1[x] = [-1, -1, -1, -1, -1, -1, -1];
    map1[x].map((e, i) => {
      let rm = document.querySelector("#block-" + x + "" + i);
      if (rm) rm.remove();
    });
    valueBlock = -1;
    map1[x][y] = valueBlock;
    thisBlock.remove();
  } else if (valueBlock.includes("rm")) {
    // xóa theo số
    let number = parseInt(valueBlock.slice(2, valueBlock.length));
    console.log("xóa " + number);
    map1.map((e, i) => {
      e.map((el, j) => {
        if (el == number) {
          map1[i][j] = -1;
          let rm = document.querySelector("#block-" + i + "" + j);
          if (rm) rm.remove();
        }
      });
    });
    map1[x][y] = -1;
    thisBlock.remove();
  }
};

const playAgain = () => {
  removeAllBullet = true;
  setTimeout(() => {
    removeAllBullet = false;
    map1 = JSON.parse(JSON.stringify(allmap[level]));
    myMagazine = JSON.parse(JSON.stringify(magazine[level]));
    loadMap();
  }, 50);
};

document.addEventListener("keyup", (even) => {
  if (even.code === "Space") {
    fire();
  } else if (even.code === "ArrowRight") {
    moveRight();
  } else if (even.code === "ArrowLeft") {
    moveLeft();
  }
});

again.addEventListener("click", playAgain);

fireBtn.addEventListener("click", fire);
rightBtn.addEventListener("click", moveRight);
leftBtn.addEventListener("click", moveLeft);
