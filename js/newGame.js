const savedUser = localStorage.getItem("user");
const user = JSON.parse(savedUser);
const fieldNameUser = document.querySelector(".field__name-user");
const fieldImgUser = document.querySelector(".field__img-user");

let userAttack = user.attack;
let userHealth = user.health;
let newUserHealth = user.health;
let userName = user.name;

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
    console.log(listZonaAttackUser);
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
  if (listZonaAttackUser.length !== 2) {
    alert("выберите две зоны атаки");
    return;
  }
  if (!zonaDefenceUser) {
    alert("Выберите зону защиты");
    return;
  }
  if (listZonaAttackUser.includes(zonaDefenceEnemy)) {
    creatElemChat(
      false,
      enemyName,
      listZonaAttackUser,
      userAttack,
      zonaDefenceEnemy
    );
    showAttack(false, "enemy");
  } else {
    creatElemChat(
      true,
      enemyName,
      listZonaAttackUser,
      userAttack,
      zonaDefenceEnemy
    );
    showAttack(true, "enemy");
  }
  if (listZonaAttackEnemy.includes(zonaDefenceUser)) {
    creatElemChat(
      false,
      userName,
      listZonaAttackEnemy,
      enemyAttack,
      zonaDefenceUser
    );
    showAttack(false, "user");
  } else {
    creatElemChat(
      true,
      userName,
      listZonaAttackEnemy,
      enemyAttack,
      zonaDefenceUser
    );
    showAttack(true, "user");
  }
  randomZona();
});

///создаём сообщения в чате
const creatElemChat = (
  typeAttack,
  Name,
  listZonaAttack,
  attack,
  zonaDefence
) => {
  if (typeAttack) {
    chat.insertAdjacentHTML(
      "beforeend",
      `<p class="chat__text">${Name} получает удар в ${listZonaAttack[0]} - ${attack}</p>`
    );
    chat.insertAdjacentHTML(
      "beforeend",
      `<p class="chat__text">${Name} получает удар в ${listZonaAttack[1]} - ${attack}</p>`
    );
  } else {
    chat.insertAdjacentHTML(
      "beforeend",
      `<p class="chat__text">${Name} блокирует удар в ${zonaDefence}</p>`
    );
    const indexElem = listZonaAttack.indexOf(zonaDefence);
    listZonaAttack.splice(indexElem, 1);
    chat.insertAdjacentHTML(
      "beforeend",
      `<p class="chat__text">${Name} получает удар в ${listZonaAttack[0]} - ${attack}</p>`
    );
  }
};
///

//совершаем атаку на врага
const showAttack = (param, player) => {
  if (player === "enemy") {
    param ? (newEnemyHealth -= userAttack * 2) : (newEnemyHealth -= userAttack);
    fieldHealthCounterEnemy.textContent = `${newEnemyHealth}/${enemyHealth}`;
    const pricent = ((newEnemyHealth / enemyHealth) * 100).toFixed(2);
    fieldEnemyHealth.style.setProperty("--progress", `${pricent}%`);
  } else if (player === "user") {
    param ? (newUserHealth -= enemyAttack * 2) : (newUserHealth -= enemyAttack);
    fieldHealthCounterUser.textContent = `${newUserHealth}/${userHealth}`;
    const pricent = ((newUserHealth / userHealth) * 100).toFixed(2);
    fieldUserHealth.style.setProperty("--progress", `${pricent}%`);
    showWinDefeat();
    resetZeroInputUser();
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
