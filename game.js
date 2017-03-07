var canvas = document.getElementById("map"),
	ctx = canvas.getContext("2d"),
    fig = new Image(),
    size = 54,
    field = [],
    mainColor = 1;
fig.src ="img/figures.png";

//объект фигура
function fgr(x, y, name, color) {
	this.name = name;
	this.color = color;
	this.x = x;
	this.y = y;
	this.backcolor = 0;
	this.draw = function(_x, _y) {
		ctx.drawImage(fig, this.x, this.y, size+10, size+10, _x, _y, size-6, size-6);
	}
}
function noFgr() {this.name = "none"}

 
function gameLoop() {
	//при нажатии на пустое место или черную фигуру (просчет перемещения)
	if(active.fgr.color != mainColor || active.fgr.name == "none") {
		if (field[active.x][active.y].backcolor) {
				field[active.x][active.y] = active.prev;
				field[active.px][active.py] = new noFgr();	
				if (field[active.x][active.y].name == "pawn" && active.y == 0) field[active.x][active.y] = new fgr(102, 88, "queen", 1);
		}
		for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++) field[i][j].backcolor = 0;
	} else { //при нажатии на белую фигуру (просчет индикации)
		for (var i = 0; i < 8; i++) for (var j = 0; j < 8; j++) field[i][j].backcolor = 0;
		field[active.x][active.y].backcolor = "yellow";
		switch (active.fgr.name) {
			case "pawn":
				if (field[active.x][active.y-1].name == "none") field[active.x][active.y-1].backcolor = "green";
				if (active.y == 6 && field[active.x][active.y-2].name == "none") field[active.x][active.y-2].backcolor = "green";
				if (active.x > 0 && field[active.x-1][active.y-1].name != "none" && field[active.x-1][active.y-1].color != mainColor) field[active.x-1][active.y-1].backcolor = "red";			
				if (active.x < 7 && field[active.x+1][active.y-1].name != "none" && field[active.x+1][active.y-1].color != mainColor) field[active.x+1][active.y-1].backcolor = "red";
				break;
			case "king":
				
		}
	}
	//отрисовка
	ctx.clearRect(0, 0, 432, 432);
	for (var i = 0; i < 8; i++)
		for (var j = 0; j < 8; j++) {
			//рисовка индикации
			if (field[i][j].backcolor) {
				ctx.fillStyle = field[i][j].backcolor;
				ctx.fillRect(i*size-2, j*size-2, size+4, size+4);
			}
			//рисовка основного цвета
			ctx.fillStyle = (i + j) % 2 == 0 ? "#87CEFA" : "#4682B4";
			ctx.fillRect(i*size+2, j*size+2, size-4, size-4);
			//рисовка самой фигуры
			if (field[i][j].name != "none") field[i][j].draw(i*size, j*size)
		}
	//requestAnimationFrame(gameLoop);
}

function initGame() {
	for (var i = 0; i < 8; i++) {
		field[i] = [];
		for (var j = 0; j < 8; j++) field[i][j] = new noFgr()
	}
	field[0][0] = new fgr(213, -7, "rook", 0);
	field[1][0] = new fgr(435,-7, "knight", 0);
	field[2][0] = new fgr(324, -7, "elephant", 0);
	field[3][0] = new fgr(102, -7, "queen", 0);
	field[4][0] = new fgr(-9, -7, "king", 0);
	field[5][0] = new fgr(324, -7, "elephant", 0);
	field[6][0] = new fgr(435,-7, "knight", 0);
	field[7][0] = new fgr(213, -7, "rook", 0);
	for (var i = 0; i < 8; i++) field[i][1] = new fgr(546, -7, "pawn", 0);
	field[0][7] = new fgr(213, 88, "rook", 1);
	field[1][7] = new fgr(435, 88, "knight", 1);
	field[2][7] = new fgr(324, 88, "elephant", 1);
	field[3][7] = new fgr(102, 88, "queen", 1);
	field[4][7] = new fgr(-9, 88, "king", 1);
	field[5][7] = new fgr(324, 88, "elephant", 1);
	field[6][7] = new fgr(435, 88, "knight", 1);
	field[7][7] = new fgr(213, 88, "rook", 1);
	for (var i = 0; i < 8; i++) field[i][6] = new fgr(546, 88, "pawn", 1);
	gameLoop();
};

//mouse
var active = { 
	fgr : new noFgr(),
	prev : 0,
	px : 0,
	py: 0,
	x : 0,
	y : 0
}
canvas.addEventListener("click", function(evt) {
		var rect = canvas.getBoundingClientRect();
		var x = (evt.clientX - rect.left) / size ^ 0,
			y = (evt.clientY - rect.top) / size ^ 0;
		active.prev = active.fgr;
		active.px = active.x;
		active.py = active.y;
		active.fgr = field[x][y];
		active.x = x;
		active.y = y;
        gameLoop();
      }, false);