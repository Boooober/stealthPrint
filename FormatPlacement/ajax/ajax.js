$(function(){
	
	var formats = [[42,63,5], [100,40, 1]];
	console.log(formats);
	var postData = JSON.stringify(formats);
	$.ajax({
		type: "POST",
		url: "test.php",
		dataType: "html",
		data: {'formats':postData},
		success: function(data){
			console.log('server request');
			console.log(data);
			//console.log(JSON.parse(data));
			
		//	if(data === 'Hello!') console.log('It\'s working!');
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
		  // typically only one of textStatus or errorThrown
		  // will have info
		  this; // the options for this ajax request
		}
	});
});