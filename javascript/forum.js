$(document).ready(function() {
		var show_questions = $("a.show-questions.1");
		show_questions.click(function(){
			$("tr.questions.1" ).toggle(200);
			if (show_questions.html() == "+") {
				show_questions.html("-")
			} else {
				show_questions.html("+")
			}
		});
		show_questions = $("a.show-questions.2");
		show_questions.click(function(){
			$("tr.questions.2" ).toggle(200);
			if (show_questions.html() == "+") {
				show_questions.html("-")
			} else {
				show_questions.html("+")
			}
		});
		show_questions = $("a.show-questions.3");
		show_questions.click(function(){
			$("tr.questions.3" ).toggle(200);
			if (show_questions.html() == "+") {
				show_questions.html("-")
			} else {
				show_questions.html("+")
			}
		});
})		
