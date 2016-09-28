var Button = ReactBootstrap.Button;

function start_t4r() {
	var startTime = getCurrentTime_t4r();
	React.render(<ButtonList />, document.getElementById("screen"));
	var endTime = getCurrentTime_t4r();
}

var ButtonList = React.createClass({
	getInitialState: function() {
		return {
			data: []
		}
	},
	componentDidMount: function() {
		document.getElementById("addItems").onclick = this._addItems;
		document.getElementById("removeItems").onclick = this._removeItems;
	},
	componentWillUnmount: function() {
		document.getElementById("addItems").onclick = null;
		document.getElementById("removeItems").onclick = null;
	},
	render: function() {
		return (
			<div>
				{this.state.data}
			</div>
		);
	},
	_addItems: function() {
		var elements = this.state.data;
		var numItems = document.getElementById("numItems").value;
		if(numItems == 0) return;

		var length = this.state.data.length + 1;
		for(var i = 0; i < numItems; i++) {
			elements.push(<CustomButton name={"button" + length} key={length}/>);
			length++;
		}

		var startTime = getCurrentTime_t4r();
		this.setState({
			data: elements
		});
		var endTime = getCurrentTime_t4r();

		console.log("Time to add " + numItems + " item(s): " + (endTime-startTime).toFixed(2) + "ms");
	},
	_removeItems: function() {
		var elements = this.state.data;
		var numItems = document.getElementById("numItems").value;
		if(numItems == 0 || elements.length == 0) return;

		for(var i = 0; i < numItems; i++) {
			if(elements.length == 0) break;;
			elements.splice(0, 1);
		}

		var startTime = getCurrentTime_t4r();
		this.setState({
			data: elements
		});
		var endTime = getCurrentTime_t4r();

		console.log("Time to remove " + numItems + " item(s): " + (endTime-startTime).toFixed(2) + "ms");
	}
})

var CustomButton = React.createClass({
	PropTypes: {
		name: React.PropTypes.string.isRequired
	},
	render: function () {
		return (
			<Button bsStyle="warning" style={{width: "100px", height: "100px"}}>
				<span>{this.props.name}</span>
			</Button>
		);
	}
});

function getCurrentTime_t4r() {
	return window.performance.now();
}