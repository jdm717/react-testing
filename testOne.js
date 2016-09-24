
function createTOneJS(){
	var nodearr = [];
	for(i = 0; i < 1000; i++){
		nodearr.push("button" + i);
	}
	debugger;
	for(i = 0; i < 1000; i++){
		var btn = document.createElement("input");
		btn.setAttribute("type","button");
		btn.setAttribute("value", nodearr[i]);
		btn.setAttribute("name", nodearr[i]);
		var label = document.getElementById("screen");
		label.appendChild(btn);
	}

}