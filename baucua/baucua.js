Object.defineProperties(Array.prototype, {
  count: {
    value: function (value) {
      return this.filter((x) => x == value).length;
    },
  },
});

const btnStart = document.querySelector(".btn-start");
const sninner = document.querySelectorAll(".sninner");

const overlay = document.querySelector(".overlay");
const btnOpen = document.querySelectorAll(".btn-modal");
const modal = document.querySelector(".modal");
const modalChoose = document.querySelector(".modal-choose");
const hiddenBoard = document.querySelector(".hidden-board-btn");
const showBoard = document.querySelector(".show-board-btn");
const showingBoard = document.querySelector(".showing-board");
const hiddeningBoard = document.querySelector(".hiddening-board");

const btnBet = document.querySelector(".btn-bet");
const user1input = document.querySelector(".user-1-input");
const user2input = document.querySelector(".user-2-input");
const user3input = document.querySelector(".user-3-input");
const user4input = document.querySelector(".user-4-input");

const user1Board = document.querySelector(".user1-board");
const user2Board = document.querySelector(".user2-board");
const user3Board = document.querySelector(".user3-board");
const user4Board = document.querySelector(".user4-board");

const imgItem = document.querySelectorAll(".item");

const compareSpan = document.querySelectorAll(".compare");
const totalScore = document.querySelectorAll(".total-score");

let nowChoose = "";
let isDis = false;

// Betting score
let user1 = { Nai: 0, Cá: 0, Bầu: 0, Cua: 0, Gà: 0, Tôm: 0 };
let user2 = { Nai: 0, Cá: 0, Bầu: 0, Cua: 0, Gà: 0, Tôm: 0 };
let user3 = { Nai: 0, Cá: 0, Bầu: 0, Cua: 0, Gà: 0, Tôm: 0 };
let user4 = { Nai: 0, Cá: 0, Bầu: 0, Cua: 0, Gà: 0, Tôm: 0 };

// Total Score

let userTotal = [100, 100, 100, 100];
totalScore[0].textContent = userTotal[0] + "";
totalScore[1].textContent = userTotal[1] + "";
totalScore[2].textContent = userTotal[2] + "";
totalScore[3].textContent = userTotal[3] + "";

// compare score with last bet
let compare = [0, 0, 0, 0];

// init vị trí lắc
let a = 100;
let b = 100;
let c = 100;

// LẮC ----
const letScroll = () => {
  for (let i = 0; i < btnOpen.length; i++) {
    btnOpen[i].classList.add("dis");
  }
  isDis = true;

  let ran1 = Math.floor(Math.random() * 12) + 12; // 12 to 24
  let ran2 = Math.floor(Math.random() * 12) + 24; // 24 to 36
  let ran3 = Math.floor(Math.random() * 12) + 36; // 36 to 48

  let clear1 = setInterval(() => {
    sninner[0].style.backgroundPositionY = a + "px";
    a = a + 200;
    ran1--;
    if (ran1 < 10) {
      clearInterval(clear1);
      let clear1a = setInterval(() => {
        sninner[0].style.backgroundPositionY = a + "px";
        a = a + 100;
        ran1--;
        if (ran1 < 1) clearInterval(clear1a);
      }, 200);
    }
  }, 120);

  let clear2 = setInterval(() => {
    sninner[1].style.backgroundPositionY = b + "px";
    b = b + 200;
    ran2--;
    if (ran2 < 8) {
      clearInterval(clear2);
      let clearb2 = setInterval(() => {
        sninner[1].style.backgroundPositionY = b + "px";
        b = b + 100;
        ran2--;
        if (ran2 < 1) clearInterval(clearb2);
      }, 200);
    }
  }, 120);

  let clear3 = setInterval(() => {
    sninner[2].style.backgroundPositionY = c + "px";
    c = c + 200;
    ran3--;
    if (ran3 < 8) {
      clearInterval(clear3);
      let clearc2 = setInterval(() => {
        sninner[2].style.backgroundPositionY = c + "px";
        c = c + 100;
        ran3--;
        if (ran3 < 1) {
          clearInterval(clearc2);
          let convert = ["Bầu", "Nai", "Tôm", "Cua", "Cá", "Gà"];
          console.log(a)
          console.log(b)
          console.log(c)
          // console.log("nai-1   tom-2   cua-3   ca-4    ga-5    bau-0");
          tinhtien([
            convert[(a / 100 - 1) % 6],
            convert[(b / 100 - 1) % 6],
            convert[(c / 100 - 1) % 6],
          ]);
        }
      }, 200);
    }
  }, 120);
};
btnStart.addEventListener("click", letScroll);

