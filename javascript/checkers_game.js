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
var canvas, ctx, 
    fieldSize, scale = 100, gap = 2, 
    colorScheme, field, TURN, typeTurn, typeGame,
    imgKingBlack, imgKingWhite;

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
    ctx.font = "bold 90px Comic Sans MS";
    ctx.textAlign = "center";
    colorScheme = scheme[0];
    TURN = "white";
    imgKingBlack = new Image();
    imgKingWhite = new Image();
    imgKingBlack.src = "img/king-black.png";
    imgKingWhite.src = "img/king-white.png";;
    //click canvas listener
    canvas.addEventListener("click", function(evt) {
        var rect = canvas.getBoundingClientRect();
	    var x = Math.floor(8*(evt.clientX - rect.left) / fieldSize),
		    y = Math.floor(8*(evt.clientY - rect.top) / fieldSize);
        playerTurn(x, y);
    }, false);
    //init field
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

function _reInitGame(type) {
    TURN = "white";
    if (type != undefined) typeGame = type;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if ((i%2 != j%2) && j < 3) field[i][j] = new _checker(colorScheme.black);
            else if ((i%2 != j%2) && j > 4) field[i][j] = new _checker(colorScheme.white);
            else field[i][j] = {};
        }
    }
    typeTurn = analyzeField();
    displayMessage(".");
    setTimeout('displayMessage("..")', 100);
    setTimeout('displayMessage("...")', 200);
    setTimeout(drawField, 300);
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
        //draw king Image
        if("king" in field[i][j]) ctx.drawImage(field[i][j].color == "white" ? imgKingBlack : imgKingWhite, i*scale+scale/4, j*scale+scale/4, scale/2, scale/2);
    }
}

function _circle(x, y, color, fill) {
    var r = fill ? 0.75 : 0.8;
    if (color == "red" || color == "green" || (color == "silver" && fill)) r = 0.2;
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
            if ("king" in field[i][j]) {
                if (_isCanAttackKing(i, j)) canBit = true;
            }
            else if (_isCanAttack(i, j)) canBit = true;    
    if (canBit) return "attack";

    var canMove = false
    if (!canBit) for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++)
        if ("checker" in field[i][j] && field[i][j].color == TURN)
            if ("king" in field[i][j]) { 
                if (_isCanMoveKing(i, j)) canMove = true;
            }
            else if (_isCanMove(i, j)) canMove = true;

    if (canMove) return "move";
    else return "game over";
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
        if (x+1 < 8 && y+1 < 8 && !("checker" in field[x+1][y+1]))
            field[x][y].moveTo.push([x+1, y+1]);    
    }
    if (field[x][y].moveTo.length == 0) {
            delete field[x][y].moveTo;
            return false;
    } else return true;
}

function _isCanMoveKing(x, y) {
    field[x][y].moveTo = [];

    for (var k = 1; x+k < 8 && y+k < 8 && !("checker" in field[x+k][y+k]); k++)
        field[x][y].moveTo.push([x+k, y+k])
    for (var k = 1; x-k >= 0 && y+k < 8 && !("checker" in field[x-k][y+k]); k++)
        field[x][y].moveTo.push([x-k, y+k]);
    for (var k = 1; x-k >= 0 && y-k >= 0 && !("checker" in field[x-k][y-k]); k++)
        field[x][y].moveTo.push([x-k, y-k]);
    for (var k = 1; x+k < 8 && y-k >= 0 && !("checker" in field[x+k][y-k]); k++)
        field[x][y].moveTo.push([x+k, y-k]);

    if (field[x][y].moveTo.length == 0) {
        delete field[x][y].moveTo;
        return false;
    } else return true;
}

