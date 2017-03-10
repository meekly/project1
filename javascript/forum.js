	$(document).ready(function() {
		var show_questions = $("a.show-questions.1");
		show_questions.click(function(){
			$("tr.questions.1").toggle(800);
			if (show_questions.html() == "+") {
				show_questions.html("-")
			} else {
				show_questions.html("+")
			}
		});
	})		
