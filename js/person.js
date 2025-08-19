const savedUser = localStorage.getItem("user");
const user = JSON.parse(savedUser);

let userAttack = user.attack;
let userHealth = user.health;
let userName = user.name;
let userLuck = user.luck;
let userCrit = user.crit;
let userWin = user.win;
let userLost = user.lost;
let userAvatar = user.avatar;

const personImg = document.querySelector(".person__img");
const itemSkillsData = document.querySelectorAll(".person-item-skills-data");

personImg.src = userAvatar;

itemSkillsData[0].textContent = userName;
itemSkillsData[1].textContent = userHealth;
itemSkillsData[2].textContent = userAttack;
itemSkillsData[3].textContent = userLuck;
itemSkillsData[4].textContent = userCrit;
itemSkillsData[5].textContent = userWin;
itemSkillsData[6].textContent = userLost;

const avatarChangeImg = document.querySelectorAll(".avatar-change__img");
const avatarChangeContainer = document.querySelector(
  ".avatar-change__container"
);
const avatarChangeBtn = document.querySelector(".avatar-change__btn");

///выделяем выбранный ранее аватар
avatarChangeImg.forEach((elem) => {
  let correctLink = `assets${elem.src.split("assets")[1]}`;
  if (correctLink === userAvatar) {
    elem.classList.add("avatar-change__img_active");
  }
});
///

///выделяем активный аватар и удаляем старый, помещаем аву в рамку
avatarChangeContainer.addEventListener("click", (event) => {
  avatarChangeImg.forEach((elem) => {
    elem.classList.remove("avatar-change__img_active");
  });
  let correctLink = `assets${event.target.src.split("assets")[1]}`;
  personImg.src = correctLink;
  event.target.classList.add("avatar-change__img_active");
});
///

///отправляем новую аву в локал
avatarChangeBtn.addEventListener("click", () => {
  user.avatar = `assets${personImg.src.split("assets")[1]}`;
  localStorage.setItem("user", JSON.stringify(user));
});
///
