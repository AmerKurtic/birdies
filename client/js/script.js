class Bird {
    constructor(birdData) {
        this.position = createVector(random(windowWidth), random(windowHeight));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.color = birdData.color
        this.maxForce = birdData.max_force;
        this.maxSpeed = birdData.max_speed;
        this.alignmentMultiplication = 1 + birdData.alignment / 100;
        this.cohesionMultiplication = 1 + birdData.cohesion / 100;
        this.separationMultiplication = 1 + birdData.separation / 100;
    }

    checkEdges() {
        if (this.position.x > width) this.position.x = 0;
        if (this.position.x < 0) this.position.x = width;
        if (this.position.y > height) this.position.y = 0;
        if (this.position.y < 0) this.position.y = height;
    }

    seek(target) {
        let desired = p5.Vector.sub(target,this.position);
        desired.normalize();
        desired.mult(this.maxSpeed);
        let steer = p5.Vector.sub(desired,this.velocity);
        steer.limit(this.maxForce);
        return steer;
    }

    align(birds) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of birds) {
            let d = p5.Vector.dist(this.position, other.position);
            if (other != this && d < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    separate(birds) {
        let perceptionRadius = 50;
        let steering = createVector();
        let total = 0;
        for (let other of birds) {
            let d = p5.Vector.dist(this.position, other.position);
            if (other != this && d < perceptionRadius) {
                let diff = p5.Vector.sub(this.position, other.position);
                diff.div(d * d);
                steering.add(diff);
                total++;
            }
        }
        if (total > 0) {
            steering.div(total);
            steering.setMag(this.maxSpeed);
            steering.sub(this.velocity);
            steering.limit(this.maxForce);
        }
        return steering;
    }

    cohesion(birds) {
        let perceptionRadius = 50;
        let sum = createVector(0, 0);
        let count = 0;
        for (let i = 0; i < birds.length; i++) {
            let d = p5.Vector.dist(this.position,birds[i].position);
            if ((d > 0) && (d < perceptionRadius)) {
                sum.add(birds[i].position);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            return this.seek(sum);
        }
        return createVector(0, 0); }
    }

    flock(birds) {
        let align = this.align(birds);
        let cohesion = this.cohesion(birds);
        let separate = this.separate(birds);
        align.mult(this.alignmentMultiplication);
        cohesion.mult(this.cohesionMultiplication);
        separate.mult(this.separationMultiplication);
        this.acceleration.add(align);
        this.acceleration.add(cohesion);
        this.acceleration.add(separate);
    }

    update() {
        this.velocity.limit(this.maxSpeed);
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }

    show() {
        let theta = this.velocity.heading() + radians(90);
        fill(127);
        stroke(this.color);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -3 * 2);
        vertex(-3, 3 * 2);
        vertex(3, 3 * 2);
        endShape(CLOSE);
        pop();
    }
}