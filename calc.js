(function(){

	

	var calcForm = document.getElementById('sptCalc'),
		formatSelection = document.getElementById('formatSelect'),
		formatWidth = document.getElementById('calcFormatWidth'),
		formatHeight = document.getElementById('calcFormatHeight');
		
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
			cityLight:			{"price":0.5,"mediaWidth":[120, 160]},
			blueBack:			{"price":0.5,"mediaWidth":[120, 160]},
			litFrontlit:		{"price":2,"mediaWidth":[220,250,320,400,500]},	
			lamFrontlit:		{"price":1,"mediaWidth":[220,250,320,400,500]},
			backlit:			{"price":3,"mediaWidth":[220,250,320]},
			blockout:			{"price":3,"mediaWidth":[160]},
			mesh:				{"price":1.2,"mediaWidth":[160, 220,320, 400, 500]},
			glossyFilm:			{"price":1.5,"mediaWidth":[107, 127, 152, 160]},
			mattFilm:			{"price":1.5,"mediaWidth":[107, 127, 152, 160]},
			transperentFilm:	{"price":1.5,"mediaWidth":[107, 127, 152, 160]},	
			perfoFilm:			{"price":1.5,"mediaWidth":[107, 127, 152, 160]},
			polyman:			{"price":3,"mediaWidth":[315]},
			textile:			{"price":2,"mediaWidth":[100]},
			pvc:				{"price":5,"mediaWidth":[205]},
			composite:			{"price":7,"mediaWidth":[145]},		
			glass:				{"price":7,"mediaWidth":[100]},	
			acryl:				{"price":15,"mediaWidth":[205]},
			wood:				{"price":5,"mediaWidth":[100]},
			custom:				{"price":1}	
		},
		orderedObject = {}
		
		
		
		
		
		
	var setFormatToInput = function (format){
		formatWidth.value = orderedObject.calcFormatWidth = formats[format]['width'];
		formatHeight.value = orderedObject.calcFormatHeight = formats[format]['height'];
	};
	

	
	//кучеряво Переделать! ~~~~~~~~~~~~~~~~~~
	var setCalcNotification = function(elem){
		elem.nextElementSibling.innerHTML = 'Введите корректную величину';
		elem.validValue = false;
		//if the element's value is not a number, set it's "validValue" property to false.
	};
	
	var removeCalcNotification = function(elem){
		elem.nextElementSibling.innerHTML = '';
		elem.validValue = true;
	};
	var saveCustomFormat = function(){
		if (formatWidth.validValue && formatHeight.validValue){
			formats.custom.width = formatWidth.value;
			formats.custom.height = formatHeight.value;
			setCustomFormatOptionSelected();
		};
	};
	//кучеряво ~~~~~~~~~~~~~~~~~~
	var setCustomFormatOptionSelected = function(){
		formatSelection.getElementsByTagName('option')[1].selected = 'selected';
	}
	
	
	// REFACTOR!!!
	var setCalcFormat = function(elem){
		if (elem.tagName === "INPUT"){
			setInputValue(elem)
				saveCustomFormat();
				/* set format to orderedObject */
			};
		if (elem.tagName === "SELECT"){
			setFormatToInput(elem.value);	
		};
	};
	
	

	var checkNumberInputValue = function (elem){
		if ( /^[0-9]*$/.test(elem.value) ) {
				removeCalcNotification(elem);
				return true;
		} else {
			setCalcNotification(elem);
				return false;
		};
	};
	
	
	var setInputValue = function (elem){
		if ( checkNumberInputValue(elem) ){
			orderedObject[elem.name] = parseInt(elem.value);	
		};
	};	
	
	var setCheckboxValue = function (elem){
		if (elem.checked) orderedObject[elem.name] = true;
		else 			  orderedObject[elem.name] = false;
	};
	
	var setSelectedOptionValueToObject = function (elem){
		var optionValue = elem.options[elem.options.selectedIndex].value;
		orderedObject[elem.name] = optionValue;
	};


	
	//REFACTOR!!!
	var setObjectLuversValues = function(elem){
		var elemName = elem.name;
		
		if (orderedObject.luvers === true )	orderedObject.luvers = new Object;
		
		if (typeof orderedObject.luvers === "object"){
			if (elem.type === "checkbox"){				
				orderedObject.luvers[elemName] = true;
			} else if (elem.type === "text"){
				
				//same function - setInputValue()
				if ( checkNumberInputValue(elem) ){
					orderedObject.luvers[elemName] = parseInt(elem.value);
					
				};
			};
		};
	};
	//REFACTOR!!!
	
	
	var getFormValues = function (event){
		var elem = event.target;
		var elemName = elem.name;
		var elemTagName = elem.tagName;

		switch (elemName){
			case 'formatSelect':
			case 'calcFormatWidth':
			case 'calcFormatHeight':
				setCalcFormat(elem);
				break;
			case 'printCount':
				setInputValue(elem);
				break;
			case 'printTech':
			case 'printMedia':
			case 'lamination':
				setSelectedOptionValueToObject(elem);
				break;
			case 'photoQuality':
			case 'bannerWelding':
			case 'luvers':	
			case 'plotterCut':
			case 'plasticStitching':
				setCheckboxValue(elem);
				break;
			case 'luversStep':
			case 'luversBannerTuck':
			case 'glueBannerTuck':
				setObjectLuversValues(elem);
				break;
		};
	};
	
	
	
	
	
	
	
	

	calcForm.addEventListener('change', function(e){
		getFormValues(e);
		//calculation ();	
		console.log(e);
		console.log(orderedObject);
	});
	
	calcForm.addEventListener('submit', function(e){
		e.preventDefault();		
	});
	
	
	
	
	var calcPerimetr = function (){
		return (orderedObject.calcFormatWidth + orderedObject.calcFormatHeight) * 2;
	}
	
	var calcPrintArea = function (){
		return orderedObject.calcFormatWidth * orderedObject.calcFormatHeight * orderedObject.printCount;
	}
	
	var calcLuversCount = function () {
		var perimetr =  calcPerimetr();
		
	}	
	
	
	
	
	
	
	
	function calculation (){
		var materialPrice = calcPrintArea() * materialsData[orderedObject.printMedia].price;
		var printCost = calcPrintArea() * technologyData[orderedObject.printTech].price / 24;
		var totalCost = materialPrice + printCost;
		
		
		console.log('print area = ' + calcPrintArea() + ' m2');
		console.log('price for square meters of material (without econom placeing) $' +materialPrice );
		console.log('printing cost $' + printCost);
		console.log('material and printing cost $' + totalCost);
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