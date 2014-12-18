function enableTooltips(options){
	this.options = {
		parentId: null,
		doEval: false,
		tags: ['span', 'img', 'a', 'th', 'input']
	};
	
	Object.extend(this.options, options || {});
	
	var parentElement;

if(!document.getElementById || !document.getElementsByTagName) return;
	var body = document.getElementsByTagName("body")[0];

	var h = document.createElement("span");
	h.id="btc";
	h.setAttribute("id","btc");
	h.style.position="absolute";
	h.style.zIndex="100";
	body.appendChild(h);


	if (this.options.parentId && this.options.parentId != null) parentElement = document.getElementById(this.options.parentId);
	else parentElement = body;

	for (var i=0; i < this.options.tags.length; i++) {
		var links = parentElement.getElementsByTagName(this.options.tags[i]);
		for (var j=0; j < links.length; j++) {
			if (links[j].className == "toolTipRight") Prepare(links[j],"right", this.options);
			if (links[j].className == "toolTipLeft") Prepare(links[j],"left", this.options);
			if (links[j].className == "toolTipTop") Prepare(links[j],"top", this.options);
}
}
}

function Prepare(el,pos, options){
	var tooltip,t,b,s,l, q;
	
	if (options.doEval) t = eval(el.getAttribute("title"));
	else t = el.getAttribute("title");
	
if (t) {
	el.removeAttribute("title");
		if (pos=="right") tooltip = CreateToolTipEl("span","ttr");
		if (pos=="left") tooltip = CreateToolTipEl("span","ttl");
		if (pos=="top") tooltip = CreateToolTipEl("span","ttt");
		
		s = CreateToolTipEl("span","top");		
		s.innerHTML = t;

	tooltip.appendChild(s);
		
		
		b = CreateToolTipEl("b","bottom");
	l=" ";
	b.appendChild(document.createTextNode(l));
	tooltip.appendChild(b);
		
	setOpacity(tooltip);
		
	el.tooltip=tooltip;
	
		if (pos == "right") el.onmouseover = showTooltipRight;
		if (pos == "left") el.onmouseover = showTooltipLeft;
	if (pos=="top") {
		el.onmouseover=showTooltipTopl;
	
			if (t.length >= 50) el.onmouseover = showTooltipTopm;
			if (t.length > 150) el.onmouseover = showTooltipToph;
		}
		el.onmouseout = function(e) {
			hideTooltip();
		}
	el.onmousemove=Locate;
}
}

function showTooltipRight(e){
	hideTooltip();
document.getElementById("btc").appendChild(this.tooltip);
Locate(e,"right");
}
function showTooltipLeft(e){
	hideTooltip();
document.getElementById("btc").appendChild(this.tooltip);
Locate(e,"left");
}
function showTooltipTopl(e){
	hideTooltip();
document.getElementById("btc").appendChild(this.tooltip);
Locate(e,"topl");
}
function showTooltipTopm(e){
	hideTooltip();
document.getElementById("btc").appendChild(this.tooltip);
Locate(e,"topm");
}
function showTooltipToph(e){
	hideTooltip();
document.getElementById("btc").appendChild(this.tooltip);
Locate(e,"toph");
}

function hideTooltip() {
var d=document.getElementById("btc");
if(d.childNodes.length>0) d.removeChild(d.firstChild);
}

function setOpacity(el){
el.style.filter="alpha(opacity:95)";
el.style.KHTMLOpacity="0.95";
el.style.MozOpacity="0.95";
el.style.opacity="0.95";
}

function CreateToolTipEl(t,c){
var x=document.createElement(t);
x.className=c;
x.style.display="block";
return(x);
}

function Locate(e,pos){
var posx=0,posy=0;
	
if(e==null) e=window.event;
	
if(e.pageX || e.pageY){
    posx=e.pageX; posy=e.pageY;
	} else if (e.clientX || e.clientY) {
    if(document.documentElement.scrollTop){
        posx=e.clientX+document.documentElement.scrollLeft;
        posy=e.clientY+document.documentElement.scrollTop;
	    } else {
        posx=e.clientX+document.body.scrollLeft;
        posy=e.clientY+document.body.scrollTop;
        }
    }	
if (pos=="right") {
document.getElementById("btc").style.top=(posy+10)+"px";
document.getElementById("btc").style.left=(posx-20)+"px";
}
if (pos=="left") {
document.getElementById("btc").style.top=(posy+10)+"px";
document.getElementById("btc").style.left=(posx-180)+"px";
}
if (pos=="topl") {
document.getElementById("btc").style.top=(posy-50)+"px";
document.getElementById("btc").style.left=(posx+2)+"px";
}
if (pos=="topm") {
document.getElementById("btc").style.top=(posy-80)+"px";
document.getElementById("btc").style.left=(posx+2)+"px";
}
if (pos=="toph") {
document.getElementById("btc").style.top=(posy-150)+"px";
document.getElementById("btc").style.left=(posx+2)+"px";
}
}

Object.extend = function(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
} 
  return destination;
}

$(function() {
			var source= window.location.href;
			var patt = new RegExp("DETAILPARTNER");
			if (patt.test(source)){
				$(".klacht").hide();
			}
		});