var offsetAngle = 0,
  particle,
  particles = [],
  ctx;

function setup() {
  ctx = createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
//   blendMode(ADD);
  noStroke();
  background(100, 100, 100);
//   frameRate(30)
}

function draw() {
  clear();
  background(0, 0, 100);
  offsetAngle += 0.05;

  if (touchX > 0 && touchY > 0) {
    makeParticles(1, touchX, touchY);
  } else {
    makeParticles(1, width / 2, height / 2);
  }
  for (i = 0; i < particles.length; i++) {
    var p = particles[i];
    p.render();
    p.update();
  }

  while (particles.length > 1000) particles.shift();
}

function makeParticles(pcount, mx, my) {
  print("make particles " + pcount);
  for (var i = 0; i < pcount; i++) {
    var p = new Particle(mx, my, 204);

    var angle = PI + random(-PI, PI);
    var speed = random(2, 8);

    p.velX = sin(angle) * speed;
    p.velY = cos(angle) * speed;

    p.size = random(8, 18);

    particles.push(p);
  }
}

function Particle(x, y, h) {
  this.posX = x;
  this.posY = y;
  this.velX = 0;
  this.velY = 0;
  this.shrink = 0.95;
  this.size = 1;
  this.drag = 0.9;
  this.gravity = 0.2;
  this.hue = h;

  this.update = function() {
    this.velX *= this.drag;
    this.velY *= this.drag;

    this.velY += this.gravity;

    this.posX += this.velX;
    this.posY += this.velY;

    this.size *= this.shrink;
    // this.alpha -= this.fade;
  };

  this.render = function() {
    fill(this.hue, 70, 83);
    ellipse(this.posX, this.posY, this.size);
  };
}
