function playOrPauseClick() {
  if (gameStatus == "pause") {
    snake = [];
    snake[0] = {
      x: 9 * boxUnit,
      y: 10 * boxUnit
    };
    d = "UP";
    clearInterval(game);
    game = setInterval(draw, 300);
  } else {
    clearInterval(game);
  }
}
