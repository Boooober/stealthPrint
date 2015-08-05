(function(){

	

	var calcForm = document.getElementById('sptCalc'),
		formatSelection = document.getElementById('formatSelect'),
		formatWidth = document.getElementById('printWidth'),
		formatHeight = document.getElementById('printHeight');
		
	var elemName,
		elemValue;
		
	var formats = {
			custom:{"width":0,"height":0},
			A0:{"width":120,"height":84},
			A1:{"width":84,"height":60},
			A2:{"width":60,"height":42},
			A3:{"width":42,"height":30},
			A4:{"width":30,"height":21},
			A5:{"width":21,"height":15},
			BigBord18:{"width":600,"height":300},
			CityLight:{"width":120,"height":180},
			Troll:{"width":500,"height":100}
		},
		technologyData = { //UAH
			UV:				{"price":100},
			solvent:		{"price":45},
			water:			{"price":75},		
		},
		materialsData = {  //DOL
			cityLight:			{"price":0.5,"width":[120, 160]},
			blueBack:			{"price":0.5,"width":[120, 160]},
			litFrontlit:		{"price":2,"width":[220,250,320,400,500]},	
			lamFrontlit:		{"price":1,"width":[220,250,320,400,500]},
			backlit:			{"price":3,"width":[220,250,320]},
			blockout:			{"price":3,"width":[160]},
			mesh:				{"price":1.2,"width":[160, 220,320, 400, 500]},
			glossyFilm:			{"price":1.5,"width":[107, 127, 152, 160]},
			mattFilm:			{"price":1.5,"width":[107, 127, 152, 160]},
			transperentFilm:	{"price":1.5,"width":[107, 127, 152, 160]},	
			perfoFilm:			{"price":1.5,"width":[105, 127, 137, 152]},
			polyman:			{"price":3,"width":[315]},
			textile:			{"price":2,"width":[100]},
			pvc:				{"price":5,"width":[205]},
			composite:			{"price":7,"width":[145]},		
			glass:				{"price":7,"width":[100]},	
			acryl:				{"price":15,"width":[205]},
			wood:				{"price":5,"width":[100]},
			custom:				{"price":1}	
		},
		orderedObject = {}
		
		
	var setFormValues = function (event){
		var elem = event.target;
		elemName = elem.name;
		elemValue = elem.value;

		switch (elemName){
			case 'formatSelect':
				setSelectedFormatToInput(elemValue);
				break;
			case 'calcFormatWidth':
			case 'calcFormatHeight':
				saveCustomFormat(elem);
			case 'printCount':
			case 'luversStep':
				setInputValue(elem);
				break;
			case 'printTech':
			case 'printMedia':
			case 'lamination':
				setSelectedOptionValue(elem);
				break;
			case 'photoQuality':
			case 'bannerWelding':
			case 'luvers':	
			case 'plotterCut':
			case 'plasticStitching':
			case 'luversBannerTuck':
			case 'glueBannerTuck':
				setCheckboxValue(elem);
				break;
		};
	};
		
	var setInputValue = function(elem){
		if ( checkNumericInputValue(elemValue) === true ) {
			removeInputError(elem);
			orderedObject[elemName] = parseInt(elemValue);
		} else {
			setInputError(elem);
		};
	};
		
	var setCheckboxValue = function (elem){
		if (elem.checked) {
			orderedObject[elemName] = true;
		} else {
			orderedObject[elemName] = false;
		}	
	};
		
	var setSelectedOptionValue = function (elem){
		var optionValue = elem.options[elem.options.selectedIndex].value;
		orderedObject[elemName] = optionValue;
	};
		
	var checkNumericInputValue = function (string){
		return /^[0-9]*$/.test(string);
	};
	
	var setInputError = function(elem){
		elem.nextElementSibling.innerHTML = 'Введите корректную величину';
	};
	var removeInputError = function(elem){
		elem.nextElementSibling.innerHTML = '';
	};
	
	var saveCustomFormat = function(){
		if ( checkNumericInputValue(formatWidth.value) && checkNumericInputValue(formatHeight.value) ) {
			formats.custom.width = formatWidth.value;
			formats.custom.height = formatHeight.value;
			setCustomFormatOptionSelected();
		};
	};

	var setCustomFormatOptionSelected = function(){
		formatSelection.getElementsByTagName('option')[0].selected = 'selected';
	};

	var setSelectedFormatToInput = function (format){
		formatWidth.value = orderedObject.printWidth = formats[format]['width'];
		formatHeight.value = orderedObject.printHeight = formats[format]['height'];
	};

	
	//REFACTOR!!!
	/*
	var setObjectLuversValues = function(elem){	
		if (orderedObject.luvers === true )	{
			orderedObject.luvers = new Object;
		}	
		if (typeof orderedObject.luvers === "object"){

			if (elem.type === "checkbox"){				
				orderedObject.luvers[elemName] = true;
			} else if (elem.type === "text"){
				
				//same function - setInputValue()
				if ( checkNumericInputValue(elem.value) ){
					orderedObject.luvers[elemName] = parseInt(elem.value);
					
				};
			};
		};
	};
	*/
	//REFACTOR!!!
	
	

	
	
	
	
	
	
	
	

	calcForm.addEventListener('change', function(e){
		setFormValues(e);
		console.log(orderedObject);
		calculation ();	
	});
	
	calcForm.addEventListener('submit', function(e){
		e.preventDefault();		
	});
	
	
	/*
	var calcPrintArea = function (){
		if ( orderedObject.printWidth && orderedObject.printHeight && orderedObject.printCount != 'undefined'){
			return orderedObject.printWidth * orderedObject.printHeight * orderedObject.printCount;
		} else return "Не достаточно даных для расчета площади печати";
	};
	*/
	
	var getOptimalRollWidth = function (){
		if ( orderedObject.printMedia != undefined ) {
			
			var mediaWidthArr = materialsData[orderedObject.printMedia].width,
				printHeight = orderedObject.printHeight,
				printWidth = orderedObject.printWidth;
				
			
			for (var i = 0, len = mediaWidthArr.length; i < len; i++ ){
				console.log(mediaWidthArr[i] / printHeight);
				console.log(mediaWidthArr[i] / printWidth);
				
				//must be greater than 1
			};
			
			return;
		};
		console.log('Не выбран материал для печати');
	};
	
	var getPrintLength = function(){
		
	}
	
	var calcMediaRemainder = function(){
	};
	
	var calcPerimetr = function (){
		return (orderedObject.printWidth + orderedObject.printHeight) * 2;
	};
	
	
	var calcLuversCount = function () {
		var perimetr =  calcPerimetr();
		
	};	
	
	
	
	
	
	
	
	function calculation (){
	//	var materialPrice = calcPrintArea() * materialsData[orderedObject.printMedia].price;
	//	var printCost = calcPrintArea() * technologyData[orderedObject.printTech].price / 24;
	//	var totalCost = materialPrice + printCost;
		
		getOptimalRollWidth();
		//console.log('print area = ' + calcPrintArea() + ' m2');
		//onsole.log('price for square meters of material (without econom placeing) $' +materialPrice );
		//console.log('printing cost $' + printCost);
		//console.log('material and printing cost $' + totalCost);
	}
	
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
	
	
})();