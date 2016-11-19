var data = [1, 1, 2, 2, 1, 2, 1];

const WIDTH = 800;
const HEIGHT = 800;
var radius = Math.min(WIDTH, HEIGHT) / 2;

var translate = function(x, y){
	return "translate("+x+","+y+")";
};


var loadChart = function(){
	svg = d3.select('.container').append('svg')
		.attr('width', WIDTH)
		.attr('height', HEIGHT)
		.append('g')
    	.attr("transform", translate(0, HEIGHT/2));

    var arc = d3.arc()
	    .outerRadius(radius)
	    .innerRadius(radius/2)

	var pie = d3.pie()
    	.sort(null)
    	.startAngle(0)
    	.endAngle(Math.PI)
    	.value(function(d) { return d });

    var g = svg.selectAll("g")
	   .data(pie(data))
	   .enter().append("g");

	var color = d3.schemeCategory20;

	g.append("path")
	    .attr("d", arc)
	    .style("fill", function(d,i) { return color[i]; });

}

window.onload = loadChart;