const savedUser = localStorage.getItem("user");
const user = JSON.parse(savedUser);
const fieldNameUser = document.querySelector(".field__name-user");
const fieldImgUser = document.querySelector(".field__img-user");

let userAttack = user.attack;
let userHealth = user.health;

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
const fieldEnemyHealth = document.querySelector(".field__enemy-health");

let enemyName;
let enemyHealth;
let enemyAttack;
let newEnemyHealth;
//показываем врага
const getRandomEnemy = () => {
  let randomNum = Math.floor(Math.random() * 5);
  let enemy = enemiesData[Object.keys(enemiesData)[randomNum]];
  redefineParam(enemy);
};

//
const redefineParam = (enemy) => {
  enemyName = enemy.name;
  enemyHealth = enemy.health;
  newEnemyHealth = enemy.health;
  enemyAttack = enemy.attack;

  fieldNameEnemy.textContent = enemyName;
  fieldImgEnemy.src = enemy.avatar;
  fieldHealthCounterEnemy.textContent = `${enemyHealth}/${enemyHealth}`;
  fieldHealthCounterEnemy.value = enemyHealth;
};

getRandomEnemy();

let listZonaAttackUser = [];
let zonaDefenceUser;

///определяем выбранные зоны атаки
const fieldInputAttack = document.querySelectorAll(".field__input-attack");

fieldInputAttack.forEach((zona) => {
  zona.addEventListener("click", (e) => {
    const elemBody = zona.closest("label").textContent.trim();
    if (listZonaAttackUser.includes(elemBody)) {
      const indexElemBody = listZonaAttackUser.indexOf(elemBody);
      listZonaAttackUser.splice(indexElemBody, 1);
    }
    if (zona.checked) {
      listZonaAttackUser.push(elemBody);
    }
    blockElemInput();
  });
});
///

///блокируем инпуты если нажато больше двух
const blockElemInput = () => {
  if (listZonaAttackUser.length >= 2) {
    fieldInputAttack.forEach((elem) => {
      if (!elem.checked) {
        elem.disabled = true;
      }
    });
  } else {
    fieldInputAttack.forEach((elem) => {
      if (!elem.checked) {
        elem.disabled = false;
      }
    });
  }
};
///

///выбираем зону защиты
const fieldInputDefence = document.querySelectorAll(".field__input-defence");

fieldInputDefence.forEach((elem) => {
  elem.addEventListener("change", () => {
    zonaDefenceUser = elem.closest("label").textContent.trim();
  });
});
///

const listZonaBody = ["Голова", "Шея", "Тело", "Живот", "Ноги"];
let listZonaAttackEnemy = [];
let zonaDefenceEnemy;

const randomZona = () => {
  while (listZonaAttackEnemy.length < 2) {
    const random = listZonaBody[Math.floor(Math.random() * 5)];
    if (!listZonaAttackEnemy.includes(random)) {
      listZonaAttackEnemy.push(random);
    }
  }
  zonaDefenceEnemy = listZonaBody[Math.floor(Math.random() * 5)];
};
randomZona();

const fieldBtnFight = document.querySelector(".field__btn-fight");
const chat = document.querySelector(".chat");

fieldBtnFight.addEventListener("click", () => {
  if (listZonaAttackUser.includes(zonaDefenceEnemy)) {
    creatElemChat(false);
    showAttack(false, "enemy");
  } else {
    creatElemChat(true);
    showAttack(true, "enemy");
  }
});

///создаём сообщения в чате
const creatElemChat = (typeAttack) => {
  if (typeAttack) {
    chat.insertAdjacentHTML(
      "beforeend",
      `<p class="chat__text">${enemyName} получает удар в ${listZonaAttackUser[0]} - ${userAttack}</p>`
    );
    chat.insertAdjacentHTML(
      "beforeend",
      `<p class="chat__text">${enemyName} получает удар в ${listZonaAttackUser[1]} - ${userAttack}</p>`
    );
  } else {
    chat.insertAdjacentHTML(
      "beforeend",
      `<p class="chat__text">${enemyName} блокирует удар в ${zonaDefenceEnemy}</p>`
    );
    const indexElem = listZonaAttackUser.indexOf(zonaDefenceEnemy);
    listZonaAttackUser.splice(indexElem, 1);
    chat.insertAdjacentHTML(
      "beforeend",
      `<p class="chat__text">${enemyName} получает удар в ${listZonaAttackUser[0]} - ${userAttack}</p>`
    );
  }
};
///

//совершаем атаку на врага
const showAttack = (param, player) => {
  if (player === "enemy") {
    param ? (newEnemyHealth -= userAttack * 2) : (newEnemyHealth -= userAttack);
    fieldHealthCounterEnemy.textContent = `${newEnemyHealth}/${enemyHealth}`;
    fieldHealthCounterEnemy.value = enemyHealth;
    const pricent = ((newEnemyHealth / enemyHealth) * 100).toFixed(2);
    fieldEnemyHealth.style.setProperty("--progress", `${pricent}%`);
  }
};
///