function _isCanAttackKing(x, y) {
    field[x][y].moveTo = [];
    var enemyColor = TURN == "black" ? "white" : "black";

    var findEnemyChecker = false;
    for (var k = 1; x+k < 8 && y+k < 8; k++) {        
        if (findEnemyChecker) {
            if ("checker" in field[x+k][y+k]) break;
            else field[x][y].moveTo.push([x+k, y+k])
        }
        else if ("checker" in field[x+k][y+k]) {
            if (field[x+k][y+k].color == enemyColor)
                findEnemyChecker = true;
            else break;
        }
    }
    findEnemyChecker = false;
    for (var k = 1; x-k >= 0 && y+k < 8; k++) {
        if (findEnemyChecker) {
            if ("checker" in field[x-k][y+k]) break;
            else field[x][y].moveTo.push([x-k, y+k])
        }
        else if ("checker" in field[x-k][y+k]) {
            if (field[x-k][y+k].color == enemyColor)
                findEnemyChecker = true;
            else break;
        }        
    }
    findEnemyChecker = false;
    for (var k = 1; x-k >= 0 && y-k >= 0; k++) {
        if (findEnemyChecker) {
            if ("checker" in field[x-k][y-k]) break;
            else field[x][y].moveTo.push([x-k, y-k])
        }
        else if ("checker" in field[x-k][y-k]) {
            if (field[x-k][y-k].color == enemyColor)
                findEnemyChecker = true;
            else break;
        }        
    }
    findEnemyChecker = false;
    for (var k = 1; x+k < 8 && y-k >= 0; k++) {
        if (findEnemyChecker) {
            if ("checker" in field[x+k][y-k]) break;
            else field[x][y].moveTo.push([x+k, y-k])
        }
        else if ("checker" in field[x+k][y-k]) {
            if (field[x+k][y-k].color == enemyColor)
                findEnemyChecker = true;
            else break;
        }        
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
                //shift to king if possible
                if ((y == 0 && field[x][y].color == "white") ||
                    (y == 7 && field[x][y].color == "black")) field[x][y].king = true;
                //make attack
                if (typeTurn == "attack") if (!_makeAttack(x, y)) return;
                
                _endTurn();
                canMoveAttack = true;
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

function _makeAttack(x, y) {
    //if king checker
    if ("king" in field[x][y]) {
        //remove dead checker
        var dx = (x - activeX) / Math.abs(x - activeX),
            dy = (y - activeY) / Math.abs(y - activeY),
            _x = activeX, _y = activeY;
        while ((_x += dx) != x && (_y += dy) != y)
            if ("checker" in field[_x][_y]) {
                field[_x][_y] = {};
                break;
            }                            
        //continue attack if possible
        if (_isCanAttackKing(x, y)) {
            activeX = x;
            activeY = y;
            for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++)
                if ("moveTo" in field[i][j]) delete field[i][j].moveTo;
            _isCanAttackKing(x, y);
            drawField();
            return false;
        } else return true;
    }
    //else if simple checker
    else {
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
            return false;       
        } else return true;
    }
}

function _endTurn() {
    activeX = undefined;
    //delete moveTo 
    for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++)
        if ("moveTo" in field[i][j]) delete field[i][j].moveTo;    
    TURN = TURN == "white" ? "black" : "white";
    typeTurn = analyzeField();
    if (typeTurn == "game over") {
        drawField();
        _gameOver();
        return;
    }
    if (TURN == "black") setTimeout(computerTurn, 500);
    drawField();
}

function _gameOver() {
    //game over massage
    //setTimeout('', 10000);
    if (typeGame == "single") {
        if (TURN == "white") setTimeout('displayMessage("YOU LOSE")', 1000);
        else setTimeout('displayMessage("YOU WIN")', 1000);
    }
    else if (typeGame == "multi") {
        if (TURN == "white") setTimeout('displayMessage("BLACK WIN")', 1000);
        else setTimeout('displayMessage("WHITE WIN")', 1000);
    }
    
    //_reInitGame();
}

function computerTurn() {
    if (typeGame == "multi") return;

    var amountActiveCheckers = 0, count = 0;
    for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++) if ("moveTo" in field[i][j]) amountActiveCheckers++;
    var randActiveChecker = Math.floor(amountActiveCheckers * Math.random()) + 1;

    for (var x = 0; x < 8; x++) for (var y = 0; y < 8; y++) {
        if ("moveTo" in field[x][y] && ++count >= randActiveChecker) {
            var randTurn = Math.floor(field[x][y].moveTo.length * Math.random())
                _x = field[x][y].moveTo[randTurn][0],
                _y = field[x][y].moveTo[randTurn][1];
            //move checker
            field[_x][_y] = field[x][y];
            field[x][y]  = {};
            //shift to king if possible
            if ((_y == 0 && field[_x][_y].color == "white") ||
            (_y == 7 && field[_x][_y].color == "black")) field[_x][_y].king = true;
            //make attack
            if (typeTurn == "attack") {
                activeX = x;
                activeY = y;
                if (!_makeAttack(_x, _y)) {
                    _circle(x, y, "silver", true);
                    setTimeout(computerTurn, 500);
                    return;
                }                
            }
            _endTurn();
            //draw last turn indicator
            _circle(_x, _y, "silver", false);
            _circle(x, y, "silver", true);
            return;
        }
    }    
}

/********DRAW MESSAGE********/
function displayMessage(message) {
    ctx.fillStyle = "#111";        
    ctx.fillText(message, scale*4, scale*4+scale/4)
}