var sinePoints = [0,1,2,3,4,5,6,7,8,9,10];

const WIDTH = 900;
const HEIGHT = 800;
const MARGIN = 50;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var svg, xScale, yScale;

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var loadChart = function(interpolationType){
	svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT);

	xScale = d3.scaleLinear()
		.domain([0, 1])
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

	createAreaGraph(interpolationType);
}

var createAreaGraph = function(interpolationType){
	var areaTransform = svg.append('g')
		.attr('transform',  translate(MARGIN, MARGIN));

	var areaPath = areaTransform.append("path")
				.classed("area",true);

	var area = d3.area()
			.curve(interpolationType)
			.x(function(d,i) { return xScale(i/10); })
			.y1(function(d,i) { return yScale(((3*Math.sin(i))+5)/10); })
			.y0(INNER_HEIGHT);


	areaPath.attr("d",area(sinePoints))

	var lineTransform = svg.append('g')
		.attr('transform',  translate(MARGIN, MARGIN));

	var linePath = lineTransform.append("path")
				.classed("line",true);

	line = d3.line()
			.curve(interpolationType)
			.x(function(d,i) { return xScale(i/10); })
			.y(function(d) { return yScale(((3*Math.sin(d))+5)/10); })

	linePath.attr("d",line(sinePoints))

	lineTransform.selectAll('circle').data(sinePoints)
		.enter().append('circle')
		.classed("circles",true)
		.attr('r', 8);

	var circles = lineTransform.selectAll('circle');
	
	circles.attr('cx', function(q,i){return xScale(i/10)})
		.attr('cy', function(q,i){return yScale(((3*Math.sin(q))+5)/10);});
}

window.onload = function(){
	loadChart(d3.curveLinearClosed)
	loadChart(d3.curveStepAfter)
	loadChart(d3.curveCardinalOpen)
	loadChart(d3.curveCardinalClosed)
	loadChart(d3.curveBundle.beta(1))
}; 