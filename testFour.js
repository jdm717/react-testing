var items = 0;

function additems(){
	var numItems = document.getElementById("numItems").value;
	var holder = document.getElementById("screen");
	var i;
	debugger;
	for(i = 0; i < numItems; i++){
		items++;
		var button = document.createElement("input");
			var card;
		button.type = "button";
		button.value = "";
		button.id = "button" + items;
		button.style = "width: 100px; height: 150px; padding: 20px 50px;";
		holder.appendChild(button);
	}
	debugger;
	var num = items;
}

function removeitems(){
	var i;
	debugger;
	while(items != 0){
		var buttonId = "button" + items;
		var item = document.getElementById(buttonId);
		item.remove();
		items--;
	}
}