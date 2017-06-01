$(document).ready(function() {
	var max_news = 5; //максимум новостей в блоке на главной странице

	function pause(ms){
		var date = new Date();
		var curDate = null;
		do {curDate = new Date();}
		while(curDate-date < ms);
	}

	$('#hot_news').hide();
	$('#hot_news').css('opacity', '1');
	$('#hot_account').hide();
	$('#hot_account').css('opacity', '1');
	var left_pos = $('#left').offset();
	var right_pos = $('#right').offset();


	$('#hot_news').offset({top: left_pos.top, left: left_pos.left});
	$('#hot_account').offset({top: right_pos.top, left: right_pos.left});

//анимация левого блока

	$('#left').bind('mouseenter', function() {
		$('#left').css("position", "absolute");
		$('#left').offset({top: left_pos.top, left: left_pos.left})
		$('#hot_news').show('slow');
		$('#left').animate({"left": "+=600px"}, "slow");
		$('.face').animate({"opacity": "0.2"}, "slow");
		$('#left').hide('slow');
	});

	$('#hot_news').bind('mouseleave', function() {
		$('#left').css("position", "inherit");
		$('.face').animate({"opacity": "1"}, "slow");
		$('#left').show('slow');
		$('#hot_news').hide('slow');
	});

//анимация правого блока

	$('#right').bind('mouseenter', function() {
		$('#right').css("position", "absolute");
		$('#right').offset({top: right_pos.top, left: right_pos.left})
		$('#hot_account').show('slow');
		$('#right').animate({"left": "-=600px"}, "slow");
		$('.face').animate({"opacity": "0.2"}, "slow");
		$('#right').hide('slow');	
	});

	$('#hot_account').bind('mouseleave', function() {
		$('#right').css("position", "inherit");
		$('.face').animate({"opacity": "1"}, "slow");
		$('#right').show('slow');
		$('#hot_account').hide('slow');
	});	

	//$('#log_in_right').bind('click', function() {$('a[name="login"]')});

	$('#hot_news button, #hot_account button:first').bind('click', function() {$(this).parent().hide('slow');});

$.getJSON("http://localhost:3000/news", function( data ) {

	
	$.each(data, function (index, news) {
		var a = $('<a>');
	    $(a).attr('href', 'news.html#');
		var tr = $('<tr>');
		var td1 = $('<td>');
		$(td1).text($(news).attr('created-at'));
		var td2 = $('<td>');
		$(a).text(news.title);
		td2.append(a);
		$(tr).append([td1, td2]);	    
	    $('#hot_news table').append(tr);

	}); 

});

});