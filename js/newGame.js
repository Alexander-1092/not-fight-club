const savedUser = localStorage.getItem("user");
const user = JSON.parse(savedUser);
const fieldNameUser = document.querySelector(".field__name-user");
const fieldImgUser = document.querySelector(".field__img-user");
const enemiesData = {
  enemy1: {
    name: "Калакула",
    attack: 10,
    health: 150,
    crit: 1.5,
    luck: 3,
    avatar: "./assets/img/pers/enemy/enemy1.jpg",
  },
  enemy2: {
    name: "Джегол",
    attack: 15,
    health: 110,
    crit: 1.1,
    luck: 3,
    avatar: "./assets/img/pers/enemy/enemy2.jpg",
  },
  enemy3: {
    name: "Косонтур",
    attack: 10,
    health: 130,
    crit: 2,
    luck: 3,
    avatar: "./assets/img/pers/enemy/enemy3.jpg",
  },
  enemy4: {
    name: "Бреннер",
    attack: 20,
    health: 150,
    crit: 1.2,
    luck: 3,
    avatar: "./assets/img/pers/enemy/enemy4.jpg",
  },
  enemy5: {
    name: "Урактус",
    attack: 25,
    health: 100,
    crit: 1.5,
    luck: 3,
    avatar: "./assets/img/pers/enemy/enemy5.jpg",
  },
};
//показываем имя юзера и его аватар
fieldImgUser.src = user.avatar;
fieldNameUser.textContent = user.name;

const fieldImgEnemy = document.querySelector(".field__img-enemy");
const fieldUserHealth = document.querySelector(".field__user-health");
const fieldNameEnemy = document.querySelector(".field__name-enemy");
const fieldHealthCounterEnemy = document.querySelector(
  ".field__health-counter-enemy"
);

//показываем врага
const getRandomEnemy = () => {
  let randomNum = Math.floor(Math.random() * 5);
  let enemy = enemiesData[Object.keys(enemiesData)[randomNum]];
  fieldNameEnemy.textContent = enemy.name;
  fieldImgEnemy.src = enemy.avatar;
  fieldHealthCounterEnemy.textContent = `${enemy.health}/${enemy.health}`;
};
getRandomEnemy();
//
