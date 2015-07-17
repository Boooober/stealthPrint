$(document).ready(function(){
	$('ul.js-tabs__caption').on('click', 'li:not(.active)', function() {
		$(this)
			.addClass('active').siblings().removeClass('active')
			.closest('div.js-tabs').find('div.js-tab__content').removeClass('active').eq($(this).index()).addClass('active');
	});

});