var funcs = [];
$(document).ready(function() {


	$.getJSON('data/forum.json', function(data) {
		var table = document.getElementsByClassName('desk')[0];
		var th = table.getElementsByTagName('th')[0];
		console.log(data);
		var output;
		$.each(data, function(id, item) {
			var tr = document.createElement('tr');
			tr.innerHTML += '<td>'  + '<a href="#" class="show-questions ' + (id+1) + '" onclick="funcs[' + id + ']()">' +'+</a> ' + item.theme + '</td>';
			tr.innerHTML += '<td>' + item.description + '</td>';
			tr.innerHTML += '<td align="center">' + item.author + '</td>';
			tr.innerHTML += '<td align="center">' + item.questions.length + '</td>';
			th.parentElement.parentElement.appendChild(tr);
			var hiddenTr = document.createElement('tr');
			hiddenTr.className = "questions "+ (+id+1);
			hiddenTr.setAttribute("hidden", true);
			// hidden
			var insideTd = document.createElement('td');
			insideTd.className = "questions";
			insideTd.colSpan = "4";
			var tbl = document.createElement('table');
			tbl.className = "questions";
			tbl.innerHTML = '<tr><th>Questions</th><th>Author</th><th>Answers</th></tr>';
			$.each(item.questions, function(id, question) {
				var trq = document.createElement('tr');
				var title_td = document.createElement('td');
				var author_td = document.createElement('td');
				var answers_td = document.createElement('td');
				author_td.setAttribute('align', 'center');
				answers_td.setAttribute('align', 'center');

				if (question.href !== undefined) {
					title_td.innerHTML += '<a href="' + question.href + '">' + question.title + '</a>';
				} else {
					title_td.innerHTML += question.title;
				}

				author_td.textContent = question.author;
				answers_td.textContent = question.answers;

				trq.appendChild(title_td);
				trq.appendChild(author_td);
				trq.appendChild(answers_td);
				tbl.appendChild(trq);
			});
			insideTd.appendChild(tbl);
			hiddenTr.appendChild(insideTd)
				th.parentElement.parentElement.appendChild(hiddenTr);
			funcs[id] = function(){
				var style = "tr.questions." + (id+1);
				$(style).toggle(200);
				var a = document.getElementsByClassName('show-questions ' + (id+1))[0];
				if (a.innerHTML == "+") {
					a.innerHTML = "-"
				} else {
					a.innerHTML = "+"
				}
			}	
		});
	});
})		
