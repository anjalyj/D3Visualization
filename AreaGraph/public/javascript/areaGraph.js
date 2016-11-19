var sinePoints = [0,1,2,3,4,5,6,7,8,9,10];

const WIDTH = 800;
const HEIGHT = 800;
const MARGIN = 30;

const INNER_WIDTH = WIDTH - 2 * MARGIN;
const INNER_HEIGHT = HEIGHT - 2 * MARGIN;

var svg, xScale, yScale;

var translate = function(x, y){
	return "translate("+x+","+y+")";
};

var loadChart = function(){
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

	createAreaGraph();
}

var createAreaGraph = function(){
	var areaTransform = svg.append('g')
		.attr('transform',  translate(MARGIN, -MARGIN));

	var areaPath = areaTransform.append("path")
				.classed("area",true);

	var area = d3.area()
			.x(function(d,i) { return xScale(i/10); })
			.y1(function(d,i) { return yScale(((3*Math.sin(d))+5)/10); })
			.y0(HEIGHT);

	areaPath.attr("d",area(sinePoints))

	var lineTransform = svg.append('g')
		.attr('transform',  translate(MARGIN, -MARGIN));

	var linePath = lineTransform.append("path")
				.classed("line",true);

	line = d3.line()
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

window.onload = loadChart; 