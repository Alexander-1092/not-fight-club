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
let userPoints = user.points;

const personImg = document.querySelector(".person__img");
const itemSkillsData = document.querySelectorAll(".person-item-skills-data");
const personPoints = document.querySelector(".person__ball");

personImg.src = userAvatar;

const update = () => {
  itemSkillsData[0].textContent = userName;
  itemSkillsData[1].textContent = userHealth;
  itemSkillsData[2].textContent = userAttack;
  itemSkillsData[3].textContent = userLuck;
  itemSkillsData[4].textContent = userCrit;
  itemSkillsData[5].textContent = userWin;
  itemSkillsData[6].textContent = userLost;
  personPoints.textContent = `Свободные баллы: ${userPoints}`;
};
update();

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

const personInput = document.querySelectorAll(".person__input");
let increasedInput;
let currentElemValue;
personInput.forEach((elem) => {
  let currentValue;
  elem.addEventListener("click", (e) => {
    if (userPoints > 0 && elem.value > 0) {
      userPoints -= 1;
      onOfInput(elem);
      update();
      currentValue = elem.value;
      increasedInput = elem.className;
      currentElemValue = elem.value;
    }

    if (elem.value > currentValue && userPoints === 0) {
      elem.value = currentValue;
    }
    if (elem.value < currentValue) {
      currentValue = 0;
      userPoints += 1;
      onOfInput(elem);
      update();
    }
  });
});

const checkPoints = () => {
  if (user.points === 0) {
    personInput.forEach((elem) => {
      elem.classList.add("person__input_inactive");
    });
  }
};

checkPoints();

const onOfInput = (elemActive) => {
  personInput.forEach((elem) => {
    if (elem !== elemActive) {
      elem.classList.toggle("person__input_inactive");
    }
  });
};

const personBtn = document.querySelector(".person__btn");

const rerecordPoints = () => {
  if (increasedInput === "person__input person__input-health") {
    userHealth += Number(currentElemValue);
    user.health = userHealth;
  } else if (increasedInput === "person__input person__input-attack") {
    userAttack += Number(currentElemValue);
    user.attack = userAttack;
  } else if (increasedInput === "person__input person__input-luck") {
    userLuck += Number(currentElemValue);
    user.luck = userLuck;
  } else if (increasedInput === "person__input person__input-crit") {
    userCrit += Number(currentElemValue);
    user.crit = userCrit;
  }
  user.points = 0;
  update();
  localStorage.setItem("user", JSON.stringify(user));

  document
    .querySelector(`.${increasedInput.split(" ")[1]}`)
    .classList.add("person__input_inactive");
};

personBtn.addEventListener("click", () => {
  if (user.points > 0) {
    rerecordPoints();
    personBtn.style.pointerEvents = "none";
  }
});

const wrapper = document.querySelector(".wrapper");
wrapper.style.filter = `brightness(${user.filterBrightness})`;
wrapper.style.filter = `contrast(${user.filterContrast})`;
