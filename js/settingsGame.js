const savedUser = localStorage.getItem("user");
const user = JSON.parse(savedUser);

let userName = user.name;
let backgroundWar = user.background;

const settingNameInput = document.querySelector(".setting__name-input");
const settingBrightnessInput = document.querySelector(
  ".setting__brightness-input"
);
const wrapperSettings = document.querySelector(".wrapper__settings");
const settingContrastInput = document.querySelector(".setting__contrast-input");

settingNameInput.placeholder = `${userName}, введите новое имя`;

settingNameInput.addEventListener("change", () => {
  user.name = settingNameInput.value;
});

const settingBtn = document.querySelector(".setting__btn");
settingBtn.addEventListener("click", () => {
  localStorage.setItem("user", JSON.stringify(user));
  showActiveBackround();
});

settingBrightnessInput.addEventListener("change", () => {
  wrapperSettings.style.filter = `brightness(${settingBrightnessInput.value})`;
  user.filterBrightness = settingBrightnessInput.value;
});

settingContrastInput.addEventListener("change", () => {
  wrapperSettings.style.filter = `contrast(${settingContrastInput.value})`;
  user.filterContrast = settingContrastInput.value;
});

wrapperSettings.style.filter = `brightness(${user.filterBrightness})`;
wrapperSettings.style.filter = `contrast(${user.filterContrast})`;
settingBrightnessInput.value = user.filterBrightness;
settingContrastInput.value = user.filterContrast;

const settingBackgroundImg = document.querySelectorAll(
  ".setting__background-img"
);

const showActiveBackround = () => {
  settingBackgroundImg.forEach((elem) => {
    let correctLink = `./assets${elem.src.split("assets")[1]}`;
    if (correctLink === user.background) {
      elem.classList.add("setting__background-img_active");
    }
  });
};

const settingImgContainer = document.querySelector(".setting__img-container");

settingImgContainer.addEventListener("click", (event) => {
  console.log(event.target);
  settingBackgroundImg.forEach((elem) => {
    elem.classList.remove("setting__background-img_active");
  });
  event.target.classList.add("setting__background-img_active");
  let correctLink = `./assets${event.target.src.split("assets")[1]}`;
  user.background = correctLink;
});

showActiveBackround();

const settingSoundInput = document.querySelector(".setting__sound-input");

const checkSoundInput = () => {
  if (!user.sound) {
    settingSoundInput.checked = false;
  }
};
checkSoundInput();

settingSoundInput.addEventListener("change", () => {
  if (settingSoundInput.checked) {
    user.sound = true;
  } else {
    user.sound = false;
  }
});
