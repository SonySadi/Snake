function drawSnake(snake, ctx, boxUnit) {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "green" : "white";
    ctx.fillRect(snake[i].x, snake[i].y, boxUnit, boxUnit);
    ctx.strokeStyle = "red";
    ctx.strokeRect(snake[i].x, snake[i].y, boxUnit, boxUnit);
  }
}
