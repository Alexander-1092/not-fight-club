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
let userPoints = user.points;

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

fieldHealthCounterUser.textContent = `${userHealth}/${userHealth}`;
const fieldEnemyHealth = document.querySelector(".field__enemy-health");

let enemyName;
let enemyHealth;
let enemyAttack;
let newEnemyHealth;
let enemyCrit;
let enemyLuck;
let enemyHitCrit = 1;
let ennemyAvatar;

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
  ennemyAvatar = enemy.avatar;
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
  const arrUser = [...Array(Math.round(userLuck)).keys()];
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

const creatElemChat = (
  attackBlock,
  zonaAttack,
  nameAct,
  namePas,
  attack,
  crit
) => {
  if (attackBlock === "Defence") {
    chat.insertAdjacentHTML(
      "afterbegin",
      `<p class="chat__text chat__text-defence">${nameAct}, блокирует удар в ${zonaAttack} от ${namePas}</p>`
    );
  } else if (attackBlock === "attack") {
    if (crit > 1) {
      chat.insertAdjacentHTML(
        "afterbegin",
        `<p class="chat__text chat__text-crit">${nameAct}, наносит <span>критический удар</span> ${namePas} в ${zonaAttack} -${Math.round(
          attack * crit
        )} здоровья</p>`
      );
    } else {
      chat.insertAdjacentHTML(
        "afterbegin",
        `<p class="chat__text chat__text-attack">${nameAct}, наносит удар ${namePas} в ${zonaAttack} -${Math.round(
          attack * crit
        )} здоровья</p>`
      );
    }
  }
};

const currentHelth = {
  healthEnnemy: 0,
  healthUser: 0,
  newGame: false,
  enemyNum: 0,
  nameEnnemy: enemyName,
  attackEnnemy: enemyAttack,
  critEnnemy: enemyCrit,
  luckEnnemy: enemyLuck,
  avatarEnnemy: ennemyAvatar,
};

const getSetHealth = () => {
  if (localStorage.getItem("continueGame") !== null) {
    const saveHealth = localStorage.getItem("continueGame");
    const healthObj = JSON.parse(saveHealth);
    if (!healthObj.newGame) {
      newEnemyHealth = healthObj.healthEnnemy;
      newUserHealth = healthObj.healthUser;

      fieldNameEnemy.textContent = healthObj.nameEnnemy;
      fieldImgEnemy.src = healthObj.avatarEnnemy;
      enemyAttack = healthObj.attackEnnemy;
      enemyCrit = healthObj.critEnnemy;
      enemyLuck = healthObj.luckEnnemy;

      const pricentEnnemy = ((newEnemyHealth / enemyHealth) * 100).toFixed(2);
      fieldEnemyHealth.style.setProperty("--progress", `${pricentEnnemy}%`);
      fieldHealthCounterEnemy.textContent = `${newEnemyHealth}/${enemyHealth}`;

      const pricentUser = ((newUserHealth / userHealth) * 100).toFixed(2);
      fieldUserHealth.style.setProperty("--progress", `${pricentUser}%`);
      fieldHealthCounterUser.textContent = `${newUserHealth}/${userHealth}`;
    }
  }
};

getSetHealth();

const attack = (player) => {
  if (player === "user") {
    newEnemyHealth -= Math.round(userAttack * userCritHit);
    fieldHealthCounterEnemy.textContent = `${newEnemyHealth}/${enemyHealth}`;
    const pricent = ((newEnemyHealth / enemyHealth) * 100).toFixed(2);
    fieldEnemyHealth.style.setProperty("--progress", `${pricent}%`);
  } else if (player === "enemy") {
    newUserHealth -= Math.round(enemyAttack * enemyHitCrit);
    fieldHealthCounterUser.textContent = `${newUserHealth}/${userHealth}`;
    const pricent = ((newUserHealth / userHealth) * 100).toFixed(2);
    fieldUserHealth.style.setProperty("--progress", `${pricent}%`);
    showWinDefeat();
  }
  currentHelth.healthEnnemy = newEnemyHealth;
  currentHelth.healthUser = newUserHealth;
  localStorage.setItem("continueGame", JSON.stringify(currentHelth));
};

//совершаем атаку на врага
const showAttack = (param, player) => {
  if (player === "user") {
    if (param) {
      creatElemChat("Defence", zonaAttackUser, enemyName, userName);
    } else {
      creatElemChat(
        "attack",
        zonaAttackUser,
        userName,
        enemyName,
        userAttack,
        userCritHit
      );
      attack("user");
    }
    resetZeroInputUser();
  } else if (player === "enemy") {
    if (param) {
      creatElemChat("Defence", zonaAttackEnemy, userName, enemyName);
    } else {
      creatElemChat(
        "attack",
        zonaAttackEnemy,
        enemyName,
        userName,
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
    currentHelth.newGame = true;
    alert("Вы проиграли");
    location.reload();
  } else if (newEnemyHealth <= 0) {
    user.win = user.win + 1;
    user.points = user.points + 1;
    localStorage.setItem("user", JSON.stringify(user));
    currentHelth.newGame = true;
    alert("Вы победили");
    window.location.href = "./person.html";
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

///для смены яркости, контраста, фона
const bodyNewGame = document.querySelector(".body-new-game ");
bodyNewGame.style.filter = `brightness(${user.filterBrightness})`;
bodyNewGame.style.filter = `contrast(${user.filterContrast})`;
bodyNewGame.style.backgroundImage = `url(${user.background})`;
////
