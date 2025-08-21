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
