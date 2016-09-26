var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.overrideMimeType("application/json");
oReq.open("get", "../fileStructure.json", true);
oReq.send();

function reqListener(e) {
	json = JSON.parse(this.responseText);

	folderData = createSingleDepthArray_t3js(json);
	initialFolderData = createZeroDepthArray_t3js(json);

	logCurrentTime_t3js();
	renderTree_t3js();
	logCurrentTime_t3js();
}

var date;

function renderTree_t3js() {
	var treeContainer = document.createElement("DIV");
	treeContainer.style.padding = "0 0 0 10px";

	var sign;
	var folder;
	var name;
	var row;

	for(var i = 0; i < initialFolderData.length; i++) {
		sign = document.createElement("SPAN");
		folder = document.createElement("SPAN");
		name = document.createElement("SPAN");
		row = document.createElement("DIV");

		sign.dataset.folderid = initialFolderData[i].id;
		name.innerHTML = initialFolderData[i].name;

		if(initialFolderData[i].expanded) {
			sign.className = "glyphicon glyphicon-xs glyphicon-minus-sign";
			folder.className = "glyphicon glyphicon-folder-open";
			sign.onclick = minusSignClicked_t3js;
		}
		else if(!initialFolderData[i].expanded) {
			sign.className = "glyphicon glyphicon-xs glyphicon-plus-sign";
			folder.className = "glyphicon glyphicon-folder-close";
			sign.onclick = plusSignClicked_t3js;
		}
		row.className = "row";
		row.style.margin = "0 0 0 " + initialFolderData[i].depth * 15 + "px";

		row.appendChild(sign);
		row.appendChild(folder);
		row.appendChild(name);
		treeContainer.appendChild(row);
	}

	document.getElementById("content").appendChild(treeContainer);
}

// Method currently duplicated in both testThree.react and testThree
// Will be added to a shared utility file when both use the same html page
function createSingleDepthArray_t3js(data) {
	var arr = [];

	for(var key in data) {
		arr.push(data[key]);
		if(data[key].children.length > 0) {
			var tmp = createSingleDepthArray_t3js(data[key].children);

			for(var i in tmp) {
				arr.push(tmp[i]);
			}
		}
	}

	return arr;
}

// Method currently duplicated in both testThree.react and testThree
// Will be added to a shared utility file when both use the same html page
function createZeroDepthArray_t3js(data) {
	var arr = [];

	for(var key in data) {
		arr.push(data[key]);
	}

	return arr;
}

function plusSignClicked_t3js(e) {
	updateTreeNode_t3js(this.dataset.folderid, true);
}

function minusSignClicked_t3js(e) {
	updateTreeNode_t3js(this.dataset.folderid, false);
}

// Method currently duplicated in both testThree.react and testThree
// Will be added to a shared utility file when both use the same html page
function updateTreeNode_t3js(id, expanded) {
	var children = [];

	if(expanded) {
		for(var key in folderData) {
			if(folderData[key].id === id) {
				folderData[key].expanded = expanded;
				children = folderData[key].children;
				break;
			}
		}

		for(var key in initialFolderData) {
			if(initialFolderData[key].id === id) {
				initialFolderData[key].expanded = expanded;
				for(var i in children) {
					initialFolderData.splice(parseInt(key) + parseInt(i) + 1, 0, children[i]);
				}
				break;
			}
		}
	}
	else {
		var depth = -1;
		var index = 0;
		var count = 0;

		for(var key in initialFolderData) {
			if(initialFolderData[key].id === id) {
				initialFolderData[key].expanded = expanded;
				depth = initialFolderData[key].depth;
				index = parseInt(key);
			}
			
			if(depth != -1 && initialFolderData[key].depth > depth) {
				if(initialFolderData[key].expanded) initialFolderData[key].expanded = expanded;
				count++;
			}
			else if(depth != -1 && index != parseInt(key)) {
				initialFolderData.splice(index + 1, count);
				break;
			}
		}
	}

	logCurrentTime_t3js();
	document.getElementById("content").removeChild(document.getElementById("content").firstChild);
	renderTree_t3js();
	logCurrentTime_t3js();
}

// Method currently duplicated in both testThree.react and testThree
// Will be added to a shared utility file when both use the same html page
function logCurrentTime_t3js() {
	date = new Date();
	console.log(date.getTime());
}