window.addEventListener("load", function () {
	
	
	
	var calcForm = document.getElementById('sptCalc');
	var selectFormat = document.getElementById('format');
	
	selectFormat.addEventListener('change', function(){
		setFormat(selectFormat.options[selectFormat.selectedIndex].value);	
	});
	
	function setFormat(format){
		
		var formats = {
			A0:{"width":120,"height":84},
			A1:{"width":84,"height":60},
			A2:{"width":60,"height":42},
			A3:{"width":42,"height":30},
			A4:{"width":30,"height":21},
			A5:{"width":21,"height":15}
		};
		
		if (format == "custom") return;
		
		document.getElementById('calcFormWidth').value = formats[format]['width'];
		document.getElementById('calcFormHeight').value = formats[format]['height'];
	};

	calcForm.addEventListener('submit', function(e){
		e.preventDefault();
		
		sendData();
		
	});
	
	function sendData(){
		var formData = new FormData(calcForm);
		console.log(formData);
	}
});
