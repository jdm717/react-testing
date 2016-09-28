var buttons = [];
var firstCard = "";
var firstId = "";
var secondCard = "";

var glyphs = ["star", "star-empty", "heart", "cog", "leaf", "tower", "apple", "flash", "heart-empty", "fire"];
var bestScore = 100;
var gamesPlayed = 0;
var moves = 0;

function setup_t2js(skipCreateButtonArr) {
	var startTime = getCurrentTime_t2js();
	var holder = document.getElementById("matchGame");
	var grid = document.createElement("DIV");
	grid.className = "container";
	grid.style.margin = "0 0 0 0";
	grid.style.padding = "0 0 0 0";
	grid.style.width = "80%";
	grid.style.display = "inline-block";

	if(!skipCreateButtonArr) createButtonArray_t2js();
	
	holder.innerHTML = "";

	for(var i = 0; i < 20; i++){
		grid.appendChild(buttons[i]);
	}

	holder.appendChild(grid);
	holder.appendChild(createPanel_t2js());
	var endTime = getCurrentTime_t2js();
	if(!skipCreateButtonArr) console.log("Render time: " + (endTime-startTime).toFixed(2) + "ms");
}

function createButtonArray_t2js() {
	for(var i = 0; i < 20; i++){
		var j = i;
		if(j >= 10) j = i - 10;

		buttons[i] = createButton_t2js(false, glyphs[j], "button" + i, true, true);
	}

	buttons = shuffleArray_t2js(buttons);
}

function flip_t2js() {
	if(firstCard !== "" && secondCard !== "") return;

	var a,b;
	var id = this.id;
	var startTime = getCurrentTime_t2js();
	setButtonProperty_t2js("visibility", true, id);
	var endTime;

	moves++;

	if(firstCard === "") {
		firstCard = this.firstChild.className;
		firstId = id;

		endTime = getCurrentTime_t2js();
		console.log("Flip time: " + (endTime-startTime).toFixed(2) + "ms");

		return;
	}
	else if(secondCard === "") secondCard = this.firstChild.className;

	if(firstCard === secondCard) {
		setButtonProperty_t2js("success", true, firstId);
		setButtonProperty_t2js("success", true, id);

		firstId = "";
		firstCard = "";
		secondCard = "";
	}
	else {
		setTimeout(function() { setButtonProperty_t2js("visibility", false, firstId); }, 1000);
		setTimeout(function() { setButtonProperty_t2js("visibility", false, id); }, 1000);

		setTimeout(function() {
			firstId = "";
			firstCard = "";
			secondCard = "";
		}, 1000);
	}

	endTime = getCurrentTime_t2js();

	console.log("Flip time: " + (endTime-startTime).toFixed(2) + "ms");
}

function reset_t2js() {
	firstId = "";
	firstCard = "";
	secondCard = "";

	if(moves <= bestScore && moves >= 20) bestScore = Math.floor(moves * .5);
	gamesPlayed++;
	moves = 0;

	var startTime = getCurrentTime_t2js();
	setup_t2js(false);
	var endTime = getCurrentTime_t2js();

	console.log("Reset time: " + (endTime-startTime).toFixed(2) + "ms");
}

function checkMoves(){
	var a, b;

	if(buttons.length < 2){
		return false;
	}
	for(a = 0; a < buttons.length; a++){
		for(b = 0; b < buttons.length; b++){
			if(a != b){
				if(buttons[a].number == buttons[b].number){
					return true;
				}
			}
		}
	}

	return false;
}

function gameOver(){
	var a;
	var holder;
	for (a = 0; a < buttons.length; a++){
		holder = document.getElementById(buttons[a].butId);
		holder.value = buttons[a].number;
	}
}

function createButton_t2js(success, glyph, id, hidden, isSetup) {
	var button = document.createElement("BUTTON");
	var glyphicon = document.createElement("SPAN");

	button.id = id;
	button.className = success ? "btn btn-success" : "btn btn-primary";
	button.style.height = window.innerHeight * .25;
	button.style.width = (window.innerWidth * .8) * .2;
	button.onclick = flip_t2js;
	if(isSetup) glyphicon.className = "glyphicon glyphicon-" + glyph;
	else glyphicon.className = glyph;
	glyphicon.style.visibility = hidden ? "hidden" : "visible";

	button.appendChild(glyphicon);

	return button;
}

function createPanel_t2js() {
	var panel = document.createElement("DIV");
	var panelHeading = document.createElement("DIV");
	var panelBody = document.createElement("DIV");
	var span1 = document.createElement("SPAN");
	var span2 = document.createElement("SPAN");
	var button = document.createElement("BUTTON");

	panel.className = "panel panel-default";
	panel.style.display = "inline-block";
	panel.style.height = "100%";
	panel.style.width = "20%";
	panel.style.position = "absolute";
	panel.style.top = "0";
	panel.style.margin = "0 0 0 0";
	panelHeading.className = "panel-heading";
	panelHeading.innerHTML = "Scores";
	panelBody.className = "panel-body";
	span1.innerHTML = "Games played: " + gamesPlayed;
	span2.innerHTML = "Best score: " + bestScore;
	button.className = "btn btn-default";
	button.setAttribute("type", "button");
	button.innerHTML = "Reset";
	button.onclick = reset_t2js;

	panelBody.appendChild(span1);
	panelBody.appendChild(document.createElement("BR"));
	panelBody.appendChild(span2);
	panelBody.appendChild(document.createElement("BR"));
	panelBody.appendChild(document.createElement("BR"));
	panelBody.appendChild(document.createElement("BR"));
	panelBody.appendChild(button);
	panel.appendChild(panelHeading);
	panel.appendChild(panelBody);

	return panel;
}

function shuffleArray_t2js(data) {
	var arr = data.slice(0);

	for(var i = 0; i < data.length * 5; i++) {
		var firstIndex = Math.floor(Math.random() * 10);
		var secondIndex = Math.floor(Math.random() * 10) + 9;

		var tmp = arr[secondIndex];
		arr[secondIndex] = arr[firstIndex];
		arr[firstIndex] = tmp;
	}

	return arr;
}

function setButtonProperty_t2js(property, value, id) {
	var currentButton;
	var index = -1;

	for(var key in buttons) {
		if(buttons[key].id === id) {
			index = parseInt(key);
			currentButton = buttons[key];

			break;
		}
	}

	var newButton;
	var success;
	if(currentButton.className.includes("success")) success = true;
	else success = false;
	if(property === "success") {
		newButton = createButton_t2js(value, currentButton.firstChild.className, id, currentButton.style.visibility);
	}
	else if(property === "visibility") {
		newButton = createButton_t2js(success, currentButton.firstChild.className, id, !value);
	}

	buttons[index] = newButton;

	this.setup_t2js(true);
}

function getCurrentTime_t2js() {
	return window.performance.now();
}