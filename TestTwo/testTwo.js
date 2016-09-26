var buttons = [];
var firstCard = "";
var secondCard = "";

function setup(){
	var holder = document.getElementById("matchGame");
	var i;
	createButtonArray();
	for(i = 0; i < 20; i++){
			
			holder.appendChild(buttons[i].cardBt);
	}
}

function createButtonArray(){
	var i;
	for(i = 0; i < 20; i++){
		buttons[i] = createButton(i);
		console.log(buttons[i].number);
	}
}

function createButton(numBut){
	var button = document.createElement("input");
	var card;
	button.type = "button";
	button.value = "";
	button.onclick = flip;
	button.id = "button" + numBut;
	button.style = "width: 100px; height: 150px; padding: 20px 50px;";
	card = {
		flipped: 0,
		number: (Math.floor(Math.random() * 10) + 1),
		cardBt : button,
		butId : button.id,

	};
	return card;
}

function flip(){
	var a,b;
	debugger;
	if(this.value == ""){
		var whatBut = this.id.charAt(6);
		var numBut = +whatBut;
		this.value = buttons[numBut].number;
	}
	else{
		this.value = "";
	}

	if(firstCard == ""){
		firstCard = this.id;
	}

	else if(firstCard != ""){
		if(secondCard != ""){
			var hideCard = document.getElementById(secondCard);
			hideCard.value = "";
		}
		secondCard = firstCard;
		firstCard = this.id;
	}
	if(secondCard != ""){
		var matchOne = document.getElementById(firstCard);
		var matchTwo = document.getElementById(secondCard);
		if(matchOne.value == matchTwo.value){
			for(a = 0; a < buttons.length; a++){
				if(buttons[a].butId == firstCard){
					buttons.splice(a,1);
				}
				if(buttons[a].butId == secondCard){
					buttons.splice(a,1);
				}
			}

		matchOne.remove();
		matchTwo.remove();
		}
	}
	if(!checkMoves()){
		alert("Game over");
	}
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
