$(document).ready(function() {
		var show_questions1 = $("a.show-questions.1");
		show_questions1.click(function(){
			$("tr.questions.1" ).toggle(200);
			if (show_questions1.html() == "+") {
				show_questions1.html("-")
			} else {
				show_questions1.html("+")
			}
		});
		show_questions2 = $("a.show-questions.2");
		show_questions2.click(function(){
			$("tr.questions.2" ).toggle(200);
			if (show_questions2.html() == "+") {
				show_questions2.html("-")
			} else {
				show_questions2.html("+")
			}
		});
		show_questions3 = $("a.show-questions.3");
		show_questions3.click(function(){
			$("tr.questions.3" ).toggle(200);
			if (show_questions3.html() == "+") {
				show_questions3.html("-")
			} else {
				show_questions3.html("+")
			}
		});
})		
