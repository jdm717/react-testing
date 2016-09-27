var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;
var Nav = ReactBootstrap.Nav;
var Glyphicon = ReactBootstrap.Glyphicon;
var Button = ReactBootstrap.Button;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupItem = ReactBootstrap.ListGroupItem;

var json;
var numRenders = 0;
var avgRenderTime = 0;

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.overrideMimeType("application/json");
oReq.open("get", "scrollStructure_10K.json", true);
oReq.send();

function reqListener(e) {
	json = JSON.parse(this.responseText);

	var startTime = getCurrentTime_t5r();
	ReactDOM.render(<ScrollList data={json} rowHeight={42} />, document.getElementById("content"));
	var endTime = getCurrentTime_t5r();

	console.log("Initial render time: " + (endTime-startTime).toFixed(2) + "ms");
}

var ScrollList = React.createClass({
	PropTypes: {
		data: React.PropTypes.array.isRequired,
		rowHeight: React.PropTypes.number.isRequired
	},
	getInitialState: function() {
		return {
			scrollPos: 0,
			startingPos: 0,
			elements: Math.floor((window.innerHeight / this.props.rowHeight) * 1.75),
			consoleLogsOn: false
		}
	},
	componentDidMount: function() {
		window.addEventListener('scroll', this._updateScrollPos);
	},
	componentWillUnmount: function() {
		window.removeEventListener('scroll', this._updateScrollPos);
	},
	render: function() {
		var visibleItems = [];
		var displayedItems = this.state.elements;
		var consoleButtonStyle;
		var startIndex = Math.floor(this.state.startingPos - (displayedItems) * .25);
		if(startIndex < 0) startIndex = 0;

		var i = startIndex;
		var count = 0;
		while(count < displayedItems && i < this.props.data.length) {
			visibleItems.push(
				<ScrollItem name={this.props.data[i].name} offset={Math.floor(startIndex * this.props.rowHeight)} key={i} />
			);

			count++;
			i++;
		}

		if(this.state.consoleLogsOn) consoleButtonStyle = "success";
		else consoleButtonStyle = "danger";

		return (
			<div>
				<Navbar inverse fixedTop>
					<Navbar.Header>
						<Navbar.Brand>
							<div onClick={this._scrollToTop} style={{cursor: "pointer"}}>
								<Glyphicon glyph={"collapse-up"}/>
								<span style={{padding: "0 0 0 10px"}}>Back to Top</span>
							</div>
						</Navbar.Brand>
					</Navbar.Header>
					<Nav pullRight>
						<NavItem eventKey={1} onClick={this._turnConsoleLogsOn} title="Show timing console logs">
							<Button bsSize="xsmall" bsStyle={consoleButtonStyle}>
								<Glyphicon glyph="console"/>
							</Button>
						</NavItem>
						<NavItem eventKey={2} onClick={this._getAverageRenderTime} title="Get average render time">
							<Button bsSize="xsmall">
								<Glyphicon glyph="time"/>
							</Button>
						</NavItem>
					</Nav>
				</Navbar>
				<Grid style={{overflow: "hidden", height: this.props.data.length * this.props.rowHeight, marginTop: "52px"}}>
					<ListGroup>
						{visibleItems}
					</ListGroup>
				</Grid>
			</div>
		);
	},
	_updateScrollPos: function(e) {
		this.setState({
			scrollPos: e.target.scrollingElement.scrollTop,
			startingPos: Math.floor(e.target.scrollingElement.scrollTop / this.props.rowHeight)
		});

		var startTime = getCurrentTime_t5r();
		updateList_t5r();
		var endTime = getCurrentTime_t5r();

		var timeTaken = endTime - startTime;
		updateAverageRenderTime_t5r(timeTaken);	

		if(this.state.consoleLogsOn) console.log("Time to re-render after scroll: " + (timeTaken).toFixed(2) + "ms");
	},
	_scrollToTop: function(e) {
		document.getElementById("body").scrollTop = 0;

		this.setState({
			scrollPos: 0,
			startingPos: 0
		});
	},
	_turnConsoleLogsOn: function(e) {
		this.setState({
			consoleLogsOn: !this.state.consoleLogsOn
		});
	},
	_getAverageRenderTime: function(e) {
		console.log("Average re-render time after scroll: " + (avgRenderTime).toFixed(2) + "ms");
	}
});

var ScrollItem = React.createClass({
	PropTypes: {
		name: React.PropTypes.string.isRequired,
		offset: React.PropTypes.number.isRequired
	},
	render: function() {


		return (
			<ListGroupItem style={{top: this.props.offset + "px", position: "relative"}}>
				<span>{this.props.name}</span>
			</ListGroupItem>
		);
	}
});

function updateList_t5r() {
	ReactDOM.render(<ScrollList data={json} rowHeight={42} />, document.getElementById("content"));
}

function getCurrentTime_t5r() {
	return window.performance.now();
}

function updateAverageRenderTime_t5r(time) {
	var totalTime = avgRenderTime * numRenders + time;

	numRenders++;
	avgRenderTime = totalTime / numRenders;
}