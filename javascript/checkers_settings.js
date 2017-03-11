document.getElementById("play-button").onclick = function() {
    document.getElementById("play-button").style.display = "none";
    document.getElementById("game").style.display = "block";
    initGame();
}

var counter = 0;
document.getElementById("settings-button").onclick = function() {
    var w = document.getElementById("settings-window");
	w.click(function() {
			
	});
    
}

$(document).ready(function() {
		var show_questions = $("#settings-button");
		show_questions.click(function(){
			$("#settings-window").toggle(800);
		});
	})		

document.getElementById("ok-button").onclick = function() {
    var w = document.getElementsByName("color");
    w.forEach(function(v, i) {
        if(v.checked) { 
            colorScheme = scheme[i];
            Step();
            return;
        }
    });
    
}