window.onload = function() {
    // creates background
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var boxLen = (canvas.clientWidth/10)*1;
    var boxWidth = (canvas.clientHeight/10)*1
    var padding = (canvas.clientWidth - boxWidth) / 2

    ctx.fillStyle = "#f2f2f2";
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    // draw graph box
    ctx.beginPath();
    ctx.rect(boxLen, boxWidth, 400, 400);
    ctx.stroke();

    // Line of equality
    ctx.beginPath();
    ctx.moveTo(50, 450);
    ctx.lineTo(450, 50);
    ctx.stroke();
    

    // draw x axis labels
    ctx.fillStyle = "black";
    ctx.font = "20px Arial";
    ctx.fillText("% of population", ((canvas.clientWidth/10)*3), (canvas.clientHeight/1.02) );
    ctx.font = "12px Arial";
    ctx.fillText("|0", 50, 462);
    ctx.fillText("|10", 90, 462);
    ctx.fillText("|20", 130, 462);
    ctx.fillText("|30", 170, 462);
    ctx.fillText("|40", 210, 462);
    ctx.fillText("|50", 250, 462);
    ctx.fillText("|60", 290, 462);
    ctx.fillText("|70", 330, 462);
    ctx.fillText("|80", 370, 462);
    ctx.fillText("|90", 410, 462);
    ctx.fillText("|100", 450, 462);

    
    // draw y axis labels
    ctx.font = "20px Arial";
    ctx.rotate((-90*Math.PI)/180)
    ctx.fillText("Cumulative national income (%)", -400, 25)
    ctx.font = "12px Arial";
    ctx.fillText("|0", -450, 45);
    ctx.fillText("|10", -410, 45);
    ctx.fillText("|20", -370, 45);
    ctx.fillText("|30", -330, 45);
    ctx.fillText("|40", -290, 45);
    ctx.fillText("|50", -250, 45);
    ctx.fillText("|60", -210, 45);
    ctx.fillText("|70", -170, 45);
    ctx.fillText("|80", -130, 45);
    ctx.fillText("|90", -90, 45);
    ctx.fillText("|100", -50, 45);
    ctx.rotate((+90*Math.PI)/180)

    // Draw line of equality label
    ctx.rotate((-45*Math.PI)/180);
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText("Line of equality", 0, 350);
    ctx.rotate((45*Math.PI)/180);
}


function draw() {
    var x10Inp = (document.getElementById("ten") || {}).value; //y = 410
    var x20Inp = (document.getElementById("twenty") || {}).value; //y = 370
    var x30Inp = (document.getElementById("thirty") || {}).value; //y = 330
    var x40Inp = (document.getElementById("forty") || {}).value; //y = 290
    var x50Inp = (document.getElementById("fifty") || {}).value; //y = 250
    var x60Inp = (document.getElementById("sixty") || {}).value; //y = 210
    var x70Inp = (document.getElementById("seventy") || {}).value; //y= 170
    var x80Inp = (document.getElementById("eighty") || {}).value; //y = 130
    var x90Inp = (document.getElementById("ninety") || {}).value; //y = 90
    

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = "black";


    var x10 = 450 - (400/100) * x10Inp;
    var x20 = 450 - (400/100) * x20Inp;
    var x30 = 450 - (400/100) * x30Inp;
    var x40 = 450 - (400/100) * x40Inp;
    var x50 = 450 - (400/100) * x50Inp;
    var x60 = 450 - (400/100) * x60Inp;
    var x70 = 450 - (400/100) * x70Inp;
    var x80 = 450 - (400/100) * x80Inp;
    var x90 = 450 - (400/100) * x90Inp;
    

    ctx.beginPath();
    ctx.moveTo(50, 450);
    ctx.lineTo(90, x10);
    ctx.lineTo(130, x20);
    ctx.lineTo(170, x30);
    ctx.lineTo(210, x40);
    ctx.lineTo(250, x50);
    ctx.lineTo(290, x60);
    ctx.lineTo(330, x70);
    ctx.lineTo(370, x80);
    ctx.lineTo(410, x90);
    ctx.lineTo(450, 50);
    ctx.stroke();
    
}

function generic() {
    (document.getElementById("ten") || {}).value = 4; 
    (document.getElementById("twenty") || {}).value = 8; 
    (document.getElementById("thirty") || {}).value = 12; 
    (document.getElementById("fourty") || {}).value = 20; 
    (document.getElementById("fifty") || {}).value = 25; 
    (document.getElementById("sixty") || {}).value = 35; 
    (document.getElementById("seventy") || {}).value = 45; 
    (document.getElementById("eighty") || {}).value = 60; 
    (document.getElementById("ninety") || {}).value = 75; 
    draw()
}

function richFavour() {
    (document.getElementById("ten") || {}).value = 1; 
    (document.getElementById("twenty") || {}).value = 2; 
    (document.getElementById("thirty") || {}).value = 4; 
    (document.getElementById("fourty") || {}).value = 8; 
    (document.getElementById("fifty") || {}).value = 10; 
    (document.getElementById("sixty") || {}).value = 14; 
    (document.getElementById("seventy") || {}).value = 18; 
    (document.getElementById("eighty") || {}).value = 25; 
    (document.getElementById("ninety") || {}).value = 40; 
    draw()
}

/*
standard lorenz
10 - 4
20 - 8
30 - 12
40 - 20
50 - 25
60 - 35
70 - 45
80 - 60
90 - 75
*/
/*
biased in rich favour
10 - 1
20 - 2
30 - 4
40 - 8
50 - 10
60 - 14
70 - 18
80 - 25
90 - 40
*/