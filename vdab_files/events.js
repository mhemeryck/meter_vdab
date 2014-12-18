function setHelp(id,caller,openStr,closeStr) {
	obj = document.getElementById(id);
	if(obj.style.display != "block") {
		obj.style.display = "block";
		caller.className = "actionCloseHelp";
		caller.innerHTML = closeStr;
	} else {
		obj.style.display = "none";
		caller.className = "actionOpenHelp";
		caller.innerHTML = openStr;
	}

}

//@displayBodyId wordt getoond/verborgen
//foledFieldId id van field waar folded state wordt bijgehouden
//@caller normaal gezien foldableLink, waarvan de stijl wordt aangepast

function ExpandAndCollapseByDisplay(diplayBodyId, foldedFieldId, caller) {
		var isFolded = foldedFieldId;
		var body = diplayBodyId;
		var display = document.getElementById(body).style.display;
		
		var test = document.getElementById(body);
		
		for (var i = 0; i < document.getElementById(body).childNodes.lenght; i++) {
				document.getElementById(body).childNodes[i].disabled = "disabled";
		}
		
		if (display == 'none') {
			document.getElementById(body).style.display = 'block';
			if(isFolded != null)document.getElementById(isFolded).value = 'false';
			caller.className = 'actionCollapse';
		} else {
			document.getElementById(body).style.display = 'none';
			if(isFolded != null)document.getElementById(isFolded).value = 'true';
			caller.className = 'actionExpand';
		}
}

//methode die alle velden (inputs en textarea's) binnen de container op disabled/enabled zet
//behalve het element die de methode oproept
//indien caller leeg wordt gelaten, worden alle elementen van de container disabled

//@bodyId is id van het element die de velden omvat die moeten disabled worden
//@caller het element die de functie oproept, mag zelf niet disabled worden

function disableEnableContainer(bodyId, caller) {
	var body = document.getElementById(bodyId);
	elements = body.getElementsByTagName('input');
	disableEnableElements(elements);
	elements = body.getElementsByTagName('select');
	disableEnableElements(elements);
	elements = body.getElementsByTagName('textarea');
	disableEnableElements(elements);
	caller.disabled = false;
	
	//links kunnen niet via disabled tag gezet worden
	elements = body.getElementsByTagName('a');
	for (var i = 0; i < elements.length; i ++) {
						var obj = elements[i];
						
						//onclick disable/enable
						var onclick = obj.getAttribute('onclick');
						if(onclick && onclick != "" && onclick != null){
							obj.setAttribute('onclick_bak', onclick);
							obj.setAttribute('onclick','');
							obj.style.cursor = 'default';
						} else {
							onclick = obj.getAttribute('onclick_bak');
							if(onclick && onclick != "" && onclick != null){
								obj.setAttribute('onclick', onclick);
							}
							obj.style.cursor = 'pointer';
						}
						
						//href disable/enable
						var href = obj.getAttribute('href');
						if (href && href != "" && href != null){
								obj.setAttribute('href_bak', href);
								obj.removeAttribute('href', location.href);
								obj.style.cursor = 'default';
						} else {
								href = obj.getAttribute('href_bak');
								if(href && href != "" && href != null){
									obj.setAttribute('href', href);
								}
								obj.style.cursor = 'pointer';
						}
	}
}

//methode die de lijst van objecten disabled/enabled zet
//LET OP werkt enkel voor BUTTON, INPUT, OPTGROUP, OPTION, SELECT en TEXTAREA.
function disableEnableElements(elements) {
	for (var i = 0; i < elements.length; i ++) {
		//hidden fields niet disabled zetten, nodig voor default value bij checkbox te behouden
		if (elements[i].type != 'hidden') {
			if (elements[i].disabled) {
					elements[i].disabled = false;
			} else {
					elements[i].disabled = true;
			}
		}			
	}
}
	
function ExpandAndCollapse(id,caller,openStr,closeStr) {
	obj = document.getElementById(id);
	if(caller.innerHTML == openStr) {
		obj.style.display = "block";
		caller.innerHTML = closeStr;
	} else {
		obj.style.display = "none";
		caller.innerHTML = openStr;
	}
}

function popUp(URL) {
	day = new Date();
	id = day.getTime();
	var popup = window.open(URL, id, "toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=840,height=640,left = 240,top = 0");
	addChildWindow(popup);
}

var childWindows = new Array();
var childIndex = 0;	
var autoCloseChildWindows = true;

