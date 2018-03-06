var myRec = new p5.SpeechRec('en-US', parseResult); // new P5.SpeechRec object
myRec.continuous = true; // do continuous recognition
myRec.interimResults = true; // allow partial recognition (faster, less accurate)

var x, y;
var dx, dy;


var dummies = [];
var xoff = 0.0;

var socket;// = io.connect();
function setup(){
    // graphics stuff:
    createCanvas(innerWidth, innerHeight);
    background(255, 255, 255);
    for (var i = 0; i < 10; i++) {
        dummies[i] = new Dummy(30, 30, 30);
    }
    socket = io.connect('https://67.207.89.207:1337');
    // instructions:
    textSize(48);
    textAlign(CENTER);

    myRec.start(); // start engine
    socket.on('mouse',
        function (data) {
            var el = document.getElementById("body");

            dummies.push(new Dummy(data.w, data.h, data.r));

            el.classList.add("fade-out");
            setTimeout(fadeIn, 100);
        }
    );
}
function mousePressed() {
    // Make a little object with mouseX and mouseY
    var data = {
        w: 30,
        h: 30,
        r: 30
    };
    // Send that object to the socket
    socket.emit('mouse', data);
}

function draw(){
    background(255);
    fill(0);
    rect(200, 150, 50, 50);
    for (var i = 0; i < dummies.length; i++){
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
    if (keyIsDown(ENTER)) {
        console.log(dummies[dummies.length - 1]);
    }
}


function fadeIn() {
    var el = document.getElementById("body");
    el.classList.remove("fade-out");
}

function parseResult()
{
    // recognition system will often append words into phrases.
    var res = myRec.resultString;
    console.log(res, '\t',dummies[dummies.length - 1]);
    switch (res){
        case 'left':
            dummies[dummies.length - 1].x -= random(3);
            break;
        case 'right':
            dummies[dummies.length - 1].x += random(3);
            break;
        case 'kill':
            break;                    
    }

    // text(res, width/2, height/2);
    socket.emit('result', { 'word': res });
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
        //        xoff = xoff + 0.01;
        //        this.xoff = this.xoff + 0.01;
        //        this.x = noise(this.xoff) * width;
        this.x = xc + random(-6, 6);
    }
}