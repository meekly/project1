/********COLOR SCHEMES********/
function _sheme(dark, light, black, white) {
    this.dark = dark,
    this.light = light,
    this.black = black,
    this.white = white;
}
var scheme = [
    new _sheme("#4682B4", "#87CEFA", "black", "white"),
    new _sheme("#246131", "#85FA9D", "black", "white"),
    new _sheme("#872DC7", "#EC90FB", "black", "white"),
    new _sheme("#61582D", "#FAEA9C", "black", "white")
]
/******************************/

var canvas = document.getElementById("field"),
	ctx = canvas.getContext("2d"),
    scale = 80,
    gap = scale * 0.03,
    colorScheme = scheme[0],
    field = new Array(8);


function _checker (color){
    this.color = color,
    this.checker = true;
}

function initGame() {
    for (var i = 0; i < 8; i++) {
        field[i] = new Array(8);
        for (var j = 0; j < 8; j++) {
            if ((i%2 != j%2) && j < 3) field[i][j] = new _checker(colorScheme.black);
            else if ((i%2 != j%2) && j > 4) field[i][j] = new _checker(colorScheme.white);
            else field[i][j] = {};
        }
    }
    Step();
}

function Step() {
    //clear field
    ctx.fillStyle = "#ffcc99";
    ctx.fillRect(0, 0, 640, 640);
    //draw 
    for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++) {
        //draw rects
        ctx.fillStyle = (i + j) % 2 == 0 ? colorScheme.light : colorScheme.dark;
		ctx.fillRect(i*scale+gap, j*scale+gap, scale-gap*2, scale-gap*2);
        //draw ckeckers
        if ("checker" in field[i][j]) {
            ctx.beginPath();
            ctx.arc(i*scale+scale/2, j*scale+scale/2, 0.8*scale/2, 0, 2*Math.PI, false);
            ctx.fillStyle = field[i][j].color;
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = field[i][j].color;
            ctx.stroke();
        }
    }
}
