var Button = ReactBootstrap.Button;

function start_t1r() {
	var nodearr = [];
	for(i = 0; i < 50000; i++){
		nodearr.push("button" + i);
	}

	var startTime = getCurrentTime_t1r();
	React.render(<ButtonList data={nodearr} />, document.getElementById("content"));
	var endTime = getCurrentTime_t1r();

	console.log("Render time: " + (endTime-startTime).toFixed(2) + "ms");
	console.log("Render time: " + ((endTime-startTime) / 1000).toFixed(2) + "s");
}

var ButtonList = React.createClass({
	PropTypes: {
		data: React.PropTypes.array.isRequired
	},
	render: function() {
		var buttons = [];

		for(var key in this.props.data) {
			buttons.push(<CustomButton name={this.props.data[key]} key={key}/>);
		}

		return (
			<div>
				{buttons}
			</div>
		);
	}
})

var CustomButton = React.createClass({
	PropTypes: {
		name: React.PropTypes.string.isRequired
	},
	render: function () {
		return (
			<Button bsStyle="primary" style={{width: "100px"}}>
				{this.props.name}
			</Button>
		);
	}
});

function getCurrentTime_t1r() {
	return window.performance.now();
}