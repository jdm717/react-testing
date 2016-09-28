var items = 0;

function addItems(){
	var startTime = getCurrentTime_t4js();
	var numItems = document.getElementById("numItems").value;
	var holder = document.getElementById("screen");
	var i;

	for(i = 0; i < numItems; i++){
		items++;
		var button = document.createElement("button");
		var span = document.createElement("span");

		button.setAttribute("type", "button");
		button.value = "";
		button.id = "button" + items;
		button.style = "width: 100px; height: 100px";
		button.className = "btn btn-warning";
		span.innerHTML = "Button" + items;
		span.style = "text-align: center; width: 100px";
		button.appendChild(span);
		holder.appendChild(button);
	}
	var endTime = getCurrentTime_t4js();

	console.log("Time to add " + numItems + " item(s): " + (endTime-startTime).toFixed(2) + "ms");
}

function removeItems(){
	var startTime = getCurrentTime_t4js();
	var numItems = document.getElementById("numItems").value;
	var i = 0;

	while(i < numItems && items != 0){
		var holder = document.getElementById("screen");
		if(holder.children.length == 0) break;
		var buttonId = "button" + items;

		if(holder.children.length == 1) holder.innerHTML = "";
		else holder.removeChild(holder.firstChild);

		i++;
		items = holder.children.length;
	}
	var endTime = getCurrentTime_t4js();

	console.log("Time to remove " + numItems + " item(s): " + (endTime-startTime).toFixed(2) + "ms");
}

function getCurrentTime_t4js() {
	return window.performance.now();
}