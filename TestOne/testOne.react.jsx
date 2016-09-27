var buttonScreen = React.createClass({
	PropTypes: {
		name: React.PropTypes.string.isRequired
	},
	render: function (){
		return (
			<div>
				<p> {this.props.name} </p>;
			</div>
		);
	}
});

React.render(<buttonScreen name={"Hello World"} />, document.getElementById("content"));

// function createTOneRc(){
// 	var label = document.getElementById("content");
// 	React.render(<buttonScreen name="Hello World"/>, label);

// }

window.onload = function() {
	debugger;
}