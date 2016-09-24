var buttonScreen = React.createClass({
	render: function (){
		return (
			<div>
			<p> Hello </p>;
			</div>
		);
	}
});

function createTOneRc(){
	var label = document.getElementById("screen");
	React.render(buttonScreen,label);

}