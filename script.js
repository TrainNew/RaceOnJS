const scrote = document.querySelector(".score"),
  start = document.querySelector(".start"),
  car = document.createElement("div"),
  gameArea = document.querySelector(".gameArea");

car.classList.add("car");

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const setting = {
  start: false,
  score: 0,
  speed: 3,
  traffic: 3,
};

const startGame = () => {
  start.classList.add("hide");
  for (let i = 0; i < getQuantityElements(105); i++) {
    const line = document.createElement("div");
    line.classList.add("line");
    line.style.top = i * 105 + "px";
    line.y = i * 105;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityElements(120 * setting.traffic); i++) {
    const enemies = document.createElement("div");
    enemies.classList.add("enemy");
    enemies.y = -120 * setting.traffic * (i + 1);
    enemies.style.left =
      Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    enemies.style.top = enemies.y + "px";
    enemies.style.background =  'transparent url(../image/E.png) center / cover no-repeat';
    gameArea.appendChild(enemies);
  }
  setting.start = true;
  gameArea.appendChild(car);
  setting.x = car.offsetLeft;
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame);
};

const playGame = () => {
  moveRoad();
  moveEnemy();
  if (setting.start) {
    if (keys.ArrowLeft && setting.x > 0) {
      setting.x -= setting.speed;
    }

    if (keys.ArrowRight && setting.x < gameArea.offsetWidth - car.offsetWidth) {
      setting.x += setting.speed;
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -= setting.speed;
    }
    if (
      keys.ArrowDown &&
      setting.y < gameArea.offsetHeight - car.offsetHeight
    ) {
      setting.y += setting.speed;
    }
    car.style.left = setting.x + "px";
    car.style.top = setting.y + "px";
    requestAnimationFrame(playGame);
  }
};
const startRun = (e) => {
  e.preventDefault();
  keys[e.key] = true;
};

const stopRun = (e) => {
  e.preventDefault();
  keys[e.key] = false;
};

const moveRoad = () => {
  let lines = document.querySelectorAll(".line");
  lines.forEach((line) => {
    line.y += setting.speed;
    line.style.top = line.y + "px";
    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
};

const moveEnemy = () => {
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach((i) => {
    i.y += setting.speed / 2;
    i.style.top = i.y + "px";
    if (i.y >= document.documentElement.clientHeight) {
      i.y = -120 * setting.traffic;
      i.style.left =
        Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
    }
  });
};

const getQuantityElements = (heightElement) =>
  document.documentElement.clientHeight / heightElement + 1;

start.addEventListener("click", startGame);
document.addEventListener("keydown", startRun);
document.addEventListener("keyup", stopRun);
