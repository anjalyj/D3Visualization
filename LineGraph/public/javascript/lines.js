var points = [{x:0, y:5},{x:1, y:9},{x:2, y:7},{x:3, y:5},{x:4, y:3},{x:6, y:4},{x:7, y:2},{x:8, y:3},{x:9, y:2}];

var sinePoints = [];
for(i=0; i<10; i++){
	sinePoints.push(Math.sin(i));
}

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

	createLineGraph();
	createSineGraph();
}

var createLineGraph = function(){
	var lineTransform = svg.append('g')
		.attr('transform',  translate(MARGIN, MARGIN));

	var linePath = lineTransform.append("path")
				.classed("line",true);

	line = d3.line()
			.x(function(d,i) { return xScale(d.x/10); })
			.y(function(d) { return yScale(d.y/10); })

	lineTransform.selectAll('circle').data(points)
		.enter().append('circle')
		.classed("circles",true)
		.attr('r', 8);

	var circles = lineTransform.selectAll('circle');
	
	circles.attr('cx', function(q){return xScale(q.x/10)})
		.attr('cy', function(q){return yScale(q.y/10)});

	linePath.attr("d", line(points)); 
}

var createSineGraph = function(){
	var sineTransform = svg.append('g')
		.attr('transform',  translate(MARGIN, MARGIN));

	var sinePath = sineTransform.append("path")
				.classed("line",true);

	var sineLine = d3.line()
			.x(function(d,i) { return xScale(i/10); })
			.y(function(d,i) { return yScale(d/10+0.5); })


	sineTransform.selectAll('circle').data(sinePoints)
		.enter().append('circle')
		.classed("circles",true)
		.attr('r', 8);

	sinePath.attr("d",sineLine(sinePoints))

	var circles = sineTransform.selectAll('circle');
	
	circles.attr('cx', function(q,i){return xScale(i/10)})
		.attr('cy', function(q,i){return yScale(q/10+0.5);});


}

window.onload = loadChart; 