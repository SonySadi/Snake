function mouseClick(event) {
  let x = event.offsetX;
  let y = event.offsetY - 19;

  let xBox = Math.floor(x / boxUnit);
  let yBox = Math.floor(y / boxUnit);

  if (xBox == 3 && yBox == 0) playOrPauseClick();
}
