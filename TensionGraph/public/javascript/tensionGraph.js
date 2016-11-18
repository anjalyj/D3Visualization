var points = [{x:0, y:5},{x:1, y:9},{x:2, y:7},{x:3, y:5},{x:4, y:3},{x:6, y:4},{x:7, y:2},{x:8, y:3},{x:9, y:2}];

var sinePoints = [0,1,2,3,4,5,6,7,8,9];

const WIDTH = 900;
const HEIGHT = 800;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var svg, xScale, yScale;

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var loadChart = function(tension){
	svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);

	xScale = d3.scaleLinear()
		.domain([0, 10])
		.range([0, INNER_WIDTH]);

	yScale = d3.scaleLinear()
		.domain([0, 1])
		.range([INNER_HEIGHT, 0]);

	var xAxis = d3.axisBottom(xScale);
	var yAxis = d3.axisLeft(yScale);

	svg.append('g')
		.attr('transform', translate(MARGIN, HEIGHT - MARGIN))
		.call(xAxis)
		.classed('xAxis', true);

	svg.append('g')
		.attr('transform', translate(MARGIN, MARGIN))
		.classed('yAxis', true)
		.call(yAxis);

	createSineGraph(tension);
}

var createSineGraph = function(tension){
	var sineTransform = svg.append('g')
		.attr('transform',  translate(MARGIN, MARGIN));

	var sinePath = sineTransform.append("path")
				.classed("line",true);

	var sineLine = d3.line()
			.x(function(d,i) { return xScale(i); })
			.y(function(d,i) { return yScale((Math.sin(3 * d)+1)/2); })
			.curve(d3.curveCardinal.tension(tension));

	sinePath.attr("d",sineLine(sinePoints))

	sineTransform.selectAll('circle').data(sinePoints)
		.enter().append('circle')
		.classed("circles",true)
		.attr('r', 8);

	var circles = sineTransform.selectAll('circle');
	
	circles.attr('cx', function(q,i){return xScale(i)})
		.attr('cy', function(q,i){return yScale((Math.sin(3 * q)+1)/2);});
		
}

var tensions = d3.scaleLinear()
     .domain([0, 4])
     .range([-2,1])

window.onload = function () {
 for (var i = 0; i < 5; i++) {
   loadChart(tensions(i));
 }
}

