const savedUser = localStorage.getItem("user");
const user = JSON.parse(savedUser);
const fieldNameUser = document.querySelector(".field__name-user");
const fieldImgUser = document.querySelector(".field__img-user");

let userAttack = user.attack;
let userHealth = user.health;
let newUserHealth = user.health;
let userName = user.name;
let userLuck = user.luck;
let userCrit = user.crit;
let userCritHit = 1;

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
const fieldHealthCounterUser = document.querySelector(
  ".field__health-counter-user"
);
const fieldEnemyHealth = document.querySelector(".field__enemy-health");

let enemyName;
let enemyHealth;
let enemyAttack;
let newEnemyHealth;
let enemyCrit;
let enemyLuck;
let enemyHitCrit = 1;
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
  enemyCrit = enemy.crit;
  enemyLuck = enemy.luck;

  fieldNameEnemy.textContent = enemyName;
  fieldImgEnemy.src = enemy.avatar;
  fieldHealthCounterEnemy.textContent = `${enemyHealth}/${enemyHealth}`;
  fieldHealthCounterEnemy.value = enemyHealth;
};

getRandomEnemy();

let listZonaDefenceUser = [];
let zonaAttackUser;

///определяем выбранные зоны атаки
const fieldInputAttack = document.querySelectorAll(".field__input-attack");

const checkZonaUser = () => {};

fieldInputAttack.forEach((zona) => {
  zona.addEventListener("click", (e) => {
    const elemBody = zona.closest("label").textContent.trim();
    if (listZonaDefenceUser.includes(elemBody)) {
      const indexElemBody = listZonaDefenceUser.indexOf(elemBody);
      listZonaDefenceUser.splice(indexElemBody, 1);
    }
    if (zona.checked) {
      listZonaDefenceUser.push(elemBody);
    }
    blockElemInput();
  });
});
///

///блокируем инпуты если нажато больше двух
const blockElemInput = () => {
  if (listZonaDefenceUser.length >= 2) {
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
    zonaAttackUser = elem.closest("label").textContent.trim();
  });
});
///

const listZonaBody = ["Голова", "Шея", "Тело", "Живот", "Ноги"];
let listZonaDefenceEnemy = [];
let zonaAttackEnemy;

const randomZona = () => {
  while (listZonaDefenceEnemy.length < 2) {
    const random = listZonaBody[Math.floor(Math.random() * 5)];
    if (!listZonaDefenceEnemy.includes(random)) {
      listZonaDefenceEnemy.push(random);
    }
  }
  zonaAttackEnemy = listZonaBody[Math.floor(Math.random() * 5)];
};
randomZona();

const fieldBtnFight = document.querySelector(".field__btn-fight");
const chat = document.querySelector(".chat");

const randomLuckUser = () => {
  userCritHit = 1;
  const arrUser = [...Array(userLuck).keys()];
  let random = Math.floor(Math.random() * 9);
  if (arrUser.includes(random)) {
    userCritHit = userCrit;
  }
};

const randomLuckEnemy = () => {
  enemyHitCrit = 1;
  const arrEnemmy = [...Array(enemyLuck).keys()];
  let random = Math.floor(Math.random() * 9);
  if (arrEnemmy.includes(random)) {
    enemyHitCrit = enemyCrit;
  }
};

fieldBtnFight.addEventListener("click", () => {
  randomLuckUser();
  randomLuckEnemy();
  if (listZonaDefenceUser.length !== 2) {
    alert("выберите две зоны защиты");
    return;
  }
  if (!zonaAttackUser) {
    alert("Выберите зону атаки");
    return;
  }
  if (listZonaDefenceUser.includes(zonaAttackEnemy) && enemyHitCrit === 1) {
    showAttack(true, "user");
  } else {
    showAttack(false, "user");
  }
  if (listZonaDefenceEnemy.includes(zonaAttackUser) && userCritHit === 1) {
    showAttack(true, "enemy");
  } else {
    showAttack(false, "enemy");
  }
  randomZona();
});

const creatElemChat = (attackBlock, zonaAttack, name, attack, crit) => {
  if (attackBlock === "Defence") {
    chat.insertAdjacentHTML(
      "beforeend",
      `<p class="chat__text">${name}, блокирует удар в ${zonaAttack}</p>`
    );
  } else if (attackBlock === "attack") {
    if (crit > 1) {
      chat.insertAdjacentHTML(
        "beforeend",
        `<p class="chat__text">${name}, наносит критический удар в ${zonaAttack} -${
          attack * crit
        } здоровья</p>`
      );
    } else {
      chat.insertAdjacentHTML(
        "beforeend",
        `<p class="chat__text">${name}, наносит удар в ${zonaAttack} -${
          attack * crit
        } здоровья</p>`
      );
    }
  }
};

const attack = (player) => {
  console.log(enemyHitCrit);
  if (player === "user") {
    newEnemyHealth -= userAttack * userCritHit;
    fieldHealthCounterEnemy.textContent = `${newEnemyHealth}/${enemyHealth}`;
    const pricent = ((newEnemyHealth / enemyHealth) * 100).toFixed(2);
    fieldEnemyHealth.style.setProperty("--progress", `${pricent}%`);
  } else if (player === "enemy") {
    newUserHealth -= enemyAttack * enemyHitCrit;
    fieldHealthCounterUser.textContent = `${newUserHealth}/${userHealth}`;
    const pricent = ((newUserHealth / userHealth) * 100).toFixed(2);
    fieldUserHealth.style.setProperty("--progress", `${pricent}%`);
  }
};

//совершаем атаку на врага
const showAttack = (param, player) => {
  if (player === "user") {
    if (param) {
      creatElemChat("Defence", zonaAttackUser, enemyName);
    } else {
      creatElemChat(
        "attack",
        zonaAttackUser,
        userName,
        userAttack,
        userCritHit
      );
      attack("user");
    }
    showWinDefeat();
    resetZeroInputUser();
  } else if (player === "enemy") {
    if (param) {
      creatElemChat("Defence", zonaAttackEnemy, userName);
    } else {
      creatElemChat(
        "attack",
        zonaAttackEnemy,
        enemyName,
        enemyAttack,
        enemyHitCrit
      );
      attack("enemy");
    }
  }
};
///

///проигрыш и выйигришь
const showWinDefeat = () => {
  if (newUserHealth <= 0) {
    user.lost = user.lost + 1;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Вы проиграли");
    // window.location.href = "./person.html";
  } else if (newEnemyHealth <= 0) {
    user.win = user.win + 1;
    localStorage.setItem("user", JSON.stringify(user));
    alert("Вы победили");
    // window.location.href = "./person.html";
  }
};
///

///снимаем активные инпуты
const resetZeroInputUser = () => {
  listZonaDefenceUser = [];
  fieldInputAttack.forEach((elem) => {
    elem.checked = false;
    elem.disabled = false;
  });
  fieldInputDefence.forEach((elem) => {
    elem.checked = false;
  });
};
///
