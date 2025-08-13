const savedUser = localStorage.getItem("user");
const user = JSON.parse(savedUser);

const fieldImgUser = document.querySelector(".field__img-user");
fieldImgUser.src = user.avatar;
const fieldNameUser = document.querySelector(".field__name-user");
fieldNameUser.textContent = user.name;
