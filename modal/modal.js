const closeButton = document.querySelector(".modal-close");
const overlay = document.querySelector(".overlay");
const btnOpen = document.querySelectorAll(".btn-modal");
const modal = document.querySelector(".modal");

console.log(btnOpen);

const closeModal = () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

const openModal = () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

closeButton.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

for (let i = 0; i < btnOpen.length; i++) {
  btnOpen[i].addEventListener("click", openModal);
}
