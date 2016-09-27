var Row = ReactBootstrap.Row;
var Grid = ReactBootstrap.Grid;
var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;

// Variable to store array created from json representation of folders
var json;
var folderData;
var initialFolderData;

// Setup to allow this file to read from external json file
var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.overrideMimeType("application/json");
oReq.open("get", "../fileStructure.json", true);
oReq.send();

function reqListener(e) {
	json = JSON.parse(this.responseText);

	folderData = createSingleDepthArray_t3r(json);
	initialFolderData = createZeroDepthArray_t3r(json);

	var startTime = getCurrentTime_t3r();
	React.render(<TreeNodeList data={initialFolderData}/>,
					document.getElementById("content"));
	var endTime = getCurrentTime_t3r();
	console.log("Time render initial tree: " + (endTime-startTime).toFixed(2) + "ms");
}

var TreeNodeList = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},
	getInitialState: function() {
		return {
			data: this.props.data
		}
	},
	componentWillReceiveProps: function(newProps) {
		this.setState({
			data: newProps.data
		});
	},
	render: function() {
		var nodes = [];
		var data = this.state.data;

		for(var key in data) {
			nodes.push(
				<TreeNode
					node={data[key]}
					key={key}
				/>
			);
		}


		return (
			<div style={{paddingLeft: "10px"}}>
				{nodes}
			</div>
		);
	}
});

var TreeNode = React.createClass({
	propTypes: {
		node: React.PropTypes.object.isRequired,
	},
	render: function() {
		var expandGlyph = "";
		var folderGlyph = "";

		if(!this.props.node.expanded) {
			expandGlyph = "plus-sign";
			folderGlyph = "folder-close";
		}
		else {
			expandGlyph = "minus-sign";
			folderGlyph = "folder-open";
		}

		return (
			<Row style={{marginLeft: this.props.node.depth * 15}}>
				<Glyphicon glyph={expandGlyph} onClick={this._handleExpand} bsSize="xsmall"/>
				<Glyphicon glyph={folderGlyph}/>
				<span>
					{this.props.node.name}
				</span>
			</Row>
		);
	},
	_handleExpand: function() {
		if(!this.props.node.expanded) {
			updateTreeNode_t3r(this.props.node, true);
		}
		else {
			updateTreeNode_t3r(this.props.node, false);
		}
		this.forceUpdate();
	}
});

function createSingleDepthArray_t3r(data) {
	var arr = [];

	for(var key in data) {
		arr.push(data[key]);
		if(data[key].children.length > 0) {
			var tmp = createSingleDepthArray_t3r(data[key].children);

			for(var i in tmp) {
				arr.push(tmp[i]);
			}
		}
	}

	return arr;
}

function createZeroDepthArray_t3r(data) {
	var arr = [];

	for(var key in data) {
		arr.push(data[key]);
	}

	return arr;
}

function updateTreeNode_t3r(node, expanded) {
	var children = [];

	if(expanded) {
		for(var key in folderData) {
			if(folderData[key].id === node.id) {
				folderData[key].expanded = expanded;
				children = folderData[key].children;
				break;
			}
		}

		for(var key in initialFolderData) {
			if(initialFolderData[key].id === node.id) {
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
			if(initialFolderData[key].id === node.id) {
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

	var startTime = getCurrentTime_t3r();
	React.render(<TreeNodeList data={initialFolderData}/>,
					document.getElementById("content"));
	var endTime = getCurrentTime_t3r();
	console.log("Time to expand/close node: " + ((endTime-startTime).toFixed(2) * 1000) + "μs");
}

function getCurrentTime_t3r() {
	return window.performance.now();
}