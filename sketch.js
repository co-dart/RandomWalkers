let r = 30;
let pts = [];
let crawlers = [];
let gridDensity = 20;
let numCrawlers = 100;
let maxSpeed = 0.008;
let minSpeed = 0.002;

function setup() {
  createCanvas(1080, 720);
  stroke(255);
  for (let i = 0; i < height / gridDensity; i++) {
    for (let j = 0; j < width / gridDensity; j++) {
      let pt = createVector(j * gridDensity, i * gridDensity).add(p5.Vector.random2D().mult(20));
      pts.push(pt);
    }
  }
  
  for (let i = 0; i < numCrawlers; i++){
    crawlers.push(new Crawler());
  }
}

function draw() {
  background(0);
  
  for (let crawler of crawlers) {
    crawler.move();
    for (let pt of pts) {
      //point(pt.x, pt.y);
      if (crawler.checkDist(pt) <= r) {
        crawler.drawLine(pt);
        
      }
    }
  }
  console.log(frameCount);
  if (frameCount === 1000) {
    noLoop();
  }
}

function ease(amt) {
  return -(cos(PI * amt) - 1) / 2;
};

class Crawler {
  constructor() {
    this.start = createVector(width / 2, height / 2).add(p5.Vector.random2D().mult(width / 2));
    this.current = this.start;
    this.destination = random(pts);
    this.amount = 0;
    this.speed = random(minSpeed, maxSpeed);
  }
  
  move() {
    let amt = ease(this.amount);
    //console.log("amt: " + amt + ", amount: " + this.amount);
    this.current = p5.Vector.lerp(this.start, this.destination, amt);
    //console.log(this.t);
    this.amount = min(this.amount + this.speed, 1);
    if (this.amount == 1) {
      this.start = this.destination;
      this.destination = random(pts);
      this.amount = 0;
    }
  }
  
  checkDist(v) {
    return this.current.dist(v); 
  }
  
  drawLine(v) {
    line(this.current.x, this.current.y, v.x, v.y);
  }
}
