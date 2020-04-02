const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");

const boxUnit = 32;
let gameStatus = "pause";
// create the snake
let snake = [];
snake[0] = {
  x: 9 * boxUnit,
  y: 10 * boxUnit
};
// create the food
let food = genareteFood(boxUnit);
function genareteFood(boxUnit) {
  let randomX = Math.floor(Math.random() * 17 + 1);
  let randomY = Math.floor(Math.random() * 15 + 3);

  // so that food don't conflict with snake location
  if (randomX == 9 && randomY == 10) return genareteFood(boxUnit);

  return {
    x: randomX * boxUnit,
    y: randomY * boxUnit
  };
}
// create the score var
let score = 0;

//control the snake
let d;
document.addEventListener("keydown", direction);
function direction(event) {
  let key = event.keyCode;

  if ((key == 37) | (key == 38) | (key == 39) | (key == 40)) {
    gameStatus = "play";
  }

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

// mouse click
cvs.addEventListener("mousedown", mouseClick, false);

// play pause button
function genaratePlayPause() {
  if (d == undefined) {
    playImg.src = "img/play.png";
  } else {
    playImg.src = "img/pause.png";
  }
  ctx.drawImage(playImg, 3 * boxUnit, 0.6 * boxUnit, boxUnit, boxUnit);
}

// cheack collision function
function collision(newHead, snake) {
  for (let i = 0; i < snake.length; i++) {
    if (newHead.x == snake[i].x && newHead.y == snake[i].y) {
      return true;
    }
  }
  return false;
}

function draw() {
  //drawings
  ctx.drawImage(groundImg, 0, 0);
  ctx.drawImage(foodImg, food.x, food.y);

  //draw play button
  genaratePlayPause();

  drawSnake(snake, ctx, boxUnit);

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
    food = genareteFood(boxUnit);
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
    gameStatus = "pause";
    d = undefined;
    genaratePlayPause();

    dead.play();
    clearInterval(game);
  }
  snake.unshift(newHead);

  scoreShow(ctx, score);
}
//window.onload = draw();
let game = setInterval(draw, 300);