window.onunload=closeChildWindows;

function addChildWindow(child) {
	childWindows[childIndex] = child;
	childIndex++;
}
  
function UrlDecode( str ) {
	return str.replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&amp;/g,'&');
}
  
function openSizedChildWindow(url, target, width, height) {
	var newUrl;
	// Netscape en FF kunnen niet goed overweg met de urlencoded parameters. Daarom decoden wanneer browser van type Netscape is.
	// Probleem enkel geweten voor deze browsers, dus wanneer een ander type :-> geen decode doen.
	// Aanpassing gedaan omdat er problemen zijn met afdrukken chronologisch overzicht
	if( navigator.appName == 'Netscape' ){
		newUrl = UrlDecode(url);
	} else {
		newUrl = url;
	}
  	var win = window.open(newUrl, target, "'height=" + height + ",width=" + width + ",resizable=yes,scrollbars=yes,toolbar=no,location=no'");
  	addChildWindow(win);
  	return false;
}

function openChildWindow(url, target, options) {
  	var win = window.open(url, target, options);
  	//indien geopend in bestaand target opnieuw focus zetten
  	if (window.focus) {win.focus()};
  	addChildWindow(win);
  	return false;
}

function closeChildWindows() {
	var closed = false;
	if (window.event) {
		var e = window.event;
		if(e.clientX){
			if((e.clientX<0) || (e.clientY<0)){
				closed = true;
			}
		}
	}
  			 
	if (autoCloseChildWindows && closed) {
		for (var index=0;index<childIndex;index=index+1) 
		{			
			var childWindow = childWindows[index];
		     	if (childWindow && !childWindow.closed) {
		     		childWindow.close();
		     	}
		}
	}
}

var inputFieldIds = new Array(); //ids van velden die we op wijzigingen controleren
var inputFieldValues = new Array();  // de oorspronkelijke waarden van de gecontroleerde velden
var warn_onunload = true; //indicator of we een waarschuwing geven wanneer de pagina wordt gesloten en er nog onbewaarde gegevens zijn
var pageIsChecked = true; //default op true vermits niet-AB toepassingen deze parameter zelf niet definiëren
var skip_warn_onunload = false; //indicator of we de warn_onunload waarschuwing moeten bypassen
 
window.onbeforeunload = confirmExit; 

function populateArrays(){
	// assign the default values to the items in the values array
	for (var i = 0; i < inputFieldIds.length; i++){
		var elem = document.getElementById(inputFieldIds[i]);
		if (elem){
			if (elem.type == 'checkbox' || elem.type == 'radio') {
				inputFieldValues[i] = elem.checked;
			} 
			else if(inputFieldIds[i]=='boomTree') {
				inputFieldValues[i] = tree.toXML();
			}
			else {
				inputFieldValues[i] = elem.value;
			}
		}
	}     
}

function confirmExit(){
 	if (warn_onunload && !pageIsChecked && !skip_warn_onunload) {
		// check to see if any changes to the data entry fields have been made		
		for (var i = 0; i < inputFieldValues.length; i++) {
			var elem = document.getElementById(inputFieldIds[i]);
			
			if (elem) {
				if ((elem.type == 'checkbox' || elem.type == 'radio') && inputFieldValues[i] != elem.checked) {
					pageIsSubmitted=false;
					return "U heeft de wijzigingen niet bewaard.";
				}
				else if (inputFieldIds[i]=='boomTree') {
					if (inputFieldValues[i] != tree.toXML()) {
						pageIsSubmitted=false;
						return "U heeft de boom wijzigingen niet bewaard";
					}
				}					
				else if (!(elem.type == 'checkbox' || elem.type == 'radio') && (elem.value != inputFieldValues[i])) {	
					pageIsSubmitted=false;
					return "U heeft de wijzigingen niet bewaard.";
				}
			}
		} 
	}
}

/**
* ajax method of adding JS libraries on callback
*/
function addJSLibrary(jsSource) {
	var scriptTag=document.createElement('script');
	scriptTag.type = 'text/javascript';
	scriptTag.src=jsSource;
	var myElement = document.getElementsByTagName("head")[0];
	myElement.appendChild(scriptTag);
}
function ExpandCollapse(id, expand) {
	obj = document.getElementById(id);
	if(expand == "J") {
		obj.style.display = "block";
	}
	else {
		obj.style.display = "none";
	}
}
