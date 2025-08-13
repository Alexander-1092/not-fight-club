const savedUser = localStorage.getItem("user");
const user = JSON.parse(savedUser);
const fieldNameUser = document.querySelector(".field__name-user");
fieldNameUser.textContent = user.name;
const fieldImgUser = document.querySelector(".field__img-user");
const enemy = {
  enemy1: {
    name: "Калакула",
    attack: 10,
    health: 150,
    crit: 1.5,
    avatar: "./assets/img/pers/enemy/enemy1.jpg",
  },
  enemy2: {
    name: "Джегол",
    attack: 15,
    health: 110,
    crit: 1.1,
    avatar: "./assets/img/pers/enemy/enemy2.jpg",
  },
  enemy3: {
    name: "Косонтур",
    attack: 10,
    health: 130,
    crit: 2,
    avatar: "./assets/img/pers/enemy/enemy3.jpg",
  },
  enemy4: {
    name: "Бреннер",
    attack: 20,
    health: 150,
    crit: 1.2,
    avatar: "./assets/img/pers/enemy/enemy4.jpg",
  },
  enemy5: {
    name: "Урактус",
    attack: 25,
    health: 100,
    crit: 1.5,
    avatar: "./assets/img/pers/enemy/enemy5.jpg",
  },
};

fieldImgUser.src = user.avatar;
const fieldImgEnemy = document.querySelector(".field__img-enemy");
