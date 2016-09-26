var buttons = [];


function setup(){
	var holder = document.getElementById("matchGame");
	var i;
	debugger;
	createButtonArray();
	for(i = 0; i < 20; i++){
			
			holder.appendChild(buttons[i].cardBt);
	}
}

function createButtonArray(){
	var i;
	for(i = 0; i < 20; i++){
		buttons[i] = createButton();
	}
}

function createButton(){
	var button = document.createElement("input");
	var card;
	button.type = "button";
	button.value = "";
	button.onclick = "flip()"
	button.style = "width: 100px; height: 150px; padding: 20px 50px;";
	card = {
		flipped: 0,
		number: ((Math.floor() * 20) + 1),
		cardBt : button,

	};
	return card;
}

function flip(){
	//debugger;
	var button = document.createElement("input");
	var holder = document.getElementById("matchGame");
	button.type = "button";
	button.value = "hello";
	holder.appendChild(button);

}
