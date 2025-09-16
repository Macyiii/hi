let phaseIndex = 0; // 0..5
let fontMain;       // optional

function preload() {
  fontMain = loadFont("assets/Montserrat-VariableFont_wght.ttf");
}

function setup() {
  createCanvas(800, 800);
  textAlign(CENTER, CENTER);
  if (fontMain) textFont(fontMain);
  randomizePalette();
  noLoop();  //no animation
  drawScene();
}

function mousePressed() {
  phaseIndex = (phaseIndex + 1) % 6;
  drawScene();
}

function keyPressed() {
  if (key === 'C' || key === 'c') { randomizePalette(); drawScene(); }
  if (key === 'S' || key === 's') { saveCanvas("moon_phase_" + phaseIndex, "png"); }
}

let palette; 

function drawScene() {
  background(palette.night);
  drawStars(120);

  const d = min(width, height) * 0.55;  // diameter
  const cx = width * 0.5;
  const cy = height * 0.42;

  push();
  translate(cx, cy);
  drawMoon(d, phaseIndex);
  pop();

  const manifesto = [
    "You are my crescent moon."
  ];
  drawManifesto(manifesto, cx, cy, d);
}


function drawStars(count) {
  noStroke();
  fill(255, 220);
  for (let i = 0; i < count; i++) {
    const x = random(width);
    const y = random(height * 0.7);
    const s = random(1, 2.5);
    circle(x, y, s);
  }
}

function drawMoon(d, idx) {
  noStroke();
  fill(palette.moon);
  circle(0, 0, d);

  const k = map(idx, 0, 5, -1, 1);
  const shadowOffset = k * (d * 0.45);

  fill(palette.shadow);
  circle(shadowOffset, 0, d);

}


function drawManifesto(lines, cx, cy, d) {
  const base = min(width, height) * 0.05; 
  const leading = base * 1.2;

  fill(palette.text);
  textSize(base);

  const yStart = cy + d * 0.45 + leading * 1.2;
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], width * 0.5, yStart + i * leading);
  }

  textSize(base * 0.55);
  fill(255, 180);
  text("Click to change phase • C to shuffle colors • S to save", width / 2, height - 30);
}

function randomizePalette() {
  const sets = [
    { night: color(10, 18, 35),  moon: color(255,222,33), shadow: color(10, 18, 35),  text: color(230) },
    { night: color(12, 22, 42),  moon: color(255,222,33), shadow: color(12, 22, 42),  text: color(235) },
    { night: color(18, 24, 46),  moon: color(255,222,33), shadow: color(18, 24, 46), text: color(240) },
    { night: color(6, 14, 30),   moon: color(255,222,33), shadow: color(6, 14, 30),   text: color(225) }
  ];
  palette = random(sets);
}
