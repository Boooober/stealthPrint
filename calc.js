(function(){

	

	var calcForm = document.getElementById('sptCalc'),
		selectFormatBox = document.getElementById('calcFormatBox'),
		printCountInput = document.getElementById('printCount'),
		formatInput = selectFormatBox.getElementsByTagName('input'),
		formatWidth = formatInput[0],
		formatHeight = formatInput[1];
		
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
		},
		technology = {
			uv:				{"price":1.2},
			solvent:		{"price":1},
			water:			{"price":1.5},
			
		},
		materials = {
			cityLight:			{"price":1}
			blueBack:			{"price":1}
			litFrontlit:		{"price":1}	
			lamFrontlit:		{"price":1}
			backlit:			{"price":1}
			blockout:			{"price":1}
			mesh:				{"price":1}
			glossyFilm:			{"price":1}
			mattFilm:			{"price":1}
			transperentFilm:	{"price":1}	
			perfoFilm:			{"price":1}
			polyman:			{"price":1}
			textile:			{"price":1}
			pvc:				{"price":1}
			composite:			{"price":1}		
			glass:				{"price":1}	
			acryl:				{"price":1}
			wood:				{"price":1}
			custom:				{"price":1}	
		}
		quantity = 0;

	var setFormat = function (format){
		formatWidth.value = formats[format]['width'];
		formatHeight.value = formats[format]['height'];
	};
	
	var checkCustomFormatInput = function (string){
		return /^\d*$/.test(string);
	};
	
	//кучеряво ~~~~~~~~~~~~~~~~~~
	var setCustomFormatNotification = function(elem){
		elem.nextElementSibling.innerHTML = 'Введите корректную величину';
		elem.validValue = false;
		//if the element's value is not a number, set it's "validValue" property to false.
	};
	
	var removeCustomFormatNotification = function(elem){
		elem.nextElementSibling.innerHTML = '';
		elem.validValue = true;
	};
	// ОЧЕНЬ!
	var saveCustomFormat = function(){
		if (formatWidth.validValue && formatHeight.validValue){
			formats.custom.width = formatWidth.value;
			formats.custom.height = formatHeight.value;						
		};
	};
	//кучеряво ~~~~~~~~~~~~~~~~~~
	


	selectFormatBox.addEventListener('change', function(e){
		var elem = e.target;
		
		if (elem.tagName === "INPUT"){
			if ( checkCustomFormatInput(elem.value) ) {
				removeCustomFormatNotification(elem);
				saveCustomFormat();
			} else {
				setCustomFormatNotification(elem);
			}
		} else if (elem.tagName === "SELECT"){
			var optionValue = elem.options[elem.options.selectedIndex].value;
			setFormat(optionValue);
		};		
	});
	
	printCountInput.addEventListener('change', function(e){
		var elem = e.target;
		if ( checkCustomFormatInput(elem.value) ) {
				removeCustomFormatNotification(elem);
				quantity = elem.value;
			} else {
				setCustomFormatNotification(elem);
			}
		
		
	})

	calcForm.addEventListener('submit', function(e){
		e.preventDefault();		
	});
	calcForm.addEventListener('change', function(e){
		calculation ();		
	});
	
	// AJAX exchange rates request
	
	/* var XHR = ("onload" in new XMLHttpRequest()) ? XMLHttpRequest : XDomainRequest;
	var xhr = new XHR();
	xhr.open('GET', 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=3', true);
	//xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
	xhr.setRequestHeader('Content-Type', 'application/json');
	/*xhr.responseType = "json";
	xhr.setRequestHeader('Content-Type', 'text/plain');
	xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	var data;
	xhr.onload = function(e){
		data = JSON.parse(this.responseText);
		
	}
	xhr.send();
	console.log(xhr.response);
	
	*/
	
	
	function calculation (){
			var copyPrintArea = formatWidth.value * formatHeight.value / 10000;
			var totalPrintArea = copyPrintArea * quantity;
		
			console.log(totalPrintArea, 'm2');
	}
	
})();