const tinhtien = (kq) => {
  compare = [...userTotal];

  Object.keys(user1).map((e, i) => {
    const check = kq.count(e);
    if (check > 0) {
      if (user1[e] != 0) userTotal[0] = userTotal[0] + user1[e] * check;
      if (user2[e] != 0) userTotal[1] = userTotal[1] + user2[e] * check;
      if (user3[e] != 0) userTotal[2] = userTotal[2] + user3[e] * check;
      if (user4[e] != 0) userTotal[3] = userTotal[3] + user4[e] * check;
    } else {
      if (user1[e] != 0) userTotal[0] = userTotal[0] - user1[e];
      if (user2[e] != 0) userTotal[1] = userTotal[1] - user2[e];
      if (user3[e] != 0) userTotal[2] = userTotal[2] - user3[e];
      if (user4[e] != 0) userTotal[3] = userTotal[3] - user4[e];
    }
  });
  compare = [
    userTotal[0] - compare[0],
    userTotal[1] - compare[1],
    userTotal[2] - compare[2],
    userTotal[3] - compare[3],
  ];

  // set betting scrore to init
  user1 = { Nai: 0, Cá: 0, Bầu: 0, Cua: 0, Gà: 0, Tôm: 0 };
  user2 = { Nai: 0, Cá: 0, Bầu: 0, Cua: 0, Gà: 0, Tôm: 0 };
  user3 = { Nai: 0, Cá: 0, Bầu: 0, Cua: 0, Gà: 0, Tôm: 0 };
  user4 = { Nai: 0, Cá: 0, Bầu: 0, Cua: 0, Gà: 0, Tôm: 0 };
  user1Board.textContent = "Chưa cược";
  user2Board.textContent = "Chưa cược";
  user3Board.textContent = "Chưa cược";
  user4Board.textContent = "Chưa cược";

  for (let i = 0; i < compareSpan.length; i++) {
    if (compare[i] >= 0) {
      compareSpan[i].textContent = "(+" + compare[i] + ")";
      compareSpan[i].classList.add("color-green");
      compareSpan[i].classList.remove("color-red");
    } else {
      compareSpan[i].textContent = "(" + compare[i] + ")";
      compareSpan[i].classList.add("color-red");
      compareSpan[i].classList.remove("color-green");
    }
    totalScore[i].textContent = userTotal[i] + "";
  }

  for (let i = 0; i < imgItem.length; i++) {
    imgItem[i].classList.remove("bg-red");
  }

  kq.map((e) => {
    for (let i = 0; i < btnOpen.length; i++) {
      btnOpen[i].addEventListener("click", () => openModal(i));
    }
    switch (e) {
      case "Nai":
        imgItem[0].classList.add("bg-red");
        break;
      case "Cá":
        imgItem[1].classList.add("bg-red");
        break;
      case "Bầu":
        imgItem[2].classList.add("bg-red");
        break;
      case "Cua":
        imgItem[3].classList.add("bg-red");
        break;
      case "Gà":
        imgItem[4].classList.add("bg-red");
        break;
      default:
        imgItem[5].classList.add("bg-red");
        break;
    }
  });

  for (let i = 0; i < btnOpen.length; i++) {
    btnOpen[i].classList.remove("dis");
  }
  isDis = false;
};
// end LẮC

// modal
const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = (i) => {
  if (!isDis) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    convert = ["Nai", "Cá", "Bầu", "Cua", "Gà", "Tôm"];
    modalChoose.textContent = "Cược " + convert[i];

    // get last value

    user1input.value = user1[convert[i]];
    user2input.value = user2[convert[i]];
    user3input.value = user3[convert[i]];
    user4input.value = user4[convert[i]];

    nowChoose = convert[i];
  }
};

overlay.addEventListener("click", closeModal);

for (let i = 0; i < btnOpen.length; i++) {
  btnOpen[i].addEventListener("click", () => openModal(i));
}
// end modal

// bet board
const hiddenBo = () => {
  showingBoard.classList.add("hidden");
  hiddeningBoard.classList.remove("hidden");
};
const showBo = () => {
  showingBoard.classList.remove("hidden");
  hiddeningBoard.classList.add("hidden");
};

hiddenBoard.addEventListener("click", hiddenBo);
showBoard.addEventListener("click", showBo);
// end bet-board

// Betting
const letBet = () => {
  user1[nowChoose] = user1input.value;
  user2[nowChoose] = user2input.value;
  user3[nowChoose] = user3input.value;
  user4[nowChoose] = user4input.value;
  let u1 = "";
  let u2 = "";
  let u3 = "";
  let u4 = "";
  Object.keys(user1).map((e, i) => {
    if (user1[e] != 0) u1 = " " + u1 + e + "(" + user1[e] + ")   ";
    if (user2[e] != 0) u2 = " " + u2 + e + "(" + user2[e] + ")    ";
    if (user3[e] != 0) u3 = " " + u3 + e + "(" + user3[e] + ")    ";
    if (user4[e] != 0) u4 = " " + u4 + e + "(" + user4[e] + ")    ";
  });

  if (u1.length === 0) u1 = "Chưa cược";
  if (u2.length === 0) u2 = "Chưa cược";
  if (u3.length === 0) u3 = "Chưa cược";
  if (u4.length === 0) u4 = "Chưa cược";

  user1Board.textContent = u1;
  user2Board.textContent = u2;
  user3Board.textContent = u3;
  user4Board.textContent = u4;

  closeModal();
};
btnBet.addEventListener("click", letBet);
// end beting
