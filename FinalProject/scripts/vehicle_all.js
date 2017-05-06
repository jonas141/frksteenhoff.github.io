//Width and height
var max_all = 0,
    vehicle_data,
    vehicle = [],
    vehicle_values = [];
/* Margin and padding */
var margin = {top: 20, right: 50, bottom: 200, left: 50},
w          = 960 - margin.left - margin.right,
h          = 500 - margin.top - margin.bottom;

d3.json("primary_vehicle.json", function(data) {
		vehicle_data = data;

	/* Create array of causes and values */
	for (var i = 0; i < vehicle_data.length; i++){
		if(vehicle_data[i][0] != "UNKNOWN" && vehicle_data[i][0] != "OTHER"){
			vehicle.push(vehicle_data[i][0]);
			vehicle_values.push(parseInt(vehicle_data[i][1]));
			// For testing
			//console.log(vehicle_data[i][0]);
			//console.log(vehicle_data[i][1]);
		}
	}

/* Variables needed in script */
var maxAccidents = d3.max(vehicle_values);

/* Setting script values for bar chart */
var xScale = d3.scale.ordinal()
				.domain(vehicle)
				.rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
				.domain([0, maxAccidents])
				.range([h, 0]);

//Define X axis
var xAxis = d3.svg.axis()
			  .scale(xScale)
			  .orient("bottom");

//Define Y axis
var yAxis = d3.svg.axis()
			  .scale(yScale)
			  .orient("left");

// Define the div for the tooltip
var div = d3.select("rect")	
    .attr("a", "data-tooltip")				
    .style("opacity", 0);

//Create SVG element
var svg = d3.select("#primary_vehicle")
			.append("svg")
			.attr("width", w + margin.left + margin.right)
			.attr("height", h + margin.top + margin.bottom)
			.append("g")
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");

//Create bars
svg.selectAll("rect")
   .data(vehicle)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
   		return xScale(d);
   })
   .attr("width", xScale.rangeBand())
   .attr("fill", "darkgreen");
   
// Set bar height
svg.selectAll("rect")
 	.data(vehicle_values)
 	.attr("y", function(d) {
   		return yScale(d);
   })
   .attr("height", function(d) {
   		return h - yScale(d); /* number of accidents */
   })

   .on("mouseover", function(d) {
		//Get this bar's x/y values, then augment for the tooltip
		var xPosition = parseFloat(d3.select(this).attr("x"));
		var yPosition = parseFloat(d3.select(this).attr("y")) - 5;
		//Create the tooltip label
		d3.select(this)
			.attr("fill", "orange")
		svg.append("text")
		   .attr("id", "tooltip")
		   .attr("x", xPosition)
		   .attr("y", yPosition)
		   .attr("font-family", "sans-serif")
		   .attr("font-size", "11px")
		   .attr("font-weight", "bold")
		   .attr("fill", "black")
		   .attr("background", "rgba(255,255,255,0.5)")
		   .text("Accidents: " + d3.format(",.0")(d));
   })
   .on("mouseout", function(d) {
   		d3.select(this)
    		.attr("fill", "darkgreen");
		//Remove the tooltip
		d3.select("#tooltip").remove();
	})

//Create X axis
svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + h + ")")
	.call(xAxis)
	.selectAll("text")
	.style("text-anchor", "end")
		.attr("dx", "-1.0em")
		.attr("dy", "-.55em")
		.attr("transform", "rotate(-90)" ); /* Setting x axis position, vertical */

//Create Y axis
svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);
});


