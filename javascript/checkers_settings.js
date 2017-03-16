document.getElementById("play-single").onclick = function() {
    document.getElementById("play-single").style.display = "none";
    document.getElementById("play-multi").style.display = "none";
    document.getElementById("game").style.display = "block";
    typeGame = "single";
    initGame();
}

document.getElementById("play-multi").onclick = function() {
    document.getElementById("play-single").style.display = "none";
    document.getElementById("play-multi").style.display = "none";
    document.getElementById("game").style.display = "block";
    typeGame = "multi";
    initGame();
}


$(document).ready(function() {
    var show_questions = $("#settings-button");
    show_questions.click(function(){
        $("#settings-window").toggle(800);
    });
})		

/***CHANGE FIELD SIZE***/
window.onresize = function() {
    if (document.getElementById("game").style.display == "block") {
        initFieldSize();
        drawField();
    }
}

/***START NEW GAME***/
document.getElementById("new-single-game").onclick = function() {
    if (typeGame == "single" && TURN == "black") setTimeout('_reInitGame("single")', 300); 
    else _reInitGame("single");
}

document.getElementById("new-multi-game").onclick = function() {
    _reInitGame("multi");
}

/***CHANGE COLOR SCHEME***/
document.getElementsByName("color")[0].onclick = function(){
    if (this.checked) {
        colorScheme = scheme[0];
        drawField();
    } 
}
document.getElementsByName("color")[1].onclick = function(){
    if (this.checked) {
        colorScheme = scheme[1];
        drawField();
    } 
}
document.getElementsByName("color")[2].onclick = function(){
    if (this.checked) {
        colorScheme = scheme[2];
        drawField();
    } 
}
document.getElementsByName("color")[3].onclick = function(){
    if (this.checked) {
        colorScheme = scheme[3];
        drawField();
    } 
}


