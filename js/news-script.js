$(function() {
	renderNews();
});

function renderNews() {
	var idx;
	var entry;
	var instance;
	var template = $('.news-template');
	for (idx = 0; idx < news.entries.length; idx++) {
		console.log(news.entries[idx]);
		entry = news.entries[idx];
		instance = template.clone();
		instance.find('.date').html(entry.date);
		instance.find('.title').html(entry.title);
		instance.find('.content').html(entry.content);
		instance.removeClass('news-template');
		$('.news-entries').append(instance);
	}
}