const char = document.querySelector(".char");
const container = document.querySelector(".container");
const bg = document.querySelector(".bg");
const op1 = document.querySelector(".op1");
let innerWidth = window.innerWidth;
let innerHeight = window.innerHeight;
let clear;

let opX = -10;
setInterval(() => {
  opX++;
  op1.style.left = opX + "%";
  let charPos = char.getBoundingClientRect();
  let opPos = op1.getBoundingClientRect();
  const attack1 = document.querySelector(".attack");
  if (charPos.top + 120 > opPos.top + 200) {
    char.style.zIndex = 2;
    attack1.style.zIndex = 2;
  } else {
    char.style.zIndex = 0;
    attack1.style.zIndex = 0;
  }
  if (opX > 110) opX = -10;
}, 200);
const oncontextmenuFuncion = (event) => {
  event.preventDefault();
  if (event.target.className === "bg") {
    clearInterval(clear);

    char.style.backgroundImage = 'url("./imgs/char.gif")';
    let click = document.createElement("div");
    click.classList.add("moving-sign");
    click.style.top = event.offsetY - 50 + "px";
    click.style.left = event.offsetX - 50 + "px";
    container.appendChild(click);

    let r = char.getBoundingClientRect();
    let ctn = container.getBoundingClientRect();

    let moveY = event.offsetY - 50 - r.top;
    let moveX = event.offsetX - 50 - (r.left - ctn.left);

    let ptg = pytago(moveX, moveY);
    let step = parseInt(ptg / 5);
    let stepX = moveX / step;
    let stepY = moveY / step;

    // console.log("origin char " + r.left);
    // console.log("start pos: ", parseInt(r.left - ctn.left), parseInt(r.top));
    // console.log("end pos: ", event.offsetX, event.offsetY);
    // console.log("move ", parseInt(moveX), parseInt(moveY));
    // console.log("a move step: ", stepX, stepY);

    let countStep = 0;
    clear = setInterval(() => {
      countStep++;
      let startX = r.left - ctn.left + stepX * countStep;
      let startY = r.top + stepY * countStep;
      char.style.top = startY + "px";
      char.style.left = startX + "px";
      const attack = document.querySelector(".attack");
      if (attack) {
        attack.style.top = startY - 75 + "px";
        attack.style.left = startX - 160 + "px";
      }
      if (countStep >= step) {
        clearInterval(clear);
        char.style.backgroundImage = 'url("./imgs/char_stop.png")';
      }
    }, 20);

    // let time = pytago(event.offsetY - rect.top, event.offsetX - rect.left) * 5;
    // char.style.transition = "top " + time + "ms, left " + time + "ms";

    setTimeout(() => {
      click.remove();
    }, 500);
  }
};

const pytago = (x, y) => {
  return parseInt(Math.sqrt(x * x + y * y));
};

const attack = () => {
  const attack = document.querySelector(".attack");
  if (!attack) {
    let attack = document.createElement("div");
    attack.classList.add("attack");
    let r = char.getBoundingClientRect();
    let ctn = container.getBoundingClientRect();
    attack.style.top = r.top - 75 + "px";
    attack.style.left = r.left - ctn.left - 160 + "px";
    container.appendChild(attack);
    setTimeout(() => {
      attack.remove();
    }, 500);
  }
};

container.addEventListener("contextmenu", (event) =>
  oncontextmenuFuncion(event)
);

document.onmousemove = function (e) {
  var rect = char.getBoundingClientRect();
  if (e.clientX > rect.left + 50) {
    char.style.transform = "rotateY(0)";
  } else {
    char.style.transform = "rotateY(180deg)";
  }

  // console.log(rect.top);
  // console.log(rect.left);
};

document.addEventListener("keyup", (even) => {
  if (even.code === "Space") {
    attack();
  }
});

window.getZIndex = function (e) {
  var z = document.defaultView.getComputedStyle(e).getPropertyValue("z-index");
  if (isNaN(z)) return getZIndex(e.parentNode);
  else return z;
};
