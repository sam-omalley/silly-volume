var circlePos;
var radius;
var dragging;
var hover;
var offset;
var iconWidth;
var padding;
var lineLength;
var volumeDown;
var volumeUp;

function setup() {
  createCanvas(640, 310);
  circlePos = createVector(width / 2, height / 2);
  radius = 10;
  dragging = false;
  hover = false;
  offset = 0;
  padding = 10;
  iconWidth = 30;
  lineLength = 240;

  volumeDown = loadImage('assets/volume_down.png');
  volumeUp = loadImage('assets/volume_up.png');

  ellipseMode(CENTER);
}

function mousePressed() {
  let mousePos = createVector(mouseX, mouseY);
  if (p5.Vector.dist(mousePos, circlePos) < radius) {
    dragging = true;
    previousOffset = offset;
  }
}

function mouseDragged() {
  if (dragging) {
    offset = constrain(mouseX - circlePos.x + previousOffset, -lineLength / 2, lineLength / 2);
  }
}

function mouseMoved() {
  let mousePos = createVector(mouseX, mouseY);
  hover = (p5.Vector.dist(mousePos, circlePos) < radius);
}

function mouseReleased() {
  dragging = false;
}

function draw() {
  background(50, 50, 50);
  smooth();

  stroke(210);
  strokeWeight(4);

  let left = circlePos.x - (lineLength / 2) + offset;
  let right = circlePos.x + (lineLength / 2) + offset;
  line(left, circlePos.y, right, circlePos.y);

  image(volumeDown, left - padding - iconWidth, circlePos.y - iconWidth / 2, iconWidth, iconWidth)
  image(volumeUp, right + padding, circlePos.y - iconWidth / 2, iconWidth, iconWidth)

  if (hover) {
    fill(255);
    stroke(0);
  } else {
    fill(210);
    stroke(0);
  }
  strokeWeight(0.2);

  ellipse(circlePos.x, circlePos.y, radius * 2, radius * 2);
}