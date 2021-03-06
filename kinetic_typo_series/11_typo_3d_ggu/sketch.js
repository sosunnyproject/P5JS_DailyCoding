let img, tileSize
let angle = 0
let points = []
let loopDuration = 1.5 * 60

function preload() {
  img = loadImage('ggu640.jpg')
}

function setup() {
  createCanvas(960, 960, WEBGL);
  rectMode(CENTER)

  let tiles = 30
  tileSize = width / tiles

  for (let y = 0; y < height; y += tileSize) {
    for (let x = 0; x < width; x += tileSize) {
      let c = img.get(x, y)
      let b = brightness(c)
      if (b > 1) {
        points.push({
          x: x,
          y: y,
          b: b
        })
      }
    }
  }
  // console.log(points)
  // colorMode(HSB)
}

function draw() {
  background(0);
  // rotateX(sin(frameCount/50*PI/2))
  rotateY(cos(frameCount/50*PI/6))
  // rotateZ(tan(frameCount/100*PI/4))
  orbitControl()

  let count = 10
  translate(-width / 3, -height / 3)
  noStroke()

  // size
  let cf = frameCount % loopDuration
  let t = cf / loopDuration
  let u = map(t, 0, 1, 0, PI)
  let randInd = floor(map(abs(cos(frameCount / 300)), 0, 1, 0, 124))
  let randInd2 = floor(map(abs(sin(frameCount / 100)), 1, 0, 0, 124))

  for (let i = 0; i < count; i++) {
    // console.log(i, black%count)
    
    // let h1 = (300 + angle + i * offset) % 360
    // let l = floor(map(i, 0, count, 0, 255))
    // let cfill = `hsl(${l%360}, 100%, ${l}%)`
    // fill(cfill)
    
    points.forEach((p, ind) => { // total 124
      fill(255);
      ((p.x < width/3) && ind < 70) && fill(255, 0, 0);
      
      ((p.x >= width/3) && ind < 70 ) && fill(0, 255, 0);

      // (ind === randInd) && fill(0);
      // (ind === randInd2) && fill(0);
    
      // h2 = 360 - h1

      // let cstroke = `hsl(${h2}, 100%, ${50}%)`
      push()
      translate(p.x, p.y, -i * tileSize)
      // rotateZ(cos(frameCount / 100))
      // stroke(cstroke)
      // box(tileSize)
      box(tileSize * sin(u - i * 0.5 + ind * 0.01) * 0.75)
      pop()
    })

  }
}