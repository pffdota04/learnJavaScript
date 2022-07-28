let player = [[], [], [], []];
let sum = [0, 0, 0, 0];

const pack2 = document.querySelector(".pack2");
const pack = document.querySelector(".pack");
const card = document.querySelectorAll(".card");
const openBtn = document.querySelector(".open-btn");
const clearBtn = document.querySelector(".clear-btn");

const topResult = document.querySelector(".top-result");
const rightResult = document.querySelector(".right-result");
const leftResult = document.querySelector(".left-result");
const botResult = document.querySelector(".bot-result");

const chiabai = async () => {
  intervalPosition(50, "top", false, 10).then(() => {
    card[0].classList.remove("hidden");
    intervalPosition(50, "left", true, 10).then(() => {
      card[3].classList.remove("hidden");
      intervalPosition(50, "top", true, 10).then(() => {
        card[6].classList.remove("hidden");
        intervalPosition(50, "left", false, 10).then(() => {
          card[9].classList.remove("hidden");
          intervalPosition(50, "top", false, 10).then(() => {
            card[1].classList.remove("hidden");
            intervalPosition(50, "left", true, 10).then(() => {
              card[4].classList.remove("hidden");
              intervalPosition(50, "top", true, 10).then(() => {
                card[7].classList.remove("hidden");
                intervalPosition(50, "left", false, 10).then(() => {
                  card[10].classList.remove("hidden");
                  intervalPosition(50, "top", false, 10).then(() => {
                    card[2].classList.remove("hidden");
                    intervalPosition(50, "left", true, 10).then(() => {
                      card[5].classList.remove("hidden");
                      intervalPosition(50, "top", true, 10).then(() => {
                        card[8].classList.remove("hidden");
                        intervalPosition(50, "left", false, 10).then(() => {});
                        card[11].classList.remove("hidden");
                        pack.classList.add("hidden");
                        pack2.classList.add("hidden");
                        openBtn.classList.remove("hidden");
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
};

const mobai = async () => {
  openBtn.classList.add("hidden");
  clearBtn.classList.remove("hidden");
  convert1 = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  convert2 = ["♥", "♦", "♠", "♣"];

  for (let index = 0; index < 3; index++) {
    let ran1 = Math.floor(Math.random() * 12);
    let ran2 = Math.floor(Math.random() * 12);
    let ran3 = Math.floor(Math.random() * 12);
    let ran4 = Math.floor(Math.random() * 12);

    const a1 = convert1[ran1];
    const b1 = convert1[ran2];
    const c1 = convert1[ran3];
    const d1 = convert1[ran4];

    const a2 = convert2[Math.floor(Math.random() * 3)];
    const b2 = convert2[Math.floor(Math.random() * 3)];
    const c2 = convert2[Math.floor(Math.random() * 3)];
    const d2 = convert2[Math.floor(Math.random() * 3)];

    // check trung bài
    if (player[0].includes(a1 + a2 + "")) {
      index = index - 1;
      continue;
    }
    if (player[1].includes(b1 + b2 + "")) {
      index = index - 1;
      continue;
    }
    if (player[2].includes(c1 + c2 + "")) {
      index = index - 1;
      continue;
    }
    if (player[3].includes(d1 + d2 + "")) {
      index = index - 1;
      continue;
    }

    if (ran1 > 9) sum[0] = sum[0] + 10;
    else sum[0] = sum[0] + ran1 + 1;
    if (ran2 > 9) sum[1] = sum[1] + 10;
    else sum[1] = sum[1] + ran2 + 1;
    if (ran3 > 9) sum[2] = sum[2] + 10;
    else sum[2] = sum[2] + ran3 + 1;
    if (ran4 > 9) sum[3] = sum[3] + 10;
    else sum[3] = sum[3] + ran4 + 1;

    player[0].push(a1 + a2 + "");
    player[1].push(b1 + b2 + "");
    player[2].push(c1 + c2 + "");
    player[3].push(d1 + d2 + "");
  }

  let count = 0;
  let per = 0;
  for (let index = 0; index < card.length; index++) {
    card[index].classList.remove("hidden");
    card[index].classList.add("unlock");
    const f = card[index].querySelector(".left-num");
    const l = card[index].querySelector(".bot-num");
    f.textContent = player[per][count];
    l.textContent = player[per][count];
    if (
      player[per][count][player[per][count].length - 1] == "♦" ||
      player[per][count][player[per][count].length - 1] == "♥"
    ) {
      f.classList.add("type-red");
      l.classList.add("type-red");
    } else {
      f.classList.add("type-black");
      l.classList.add("type-black");
    }

    count++;
    if (count == 3) {
      count = 0;
      per++;
    }
  }
  console.log(sum);
  sum.forEach((element, index) => {
    let lastnumber = element.toString()[element.toString().length - 1];
    sum[index] = parseInt(lastnumber);
  });

  console.log(sum);
  let max = Math.max(...sum);
  console.log(max);

  topResult.textContent = "❌";
  leftResult.textContent = "❌";
  botResult.textContent = "❌";
  rightResult.textContent = "❌";

  sum.map((e, i) => {
    if (e === max) {
      switch (i) {
        case 0:
          topResult.textContent = "🎉🏆🎉";
          break;
        case 1:
          rightResult.textContent = "🎉🏆🎉";
          break;
        case 2:
          botResult.textContent = "🎉🏆🎉";
          break;
        default:
          leftResult.textContent = "🎉🏆🎉";
          break;
      }
      // result.push(i);
    }
  });
  // console.log(result);
};

const donban = async () => {
  clearBtn.classList.add("hidden");
  pack2.classList.remove("hidden");
  pack.classList.remove("hidden");
  for (let index = 0; index < card.length; index++) {
    card[index].classList.add("hidden");
    card[index].classList.remove("unlock");
    const f = card[index].querySelector(".left-num");
    const l = card[index].querySelector(".bot-num");
    f.textContent = "";
    l.textContent = "";
    f.classList.remove("type-black");
    f.classList.remove("type-red");
    l.classList.remove("type-black");
    l.classList.remove("type-red");
  }
  player = [[], [], [], []];
  sum = [0, 0, 0, 0];

  topResult.textContent = "Top";
  leftResult.textContent = "Left";
  botResult.textContent = "Bot";
  rightResult.textContent = "Right";
};

const intervalPosition = (start, pos, isPlus, stopAt) => {
  const init = start;
  var defer = new Promise((resolve) => {
    var intvl = setInterval(() => {
      pack.style[pos] = start + "%";
      if (isPlus) start = start + 5;
      else start = start - 5;
      stopAt--;
      if (stopAt == 0) {
        resolve("xong");
        pack.style[pos] = init + "%";
        clearInterval(intvl);
      }
    }, 25);
  });

  return defer;
};
pack2.addEventListener("click", chiabai);
openBtn.addEventListener("click", mobai);
clearBtn.addEventListener("click", donban);

const checkExistCard = (player, newObj) => {
  let check = false;
  for (let index = 0; index < player.length; index++) {
    if (JSON.stringify(player[index]) == JSON.stringify(newObj)) {
      check = true;
      break;
    }
  }
  return check;
};
