const WIDTH = 2000;
const HEIGHT =  120;
const SHAPEHEIGHT = 100;
var startPoint = 10
var space = 50;
var nextShapeStartPosition = startPoint;
var shapeContainer;

var loadShapes = function(){
	shapeContainer = d3.select(".container").append("svg")
         .attr("width", WIDTH)
         .attr("height", HEIGHT);
    createLine();
    createCircle();
    createRectangle();
    createTriangle();
}

var createLine = function(){
	shapeContainer.append("line")
		 .classed("line", true)
	     .attr("x1", nextShapeStartPosition)
	     .attr("y1", SHAPEHEIGHT + startPoint)
	     .attr("x2", nextShapeStartPosition + SHAPEHEIGHT)
	     .attr("y2", startPoint);

	nextShapeStartPosition += SHAPEHEIGHT+space;
}

var createCircle = function(){
	shapeContainer.append("circle")
		.classed("circle", true)
        .attr("cx", nextShapeStartPosition + 50)
        .attr("cy", 60)
        .attr("r", 50);
        
    nextShapeStartPosition += SHAPEHEIGHT+space;
}

var createRectangle = function(){
	shapeContainer.append("rect")
		.classed("rect", true)
        .attr("x", nextShapeStartPosition)
        .attr("y", 10)
        .attr("width", 100)
        .attr("height", 100);

    nextShapeStartPosition += SHAPEHEIGHT+space;
}

var createTriangle = function(){
	shapeContainer.append("polygon")
		.classed("triangle", true)
		.attr("points"," 450,110 550,110 500,10");

    nextShapeStartPosition += SHAPEHEIGHT+space;

}
window.onload =  loadShapes;
