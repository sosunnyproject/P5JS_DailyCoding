class Ball {
  constructor(x, y){
    this.loc = createVector(x || random(-width/2, width/2), y || random(-height/2, height/2), random(400));  
    this.vel = createVector(random(2, 2), random(1, -1), random(-1, -3));
    this.col = random(0, 360);
    this.size = random(20, 30);
    this.shape = Math.floor(random(1, 5))
    this.acc = createVector(random(0.1), random(0.1))
    this.lifespan = 100.0;
  }
  
  display(){
    noStroke();
    ambientMaterial(255);
    rotateX(frameCount*0.01)
    rotateY(frameCount*0.01)
    rotateZ(frameCount * 0.01);
    switch(this.shape) {
      case 1: 
        cone(this.size, 70);
        break;
      case 2:
        box(this.size);
        break;
      case 3:
        torus(this.size, 15, 3, 3);
        break;
      case 4:
        torus(this.size, 15, 16, 3);
        break;
    }
  }
  
  update(){
    rotateX(millis() / 800);
    rotateZ(millis() / 800);
    this.vel = this.vel.add(this.acc);
    this.loc = this.loc.add(this.vel); 
    this.acc.mult(0.7)
    this.lifespan -= 1;
  }

  bound(){
    if((this.loc.x > width/2 + 100) || (this.loc.x < -width/2 - 100)){
      this.vel.x *= -0.5; 
    }
    if((this.loc.y > height/2 + 100) || (this.loc.y < -height/2 - 100)){
      this.vel.y *= -0.5;
    }
    if((this.loc.z > 500) || (this.loc.z < -500)){
      this.vel.z *= -0.5;
    }
  }

  applyForce(f) {
    this.acc.add(f);
  }

  isDead() {
    if (this.lifespan < 0.0) {
      return true;
    } else {
      return false;
    }
  }
}