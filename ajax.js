$(function(){
	
	var data = {'width':42,'height':63,'count':5};
	$.ajax({
		type: "POST",
		url: "test.php",
		dataType: "html",
		data: data,
		success: function(data){
			console.log('It\'s working!');
		}
	});
});