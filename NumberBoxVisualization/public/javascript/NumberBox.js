var data = [0,1,2,3,4,5,6,7,8,9,10];

var width_scale = d3.scaleLinear().domain([0,10]).range([12,120]);
var height_scale = d3.scaleLinear().domain([0,10]).range([30,180]);

// var loadChart =  function(){
	var NumbersDiv = d3.select(".container")
		.selectAll("div")
		.data(data);
		

	NumbersDiv.enter().append("div")
		.text(function(d){ return d; })
		.classed("number",true)
		.style("font",function(d){ return 'italic bold '+width_scale(d)+'px/'+height_scale(d)+'px Georgia'});
// }

// window.onload = function(){
// 	loadChart();
// }