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

/********INIT********/
var canvas, ctx, fieldSize, scale = 100, gap = 3, colorScheme, field, TURN = "white", typeTurn, typeGame = "multi";

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
	    var x = Math.floor(8*(evt.clientX - rect.left) / fieldSize),
		    y = Math.floor(8*(evt.clientY - rect.top) / fieldSize);
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
    typeTurn = analyzeField();
    drawField();
}

/********DRAW********/
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
        if ("checker" in field[i][j]) _circle(i, j, field[i][j].color, true);              
        //draw ready(yellow) indication
        if("moveTo" in field[i][j]) _circle(i, j, "yellow", false);            
    }
}

function _circle(x, y, color, fill) {
    var r = fill ? 0.75 : 0.8;
    if (color == "red" || color == "green") r = 0.2;
    ctx.beginPath();
    ctx.arc(x*scale+scale/2, y*scale+scale/2, r*scale/2, 0, 2*Math.PI, false);    
    if (fill) { 
        ctx.fillStyle = color;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = color == "black" ? "white" : color == "white" ? "black" : color;                
    } else {
        ctx.lineWidth = 5;
        ctx.strokeStyle = color;
    }   
    ctx.stroke(); 
}

/********ANALYZE FIELD********/
function analyzeField() {
    var canBit = false;
    for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++)
        if ("checker" in field[i][j] && field[i][j].color == TURN) 
            if (_isCanAttack(i, j)) canBit = true;
    if (canBit) return "attack";

    var canMove = false
    if (!canBit) for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++)
        if ("checker" in field[i][j] && field[i][j].color == TURN) 
            if (_isCanMove(i, j)) canMove = true;
    if (canMove) return "move";
    else return "game over"
}

function _isCanAttack(x, y) {
    field[x][y].moveTo = [];
    var enemyColor = TURN == "black" ? "white" : "black";
    //left up
     if (x-2 >= 0 && y-2 >= 0 && "checker" in field[x-1][y-1] && field[x-1][y-1].color == enemyColor && !("checker" in field[x-2][y-2]))
        field[x][y].moveTo.push([x-2, y-2]);         
    //right up
     if (x+2 < 8 && y-2 >= 0 && "checker" in field[x+1][y-1] && field[x+1][y-1].color == enemyColor && !("checker" in field[x+2][y-2]))
        field[x][y].moveTo.push([x+2, y-2]);
    //left down
     if (x-2 >= 0 && y+2 < 8 && "checker" in field[x-1][y+1] && field[x-1][y+1].color == enemyColor && !("checker" in field[x-2][y+2]))
        field[x][y].moveTo.push([x-2, y+2]);  
    //right down
     if (x+2 < 8 && y+2 < 8 && "checker" in field[x+1][y+1] && field[x+1][y+1].color == enemyColor && !("checker" in field[x+2][y+2]))
        field[x][y].moveTo.push([x+2, y+2]);                      
    
    if (field[x][y].moveTo.length == 0) {
            delete field[x][y].moveTo;
            return false;
    } else return true;
}

function _isCanMove(x, y) {
    field[x][y].moveTo = [];
    if (TURN == "white") {        
        //white left
        if (x-1 >= 0 && y-1 >= 0 && !("checker" in field[x-1][y-1]))
            field[x][y].moveTo.push([x-1, y-1]);
        //white right
        if (x+1 < 8 && y-1 >= 0 && !("checker" in field[x+1][y-1]))
            field[x][y].moveTo.push([x+1, y-1]);      
    }
    else if (TURN == "black") {
        //black left
        if (x-1 >= 0 && y+1 < 8 && !("checker" in field[x-1][y+1]))
            field[x][y].moveTo.push([x-1, y+1]);
        //black right
        if (x+1 < 8 && y+1 >= 0 && !("checker" in field[x+1][y+1]))
            field[x][y].moveTo.push([x+1, y+1]);    
    }
    if (field[x][y].moveTo.length == 0) {
            delete field[x][y].moveTo;
            return false;
    } else return true;
}

/********MAKE TURN********/
var activeX, activeY;
function playerTurn(x, y) {
    //activate checker for move or attack
    if ("moveTo" in field[x][y]) {
        if (activeX != undefined) drawField();
        activeX = x;
        activeY = y;
        field[x][y].moveTo.forEach(function(v) {
            var indicateColor = typeTurn == "move" ? "green" : "red";
            _circle(v[0], v[1], indicateColor, true)
        });
        return
    } 
    else if (activeX == undefined) return; //just click on void
    else {
        //move or attack 
        var canMoveAttack = false;
        field[activeX][activeY].moveTo.forEach(function(v) {            
            if (x == v[0] && y == v[1]) {                
                //move checker
                field[x][y] = field[activeX][activeY];
                field[activeX][activeY] = {};

                if (typeTurn == "attack") {
                    //remove dead checker
                    field[(activeX+x)/2][(activeY+y)/2] = {};
                    //continue attack if possible
                    if (_isCanAttack(x, y)) {
                        activeX = x;
                        activeY = y;
                        for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++)
                            if ("moveTo" in field[i][j]) delete field[i][j].moveTo;
                        _isCanAttack(x, y);
                        drawField();
                        canMoveAttack = true;
                        return;
                    }                                       
                }
                canMoveAttack = true;
                _endTurn();                
                return;
            }
        });
        //diactivate checker (can't move/attack)
        if (!canMoveAttack) {
            activeX = undefined;        
            drawField();
        }
    }
}

function _endTurn() {
    activeX = undefined;
    //delete moveTo 
    for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++)
        if ("moveTo" in field[i][j]) delete field[i][j].moveTo;    
    TURN = TURN == "white" ? "black" : "white";
    typeTurn = analyzeField();
    if (TURN == "black") computerTurn();
    drawField();
}

function computerTurn() {
    if (typeGame == "multi") return;

    _endTurn();        
}
