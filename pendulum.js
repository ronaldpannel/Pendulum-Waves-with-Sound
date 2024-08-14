class Pendulum {
  constructor(length, nc, size, note) {
    this.length = length;
    this.x;
    this.y;
    this.angle = 45;
    this.angleV = 0;
    this.angleA = 0;
    this.c = c;
    this.nc = nc;
    this.size = size;
    this.note = note

     this.env = new p5.Envelope();
     let attackVol = 1;
     let releaseVol = 0;
     let sustainVol = 1;

     let attackTime = 0.01;
     let releaseTime = 0.1;
     let sustainTime = 0.01;
     this.env.setADSR(attackTime, sustainTime, sustainVol, releaseTime);
     this.env.setRange(attackVol, releaseVol);

     this.ocs = new p5.Oscillator();
     this.ocs.start();
     this.ocs.freq(midiToFreq(this.note));
     this.ocs.amp(this.env);
  }
  update() {
    if (this.collision()) {
      this.c = color(255);
      this.env.play()
    } else {
      this.c = color(this.nc);
    }
    this.angleA = (-gravity / this.length) * sin(this.angle);
    this.angleV += this.angleA;
    this.angle += this.angleV;

    this.x = this.length * sin(this.angle);
    this.y = this.length * cos(this.angle);
  }
  draw() {
    stroke(this.c);
    fill(this.c)
    line(0, 0, this.x, this.y);
    ellipse(this.x, this.y, this.size, this.size);
  }
  collision() {
    if (this.x >= -10 && this.x <= 10) {
      return true;
    } else {
      return false;
    }
  }
}
