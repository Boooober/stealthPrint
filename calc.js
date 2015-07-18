window.addEventListener("load", function () {
	
	
	
	var calcForm = document.getElementById('sptCalc');
	var inputFormat = calcForm.querySelectorAll('.formatInput');
	var selectFormat = document.getElementById('formatSelect');
	var photoQ = document.getElementById('photoQ');
	var printCount = document.getElementById('printCount');
	
	var formats = {
		custom:{"width":0,"height":0},
		A0:{"width":120,"height":84},
		A1:{"width":84,"height":60},
		A2:{"width":60,"height":42},
		A3:{"width":42,"height":30},
		A4:{"width":30,"height":21},
		A5:{"width":21,"height":15}
		//BlueBack:
		//Troll:
	};
	
	
	// Set values to the format inputs from the formats object
	
	selectFormat.addEventListener('change', function(){
		setFormat(selectFormat.options[selectFormat.selectedIndex].value);	
	});
	
	function setFormat(format){
		calcFormWidth.value = formats[format]['width'];
		calcFormHeight.value = formats[format]['height'];
	};
	
	
	// If input changed - save new custom values to the formats object
	
	for (var i=0;i<inputFormat.length;i++){
		inputFormat[i].addEventListener('change', function(){
			saveCustomFormat();
		});
	}
	
	function saveCustomFormat() {
		
		formats.custom.width = calcFormWidth.value;
		formats.custom.height = calcFormHeight.value;
		selectFormat.getElementsByTagName('option')[1].selected = 'selected';
	}
	
	//check the values with regexp. If they are numbers - save new custom format. Else - show notification.
	
	calcForm.addEventListener('submit', function(e){
		e.preventDefault();		
	});
	
});
