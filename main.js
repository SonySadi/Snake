const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const boxUnit = 32;

//load images
let foodImg = new Image();
foodImg.src = "img/food.png";

let groundImg = new Image();
groundImg.src = "img/ground.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake
let snake = [];
snake[0] = {
  x: 9 * boxUnit,
  y: 10 * boxUnit
};

// create the food
let food = {
  x: Math.floor(Math.random() * 17 + 1) * boxUnit,
  y: Math.floor(Math.random() * 15 + 3) * boxUnit
};

// create the score var

let score = 0;

//control the snake

let d;
document.addEventListener("keydown", direction);
function direction(event) {
  let key = event.keyCode;
  if (key == 37 && d != "RIGHT") {
    left.play();
    d = "LEFT";
  } else if (key == 38 && d != "DOWN") {
    d = "UP";
    up.play();
  } else if (key == 39 && d != "LEFT") {
    d = "RIGHT";
    right.play();
  } else if (key == 40 && d != "UP") {
    d = "DOWN";
    down.play();
  }
}

// cheack collision function
function collision(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}
function draw() {
  ctx.drawImage(groundImg, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, boxUnit, boxUnit);

    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, boxUnit, boxUnit);
  }

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // which direction
  if (d == "LEFT") snakeX -= boxUnit;
  if (d == "UP") snakeY -= boxUnit;
  if (d == "RIGHT") snakeX += boxUnit;
  if (d == "DOWN") snakeY += boxUnit;

  // if the snake eats the food
  if (snakeX == food.x && snakeY == food.y) {
    eat.play();
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * boxUnit,
      y: Math.floor(Math.random() * 15 + 3) * boxUnit
    };
    // we don't remove the tail
  } else {
    // remove the tail
    snake.pop();
  }

  // add new Head

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  // game over

  if (
    snakeX < boxUnit ||
    snakeX > 17 * boxUnit ||
    snakeY < 3 * boxUnit ||
    snakeY > 17 * boxUnit ||
    collision(newHead, snake)
  ) {
    dead.play();
    clearInterval(game);
  }

  snake.unshift(newHead);

  ctx.fillStyle = "white";
  ctx.font = "45px Changa one";
  ctx.fillText(score, 2 * boxUnit, 1.6 * boxUnit);
}
//window.onload = draw();
let game = setInterval(draw, 300);
