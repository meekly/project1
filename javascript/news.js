$(document).ready(function() {
  $.getJSON("http://localhost:3000/news", function( data ) {
    $.each(data, function (index, news) {
      div = document.createElement('div');
      p = document.createElement('p');
      title = document.createElement('p');
      likes = document.createElement('span');
      img = document.createElement('img');

      likes.classList.add('news__likes');
      title.classList.add('news__title');
      p.classList.add('news__text');
      div.classList.add('news-one');
      img.classList.add('news__img');

      $(title).text(news.title);
      $(p).text(news.body);
      $(likes).text(news.likes);
      img.src = news.picture;

      div.appendChild(title);
      div.appendChild(img);
      div.appendChild(p);
      div.appendChild(likes);
      $('.news').append($(div)).append(document.createElement('hr'));

    });
  });
});
