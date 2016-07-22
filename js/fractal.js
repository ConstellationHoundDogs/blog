var canvas = document.getElementById('main');
var ctx = canvas.getContext('2d');

var CANVAS_WIDTH = window.innerWidth;
var CANVAS_HEIGHT = window.innerHeight;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var elementArr = [];

function Fractal(ttl, speed, x, y, direction) {
  this.ttl = ttl;
  this.x = x;
  this.y = y;
  this.speed = speed;
  this.initialX = x;
  this.initialY = y;
  this.direction = direction;

  this.ended = false;
}

Fractal.prototype.update = function (deltaTime) {
  this.ttl -= deltaTime;

  if(this.ended){
    return;
  }

  if(this.ttl < 0){
    this.onEnd();
    this.ended = true;
  }

  this.x += Math.cos(this.direction) * this.speed * deltaTime;
  this.y += Math.sin(this.direction) * this.speed * deltaTime;
}

Fractal.prototype.draw = function (deltaTime) {
  ctx.beginPath();
  ctx.moveTo(this.initialX, this.initialY);
  ctx.lineTo(this.x, this.y);
  ctx.stroke();
}

Fractal.prototype.onEnd = function() {
  if(elementArr.length < 254) {
    elementArr.push(new Fractal(1, this.speed, this.x, this.y, this.direction - 0.5));
    elementArr.push(new Fractal(1, this.speed, this.x, this.y, this.direction + 0.5));
  }
}

elementArr.push(new Fractal(1, 25, CANVAS_WIDTH / 2, CANVAS_HEIGHT, 1.5 * Math.PI));

ctx.strokeStyle='#FF0000';

var now = 0;
function mainLoop(timeElapsed) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  var deltaTime = timeElapsed - now;
  now = timeElapsed;
  deltaTime /= 1000;

  for(var i = 0; i < elementArr.length; i++) {
    elementArr[i].update(deltaTime);
    elementArr[i].draw(deltaTime);
  }

  requestAnimationFrame(mainLoop);
}

requestAnimationFrame(mainLoop);
