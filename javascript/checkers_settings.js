document.getElementById("play-button").onclick = function() {
    document.getElementById("play-button").style.display = "none";
    document.getElementById("game").style.display = "block";
    initGame();
}

var counter = 0;
document.getElementById("settings-button").onclick = function() {
    var w = document.getElementById("settings-window").style;
    if ( counter++ % 2 == 0) w.display = "block"
    else w.display = "none"
}

document.getElementById("ok-button").onclick = function() {
    var w = document.getElementsByName("color");
    w.forEach(function(v, i) {
        if(v.checked) { 
            colorScheme = scheme[i];
            drawField();
            return;
        }
    });
}

window.onresize = function() {
    if (document.getElementById("game").style.display == "block") {
        initFieldSize();
        drawField();
    }
}

