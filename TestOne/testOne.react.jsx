var buttonScreen = React.createClass({
	render: function (){
		return (
	<div>
			<p> {this.props.name} </p>;
			</div>
		);
	}
});


React.render(<buttonScreen name = "Hello World" />, document.getElementById("content"));

//function createTOneRc(){
//	var label = document.getElementById("screen");
//	React.render(<buttonScreen/>,label);

//}