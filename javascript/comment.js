$(document).ready(function() {
	var comments_table = document.getElementsByClassName('comment')[0];

	$.getJSON("http://localhost:3000/how-many-games-are-supported", function(data) {
		console.log('gotit!');
		console.log(data);
		$.each(data, function(id, author) {
			var comment_tr = document.createElement('tr');
			var user_td = document.createElement('td');
			user_td.classList.add('user');
			
			user_td.innerHTML = '<img src="' +author.avatar+ '">';
			user_td.innerHTML += 'Nickname: <span class="author">' +author.nickname+ '</span><br />';
			user_td.innerHTML += 'Rating: ' +author.rating+ '<br />';
			user_td.innerHTML += 'Games: ' +author.games+ ' (<span class="wins">' +author.wins+ '</span>:<span class="loses">' +(author.games-author.wins)+ '</span>)<br />';
			user_td.innerHTML += '<span class="like">+</span> ' +author.likes+ ' <span class="dislike">-</span>';
			// User information fulfilled
			var text_td = document.createElement('td');
			var text_div = document.createElement('div');
			text_div.innerHTML =  '<h3>' +author.comment.title+ '</h3>';
			text_div.innerHTML += author.comment.text;
			text_div.innerHTML += '<p class="date">' +author.comment.date+ '</p>';
			text_div.innerHTML += '<p class="actions"><a href="#">Ban</a> <a href="#">Reply</a></p>';

			text_td.appendChild(text_div);
			comment_tr.appendChild(user_td);
			comment_tr.appendChild(text_td);
			comments_table.appendChild(comment_tr);
			console.log("added!");
		});	
	});
});
