const playBtn = document.getElementById("btn");

let gravity = 12;
let lengthMult = 3000000;
let pendulums = [];
let num = 15;
let freq0 = 51;
let c = ["#0077b6", "#0096c7", "#00b4d8", "#48cae4"];

let midiNotes = [
  "91",
  "88",
  "84",
  "79",
  "76",
  " 72",
  "67",
  "64",
  "60",
  "55",
  "52",
  "48",
  "43",
  '40',
  "36"
];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  angleMode(DEGREES);
  strokeWeight(2)

  

  for (let i = 0; i < num; i++) {
    let period = 1 / (freq0 + i);
    let length = gravity * pow(period / TWO_PI, 2) * lengthMult;
    let size = 7 + (i * 0.5)
    let note = midiNotes[i % midiNotes.length];
    pendulums.push(new Pendulum(length, c[i % c.length] , size, note));
    
  }
}

function draw() {
  background(0);
  translate(width / 2, 0);
  playBtn.addEventListener("click", () => {
    if (getAudioContext().state !== "running") {
      getAudioContext().resume();
    }
  });

  for (let i = 0; i < pendulums.length; i++) {
    pendulums[i].draw();
    pendulums[i].update();
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
}
