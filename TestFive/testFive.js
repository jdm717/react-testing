var json;
var numRenders = 0;
var avgRenderTime = 0;

var scrollPosition = 0;
var elementHeight = 42;
var elements = Math.floor((window.innerHeight / elementHeight) * 1.75);

var showConsoleLogs = false;

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.overrideMimeType("application/json");
oReq.open("get", "scrollStructure_10K.json", true);
oReq.send();

function reqListener(e) {
	json = JSON.parse(this.responseText);

	document.getElementById("body").onscroll = updateScrollPos_t5js;

	var startTime = getCurrentTime_t5js();
	renderArray_t5js(json);
	var endTime = getCurrentTime_t5js();
	console.log("Initial render time: " + (endTime-startTime).toFixed(2) + "ms");
}

function renderArray_t5js(data) {
	var arrayContainer = document.getElementById("content");

	var navbar;
	var listGroupItem;
	var name;
	var listGroup;

	var startingPos = Math.floor(scrollPosition / elementHeight) + 4;
	var startIndex = Math.floor(startingPos - (elements)  * .25) + 4;
	var visibleItems = [];

	if(startIndex < 0) startIndex = 0;
	var i = startIndex;
	var count = 0;
	if(i < 0) i = 0;

	while(count < elements && i < data.length) {
		var offset = Math.floor(startIndex * elementHeight);
		listGroupItem = document.createElement("SPAN");
		name = document.createElement("SPAN");

		listGroupItem.className = "list-group-item";
		listGroupItem.style.top = offset + "px";
		listGroupItem.style.position = "relative";
		name.innerHTML = data[i].name;
		listGroupItem.appendChild(name);

		visibleItems.push(listGroupItem);

		count++;
		i++;
	}

	listGroup = document.createElement("DIV");
	listGroup.className = "list-group";

	for(var j = 0; j < visibleItems.length; j++) {
		listGroup.appendChild(visibleItems[j]);
	}

	navbar = setupNavbar_t5js();

	container = document.createElement("DIV");
	container.className = "container";
	container.style.overflow = "hidden";
	container.style.height = data.length * elementHeight + "px";
	container.style.marginTop = "52px";
	container.appendChild(listGroup);

	var wrapper = document.createElement("DIV");
	wrapper.appendChild(navbar);
	wrapper.appendChild(container);

	arrayContainer.appendChild(wrapper);
}

function updateScrollPos_t5js(e) {
	scrollPosition = e.target.scrollingElement.scrollTop;

	//document.getElementById("content").removeChild(document.getElementById("content").firstChild);
	document.getElementById("content").innerHTML = "";

	var startTime = getCurrentTime_t5js();
	renderArray_t5js(json);
	var endTime = getCurrentTime_t5js();

	var timeTaken = endTime - startTime;
	updateAverageRenderTime_t5js(timeTaken);	

	if(showConsoleLogs) console.log("Time to re-render after scroll: " + (endTime-startTime).toFixed(2) + "ms");
}

function scrollToTop_t5js() {
	document.getElementById("body").scrollTop = 0;

	document.getElementById("content").removeChild(document.getElementById("content").firstChild);
	document.getElementById("content").innerHTML = "";

	renderArray_t5js(json);
}

function turnConsoleLogsOn_t5js() {
	showConsoleLogs = !showConsoleLogs;

	document.getElementById("content").removeChild(document.getElementById("content").firstChild);
	document.getElementById("content").innerHTML = "";

	renderArray_t5js(json);
}

function getCurrentTime_t5js() {
	return window.performance.now();
}

function getAverageRenderTime_t5js() {
	console.log("Average re-render time after scroll: " + (avgRenderTime).toFixed(2) + "ms");
}

function updateAverageRenderTime_t5js(time) {
	var totalTime = avgRenderTime * numRenders + time;

	numRenders++;
	avgRenderTime = totalTime / numRenders;
}

function setupNavbar_t5js() {
	var navbar = document.createElement("NAV");
	var container = document.createElement("DIV");
	var navbarHeader = document.createElement("DIV");
	var navbarBrand = document.createElement("DIV");
	var navbarHeaderGlyphicon = document.createElement("SPAN");
	var navbarHeaderSpan = document.createElement("SPAN");
	var navbarUl = document.createElement("UL");
	var navbarLi = document.createElement("LI");
	var navbarA = document.createElement("A");
	var navbarButton = document.createElement("BUTTON");
	var navbarGlyphicon = document.createElement("SPAN");
	navbar.className = "navbar navbar-inverse navbar-fixed-top";
	navbarBrand.className = "navbar-brand";
	navbarBrand.style.cursor = "pointer";
	navbarBrand.onclick = scrollToTop_t5js;
	navbarHeaderGlyphicon.className = "glyphicon glyphicon-collapse-up";
	navbarHeaderSpan.style.padding = "0 0 0 10px";
	navbarHeaderSpan.innerHTML = "Back to Top";
	container.className = "container";
	navbarHeader.className = "navbar-header";
	navbarUl.className = "nav navbar-nav navbar-right";
	navbarLi.className = "presentation";
	navbarA.setAttribute('role', "button");
	navbarA.setAttribute('title', "Show timing console logs");
	if(showConsoleLogs) navbarButton.className = "btn btn-xs btn-success";
	else navbarButton.className = "btn btn-xs btn-danger";
	navbarButton.onclick = turnConsoleLogsOn_t5js;
	navbarGlyphicon.className = "glyphicon glyphicon-console";

	navbarBrand.appendChild(navbarHeaderGlyphicon);
	navbarBrand.appendChild(navbarHeaderSpan);
	navbarHeader.appendChild(navbarBrand);
	navbarButton.appendChild(navbarGlyphicon);
	navbarA.appendChild(navbarButton);
	navbarLi.appendChild(navbarA);
	navbarUl.appendChild(navbarLi);

	navbarLi = document.createElement("LI");
	navbarA = document.createElement("A");
	navbarButton = document.createElement("BUTTON");
	navbarGlyphicon = document.createElement("SPAN");
	navbarLi.className = "presentation";
	navbarA.setAttribute('role', "button");
	navbarA.setAttribute('title', "Show timing console logs");
	navbarButton.className = "btn btn-xs btn-default";
	navbarButton.onclick = getAverageRenderTime_t5js;
	navbarGlyphicon.className = "glyphicon glyphicon-time";

	navbarButton.appendChild(navbarGlyphicon);
	navbarA.appendChild(navbarButton);
	navbarLi.appendChild(navbarA);
	navbarUl.appendChild(navbarLi);

	container.appendChild(navbarHeader);
	container.appendChild(navbarUl);
	navbar.appendChild(container);

	return navbar;
}