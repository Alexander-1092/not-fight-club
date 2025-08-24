const menulink = document.querySelectorAll(".menu__link");
const menu = document.querySelector(".menu");
const pers = document.querySelector(".pers");
const persInput = document.querySelector(".pers__input");
const persBtn = document.querySelector(".pers__btn");

menulink[0].addEventListener("click", () => {
  localStorage.clear();
  menu.classList.add("menu__inactive");
  pers.classList.add("pers__active");
});

const persImg = document.querySelectorAll(".pers__img");
const persContainer = document.querySelector(".pers__container");
const persCharter = {
  attack: 20,
  health: 100,
  crit: 1.2,
  luck: 3,
  win: 0,
  lost: 0,
  points: 0,
  background: "./assets/img/war.jpg",
  filterBrightness: 1,
  filterContrast: 1,
  sound: true,
};

//отслеживаем какого персонажа выбрали
persContainer.addEventListener("click", (e) => {
  persImg.forEach((elem) => {
    elem.classList.remove("pers__img_active");
    if (e.target === elem) {
      e.target.classList.add("pers__img_active");
      persCharter.avatar = `assets${e.target.src.split("assets")[1]}`;
    }
  });
});
///

///отслежтваем нажатие финальной кнопки для моздания персонажи и проверки
persBtn.addEventListener("click", (e) => {
  if (persInput.value === "") {
    alert("Введите имя");
    return;
  }
  if (!persCharter.hasOwnProperty("avatar")) {
    alert("Выбирете аватар:");
    return;
  }
  persCharter.name = persInput.value;
  window.location.href = "./new-game.html";
  localStorage.setItem("user", JSON.stringify(persCharter));
});
///

// Проверяем, есть ли объект в localStorage
const hideBtn = () => {
  if (localStorage.getItem("user") !== null) {
    return;
  } else {
    menulink[1].style.pointerEvents = "none";
    menulink[1].style.opacity = "0.5";
  }
};
hideBtn();

menulink[1].addEventListener("click", () => {
  window.location.href = "./new-game.html";
});
///
