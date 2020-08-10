let flock = [];

const fetchBirds = async () => {
    const response = await fetch('http://localhost:8000/birds/');
    const birds = await response.json(); //extract JSON from the http response
    for (let k in birds) {
        for (let i=0; i < Math.floor(Math.random() * birds[k].max_amount) + birds[k].min_amount; i++)
        flock.push(new Bird(birds[k]));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    fetchBirds();
}

function draw() {
  background('#142B40');
  for (let bird of flock) {
    bird.checkEdges();
    bird.flock(flock);
    bird.update();
    bird.show();
  }
}