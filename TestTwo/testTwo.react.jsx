var Button = ReactBootstrap.Button;
var Grid = ReactBootstrap.Grid;
var Glyphicon = ReactBootstrap.Glyphicon;
var Panel = ReactBootstrap.Panel;

var glyphs = ["star", "star-empty", "heart", "cog", "leaf", "tower", "apple", "flash", "heart-empty", "fire"];
var bestScore = 100;
var gamesPlayed = 0;
var moves = 0;

var firstCard = "";
var secondCard = "";

var data = [];

function start_t2r() {
	var buttons = [];

	for(var i = 0; i < 20; i++) {
		var j = i;

		if(j >= 10) j -= 10;

		buttons.push({
			glyph: glyphs[j]
		});
	}

	data = shuffleArray_t2r(buttons);

	var startTime = getCurrentTime_t2r();
	React.render(<ButtonGrid data={buttons} />, document.getElementById("content"));
	var endTime = getCurrentTime_t2r();

	console.log("Render time: " + (endTime-startTime).toFixed(2) + "ms");
}

var ButtonGrid = React.createClass({
	PropTypes: {
		data: React.PropTypes.array.isRequired
	},
	getInitialState: function() {
		return {
			value: null,
			lastId: null,
			correct: []
		}
	},
	render: function() {
		var buttons = [];

		for(var key in data) {
			var id = "button" + key;
			var isCorrect;
			if(this.state.correct.indexOf(data[key].value) >= 0) isCorrect = true;
			else isCorrect = false;

			buttons.push(<MemoryCard 
							ref={id}
							id={id} 
							glyph={data[key].glyph} 
							isCorrect={isCorrect}
							setFlipped={this._setFlipped}
							key={key}/>
						);
		}

		return (
			<div>
				<Grid style={{margin: "0 0 0 0", padding: "0 0 0 0", width: "80%", display:"inline-block"}}>
					{buttons}
				</Grid>
				<Panel header="Scores" style={{display: "inline-block", height: "100%", width: "20%", position: "absolute", top:"0", margin: "0 0 0 0"}}>
					 <span>	{"Games played: " + gamesPlayed} </span><br/>
					 <span>	{"Best score: " + bestScore} </span><br/>
					 <br/>
					 <br/>
					 <Button onClick={this._resetGame} bsStyle={"default"}>Reset</Button>
				</Panel>
			</div>
		);
	},
	_setFlipped: function(value, id) {
		if(!this.state.value) {
			this.setState({
				value: value,
				lastId: id
			});
		}
		else if(value === this.state.value && id !== this.state.lastId) {
			var correct = this.state.correct;

			correct.push(value);

			this.refs[id].setCorrect();
			this.refs[this.state.lastId].setCorrect();

			firstCard = "";
			secondCard = "";

			this.setState({
				correct: correct,
				value: null,
				lastId: null
			});
		}
		else {
			var that = this;

			setTimeout(function() { that.refs[id].flipCard(); }, 1000);
			setTimeout(function() { that.refs[that.state.lastId].flipCard(); }, 1000);
			setTimeout(function() { firstCard = ""; secondCard = ""; }, 1005);

			this.setState({
				value: null
			});
		}
	},
	_resetGame: function() {
		if(moves < bestScore && moves >= 20) bestScore = Math.floor(moves * .5);
		moves = 0;
		gamesPlayed++;
		data = shuffleArray_t2r(data);
		firstCard = "";
		secondCard = "";

		var startTime = getCurrentTime_t2r();
		this.setState({
			value: null,
			lastId: null,
			correct: []
		});
		for(var key in this.refs) {
			this.refs[key].state.visible = false;
			this.refs[key].state.isCorrect = false;
		}
		var endTime = getCurrentTime_t2r();

		console.log("Reset time: " + (endTime-startTime).toFixed(2) + "ms");
	}
});

var MemoryCard = React.createClass({
	PropTypes: {
		id: React.PropTypes.string.isRequired,
		glyph: React.PropTypes.string.isRequired,
		isCorrect: React.PropTypes.bool.isRequired,

		setFlipped: React.PropTypes.func.isRequired
	},
	getInitialState: function() {
		return {
			visible: false,
			isCorrect: this.props.isCorrect
		}
	},
	render: function () {
		var buttonWidth = (window.innerWidth * .8) * .2;
		var buttonHeight = window.innerHeight * .25;

		var isVisible = this.state.visible ? "visible" : "hidden";
		var bsStyle = this.state.isCorrect ? "success" : "primary";

		var buttonStyle = {
			width: buttonWidth, 
			height: buttonHeight
		}

		return (
			<Button bsStyle={bsStyle} onClick={this._onClickFlipCard} style={buttonStyle}>
				<Glyphicon glyph={this.props.glyph} style={{visibility: isVisible}}/>
			</Button>
		);
	},
	setCorrect: function() {
		this.state.isCorrect = true;
	},
	flipCard: function() {
		this.setState({
			visible: false
		});
	},
	_onClickFlipCard: function(e) {
		if(firstCard === "") firstCard = this.props.glyph;
		else if(secondCard === "") secondCard = this.props.glyph;
		else return;

		var startTime = getCurrentTime_t2r();
		this.setState({
			visible: !this.state.visible
		});

		this.props.setFlipped(this.props.glyph, this.props.id);
		var endTime = getCurrentTime_t2r();

		console.log("Flip time: " + (endTime-startTime).toFixed(2) + "ms");

		moves++;
	}
});

function shuffleArray_t2r(data) {
	var arr = data.slice(0);

	for(var i = 0; i < data.length * 5; i++) {
		var firstIndex = Math.floor(Math.random() * 10);
		var secondIndex = Math.floor(Math.random() * 10) + 9;

		var tmp = arr[secondIndex].glyph;
		arr[secondIndex].glyph = arr[firstIndex].glyph;
		arr[firstIndex].glyph = tmp;
	}

	return arr;
}

function getCurrentTime_t2r() {
	return window.performance.now();
}