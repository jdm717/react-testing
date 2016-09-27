function start_t1js() {
	var startTime = getCurrentTime_t1js();
	createTOneJS();
	var endTime = getCurrentTime_t1js();

	console.log("Render time: " + (endTime-startTime).toFixed(2) + "ms");
	console.log("Render time: " + ((endTime-startTime) / 1000).toFixed(2) + "s");
}


function createTOneJS(){
	var nodearr = [];
	for(i = 0; i < 50000; i++){
		nodearr.push("button" + i);
	}

	for(i = 0; i < 50000; i++){
		var btn = document.createElement("button");
		btn.className = "btn btn-primary";
		btn.style.width = "100px";
		btn.setAttribute("type", "button");
		btn.setAttribute("value", nodearr[i]);
		btn.innerHTML = nodearr[i];
		var label = document.getElementById("screen");
		label.appendChild(btn);
	}

}

function getCurrentTime_t1js() {
	return window.performance.now();
}