// var Message = React.createClass({
//   render: function(){
//     return (

//       <div id='message'>
//         <p className='text'>{ this.props.text }</p>
//       </div>

//     );
//   }
// });

// React.render(<Message text='peace'/>, document.getElementById('demo'));


// var Alert = ReactBootstrap.Alert;

// const alertInstance = (
// <Alert bsStyle='success'>
// <strong>It Works!</strong> Good job, you are ready to start the tutorial.
// </Alert>
// );

// var Hello = React.createClass({
// render: function(){
// return (<h1>Hello World!</h1>)
// }

// // React.render(alertInstance, mountNode);

// React.render(<Hello />, mountNode);

// <label htmlFor='firstName'>First</label>
//         <input name='firstName' type='text' />
//         <p className='text'>tutorials</p>

// var Button = ReactBootstrap.Button;

// var MyBtn = React.createClass({
// 	render: function() {
// 		return (
// 			<Button>
// 				click
// 			</Button>
// 		)
// 	}
// });


var mountNode = document.getElementById('demo');
var Button = ReactBootstrap.Button;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var json;

function reqListener(e) {
	json = {};
	setup();
}

function setup() {
	if(json == null) { return; }

	React.render(<Example nodeId="tree"/>, mountNode);
	mountNode = document.getElementById("tree");

	/*for(i = 0; i < json["instances"].length; i++) {
		React.render(<SubListItem nodeName={json["instances"][i].name}/>, mountNode);
		var node = mountNode.firstChild;
		mountNode.removeChild(node);
		document.getElementById("dummy").appendChild(node);
	}*/
	getChildren(json["instances"]);

	var size = document.getElementById("dummy").children.length;
	for(i = 0; i < size; i++) {
		var node = document.getElementById("dummy").firstChild;
		document.getElementById("dummy").removeChild(document.getElementById("dummy").firstChild);
		mountNode.appendChild(node);
	}
}

function getChildren(json) {
	for(i = 0; i < json.length; i++) {
		React.render(<SubListItem nodeName={json[i].name}/>, mountNode);
		var node = mountNode.firstChild;
		mountNode.removeChild(node);
		document.getElementById("dummy").appendChild(node);
		//alert(json[i].child_count);
		if(json[i].child_count != 0 && json[i].children != undefined) {
			alert(json[i].name);
			alert(json[i].child_count);
			for(j = 0; j < json[i].children.length; j++) {
				React.render(<SubFolderListItem nodeName={json[i].children[j].name}/>, mountNode);
				var node = mountNode.firstChild;
				mountNode.removeChild(node);
				document.getElementById("dummy").appendChild(node);
				/*if(json[i].children[j].children != undefined) {
					getChildren(json[i].children[j]);
				}*/
			}
		}
	}
}

function alertClicked() {
	//alert('You clicked that item');
}

var Example = React.createClass({
    render: function() {
        return (
            <ListGroup id={this.props.nodeId}>
            </ListGroup>

        );
    }
});

var SubListItem = React.createClass({
	render: function() {
		return (
			<ListGroupItem id={this.props.nodeName} onClick={alertClicked}>
				{this.props.nodeName}
			</ListGroupItem>
			);
	}
});

var SubFolderListItem = React.createClass({
	render: function() {
		var indentStyle = {
			marginLeft: '1em'
		};

		return (
			<ListGroupItem id={this.props.nodeName} onClick={alertClicked} style={indentStyle}>
				{this.props.nodeName}
			</ListGroupItem>
			);
	}
});
