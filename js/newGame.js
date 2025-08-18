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
  enemy.luck = enemy.luck;

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

const checkZonaUser = () => {};

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

const randomLuckUser = () => {
  const arrUser = [...Array(userLuck).keys()];
  let random = Math.floor(Math.random() * 9);
  if (arrUser.includes(random)) {
    userCritHit = userCrit;
  }
};

const randomLuckEnemy = () => {
  const arrEnemmy = [...Array(enemyLuck).keys()];
  let random = Math.floor(Math.random() * 9);
  if (arrEnemmy.includes(random)) {
    enemyHitCrit = enemyCrit;
  }
};

fieldBtnFight.addEventListener("click", () => {
  randomLuckUser();
  randomLuckEnemy();
  if (listZonaAttackUser.length !== 2) {
    alert("выберите две зоны защиты");
    return;
  }
  if (!zonaDefenceUser) {
    alert("Выберите зону атаки");
    return;
  }
  if (listZonaAttackUser.includes(zonaDefenceEnemy)) {
    showAttack(true, "user");
  } else {
    showAttack(false, "user");
  }
  if (listZonaAttackEnemy.includes(zonaDefenceUser)) {
    showAttack(true, "enemy");
  } else {
    showAttack(false, "enemy");
  }
  randomZona();
});

///создаём сообщения в чате
// const creatElemChat = (
//   typeAttack,
//   Name,
//   listZonaAttack,
//   attack,
//   crit,
//   zonaDefence
// ) => {
//   if (typeAttack) {
//     chat.insertAdjacentHTML(
//       "beforeend",
//       `<p class="chat__text">${Name} получает удар в ${listZonaAttack[0]} - ${
//         attack * crit
//       }</p>`
//     );
//     chat.insertAdjacentHTML(
//       "beforeend",
//       `<p class="chat__text">${Name} получает удар в ${listZonaAttack[1]} - ${
//         attack * crit
//       }</p>`
//     );
//   } else {
//     chat.insertAdjacentHTML(
//       "beforeend",
//       `<p class="chat__text">${Name} блокирует удар в ${zonaDefence}</p>`
//     );
//     const indexElem = listZonaAttack.indexOf(zonaDefence);
//     listZonaAttack.splice(indexElem, 1);
//     chat.insertAdjacentHTML(
//       "beforeend",
//       `<p class="chat__text">${Name} получает удар в ${listZonaAttack[0]} - ${
//         attack * crit
//       }</p>`
//     );
//   }
// };
///

const attack = (player) => {
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
      listZonaAttackUser.forEach((elem) => {
        if (listZonaAttackUser.includes(elem)) {
          // console.log("block enemy");
        } else {
          attack("user");
        }
      });
    } else {
      attack("user");
    }
    showWinDefeat();
    resetZeroInputUser();
  } else if (player === "enemy") {
    if (param) {
      listZonaAttackEnemy.forEach((elem) => {
        if (listZonaAttackEnemy.includes(elem)) {
          console.log("block");
        } else {
          attack("enemy");
        }
      });
    } else {
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
  listZonaAttackUser = [];
  fieldInputAttack.forEach((elem) => {
    elem.checked = false;
    elem.disabled = false;
  });
  fieldInputDefence.forEach((elem) => {
    elem.checked = false;
  });
};
///
