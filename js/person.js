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
