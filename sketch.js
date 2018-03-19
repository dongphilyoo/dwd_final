var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

var x, y;
var dx, dy;
var s = 2;

var dummies = [];
var xoff = 0.0;

var socket; // = io.connect();
function setup() {
    createCanvas(innerWidth, innerHeight);
    background(255, 255, 255);
    for (var i = 0; i < 12; i++) {
        dummies[i] = new Dummy(50, 50, 50);
    }
    socket = io.connect('https://45.55.233.15:1337');
    // instructions:
    textSize(48);
    textAlign(CENTER);

    myRec.start(); // start engine

    socket.on('mouse',
        function (data) {
            var el = document.getElementById("body");

            //    el.classList.remove("fade-out");

            dummies.push(new Dummy(data.w, data.h, data.r));

            el.classList.add("fade-out");
            setTimeout(fadeIn, 100);
        }
    );
}

function draw() {
    background(255);
    fill(0);
    rect(260, 150, 150, 150);

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
    if (keyIsDown(32)) {
        console.log(dummies[dummies.length - 1]);
        //killPlayer();
        var collision1 = dist(dummies[dummies.length - 1].x, height, dummies[1].x, height);
        var collision2 = dist(dummies[dummies.length - 1].x, height, dummies[2].x, height);

        if (collision1 <= 18 || collision2 <= 18) {
            console.log("bam");
            noLoop();
            textSize(38);
            fill(0);
            textAlign(CENTER);
            text("You got the right one.", width / 2 + 60, 240);
        } else {
            textSize(48);
            fill(255, 0, 0);
            textAlign(CENTER);
            text("Do not kill AI!", random(width * 0.33, width * 0.66), random(60, 300));
            s += 0.025;
            console.log("boom");
        }
    }
}


function fadeIn() {
    var el = document.getElementById("body");
    el.classList.remove("fade-out");
}

function parseResult() {
    // recognition system will often append words into phrases.
    var res = myRec.resultString;

    switch (res) {
        case 'left':
            dummies[dummies.length - 1].x -= 10;
            break;
        case 'right':
            dummies[dummies.length - 1].x += 10;
            break;
        case 'bang':
            var collision1 = int(dist(dummies[dummies.length - 1].x, dummies[dummies.length - 1].y, dummies[1].x, dummies[1].y));
            var collision2 = int(dist(dummies[dummies.length - 1].x, dummies[dummies.length - 1].y, dummies[2].x, dummies[2].y));
            console.log(collision1 + " / " + collision2);
            console.log(dummies[1].x + " / " + dummies[dummies.length - 1]);


            if (collision1 <= 15 || collision2 <= 15) {
                alert("bam");
            } else {
                console.log("boom");
            }
            //            killPlayer();
            break;
    }

    socket.emit('result', {
        'word': res
    });
    console.log(res, '\t', dummies[dummies.length - 1]);
}


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
        this.x = xc + random(-1 * s, s);
    }
}
