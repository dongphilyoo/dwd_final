var dummies = [];
var xoff = 0.0;

function setup() {
    createCanvas(innerWidth, innerHeight);
    //        frameRate(10);
    for (var i = 0; i < 10; i++) {
        dummies[i] = new Dummy(30, 30, 30);
    }
}

function draw() {
    background(255);
    fill(0);
    rect(200, 150, 50, 50);
    for (var i = 0; i < dummies.length; i++) {
        dummies[i].show();
        dummies[i].move();
    }

    if (keyIsDown(RIGHT_ARROW)) {
        console.log('right');
        console.log(dummies[dummies.length - 1]);
        dummies[dummies.length - 1].x += random(3);
    }
    if (keyIsDown(LEFT_ARROW)) {
        console.log('left');
        console.log(dummies[dummies.length - 1]);
        dummies[dummies.length - 1].x -= random(3);
    }
}


function mousePressed() {
    var el = document.getElementById("body");

    //    el.classList.remove("fade-out");

    dummies.push(new Dummy(30, 30, 30));

    el.classList.add("fade-out");
    setTimeout(fadeIn, 100);
}

function fadeIn() {
    var el = document.getElementById("body");
    el.classList.remove("fade-out");
}

//var xoff = 0.0;
//
//function draw() {
//    background(204);
//    xoff = xoff + 0.01;
//    var n = noise(xoff) * width;
//    line(n, 0, n, height);
//}

//function movement() {
//    if (r >= 255) {
//        r = 0;
//    } else {
//        r = r + 30;
//    }
//    setTimeout(rChange, 450);
//}

class Dummy {
    constructor(w, h, r) {
        this.x = random(width);
        this.w = w;
        this.h = h + random(r);
    }
    show() {
        fill(220, 30, 240, 120);
        rect(this.x, height - (this.h + 1), this.w, this.h);
    }
    move() {
        var xc = constrain(this.x, 0, width);
        //        xoff = xoff + 0.01;
        //        this.xoff = this.xoff + 0.01;
        //        this.x = noise(this.xoff) * width;
        this.x = xc + random(-6, 6);
    }
}