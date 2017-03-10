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

/********INIT********/
var canvas, ctx, fieldSize, scale = 100, gap = 3, colorScheme, field;

function initFieldSize() {    
    fieldSize = Math.floor(0.09*document.documentElement.clientHeight)*10;
    document.getElementById("field").style.width = fieldSize + "px";
    document.getElementById("field").style.height = fieldSize + "px";
}

function _checker(color){
    this.color = color,
    this.checker = true;
}

function initGame() {
    initFieldSize();
    canvas = document.getElementById("field");
    ctx = canvas.getContext("2d");
    colorScheme = scheme[0]
    //click canvas listener
    canvas.addEventListener("click", function(evt) {
        var rect = canvas.getBoundingClientRect();
	    var x = (evt.clientX - rect.left) / scale ^ 0,
		    y = (evt.clientY - rect.top) / scale ^ 0;
        playerTurn(x, y);
    }, false);

    field = new Array(8)
    for (var i = 0; i < 8; i++) {
        field[i] = new Array(8);
        for (var j = 0; j < 8; j++) {
            if ((i%2 != j%2) && j < 3) field[i][j] = new _checker(colorScheme.black);
            else if ((i%2 != j%2) && j > 4) field[i][j] = new _checker(colorScheme.white);
            else field[i][j] = {};
        }
    }    
    drawField();
}
/***************************/

function drawField() {
    //clear field
    ctx.fillStyle = "#ffcc99";
    ctx.fillRect(0, 0, fieldSize, fieldSize);
    //draw 
    for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++) {
        //draw rects
        ctx.fillStyle = (i + j) % 2 == 0 ? colorScheme.light : colorScheme.dark;
		ctx.fillRect(i*scale+gap, j*scale+gap, scale-gap*2, scale-gap*2);
        //draw ckeckers
        if ("checker" in field[i][j]) {
            ctx.beginPath();
            ctx.arc(i*scale+scale/2, j*scale+scale/2, 0.75*scale/2, 0, 2*Math.PI, false);
            ctx.fillStyle = field[i][j].color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = field[i][j].color == "black" ? "white" : "black";
            ctx.stroke();
        }
    }
}

/*  gray - last computerTurn
    red - bit chose
    yellow - cheker chose
    green - move chose
 */
function playerTurn(_x, _y) {
    


}

function computerTurn() {

    drawField()
    playerTurn();
}
