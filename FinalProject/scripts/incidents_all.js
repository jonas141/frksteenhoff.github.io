// Global variables
var max_all = 0,  // all time max num of accidents
    titleTxt = "Accidents per borough, NYC, ",
    borough = ["BRONX", "BROOKLYN", "MANHATTAN", "QUEENS", "STATEN ISLAND"],
    years_of_interest = [2013, 2014, 2015, 2016],
    year = 2013, // First year to visualize
    /* Margin and padding */
    margin = {top: 20, right: 50, bottom: 200, left: 50},
    w      = 960 - margin.left - margin.right,
    h      = 500 - margin.top - margin.bottom;
var bar_dataset;  // Initializing dataset
var numOfBoroughs, boroughNames, boroughValues;

// Reading in json data - accidents per year per borough
d3.json("data/year_data.json", function(data) {
		bar_dataset = data;

	/* Find largest values within all years */
	for (var i = 0; i < years_of_interest.length; i++) {
		max_y = d3.max(Object.values(bar_dataset[years_of_interest[i]]));
		console.log(max_y);
		if(max_y > max_all) {
			max_all = max_y;
		}
	}
	/* Variables needed in subsequent part of script */
	numOfBoroughs = Object.keys(bar_dataset[year]).length;
	boroughNames  = Object.keys(bar_dataset[year]); 
	boroughValues = Object.values(bar_dataset[year]);

/* Setting script values for bar chart */
var xScale_bar = d3.scale.ordinal()
				.domain(boroughNames)
				.rangeRoundBands([0, w], 0.05);

var yScale_bar = d3.scale.linear()
				.domain([0, max_all])
				.range([h, 0]);

//Define X axis
var xAxis = d3.svg.axis()
			  .scale(xScale_bar)
			  .orient("bottom")
			  .ticks(6);

//Define Y axis
var yAxis = d3.svg.axis()
			  .scale(yScale_bar)
			  .orient("left")
			  .ticks(6);

//Create SVG element
var svg = d3.select("#incidents_all")
			.append("svg")
			.attr("width", w + margin.left + margin.right)
			.attr("height", h + margin.top + margin.bottom)
			.append("g")
			.attr("transform",
				  "translate(" + margin.left + "," + margin.top + ")");

//Create bars
svg.selectAll("rect")
   .data(boroughNames)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
   		return xScale_bar(d);
   })
   .attr("width", xScale_bar.rangeBand())
   .attr("fill", "darkgreen")
	.on("mouseover", function() {
    	d3.select(this)
    		.attr("fill", "orange");
	})
	.on("mouseout", function(d, i) {
    	d3.select(this)
    		.attr("fill", "darkgreen");
	});

// Set bar height
svg.selectAll("rect")
 	.data(boroughValues)
 	.attr("y", function(d) {
   		return yScale_bar(d);
   })
   .attr("height", function(d) {
   		return h - yScale_bar(d); /* number of accidents */
   })
   .append("title")
   .text(function(d) {
   		return "Number of accidents: " + d3.format(",.0")(d);
   	});

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

// Add plot title
svg.append("text")
	.attr("class", "xy axis")
	.attr("transform", "translate("+ (w / 3) +","+ (margin.left-55) +")")
	.text(titleTxt + year)
	.style("font-size", "16px");

/* Decide what happens on click event */
d3.select("#year_toggle")
	.on("click", function() {
	// new bar_dataset values - meant to loop through values 2013 - 2016
	if (year < 2016) {
		year += 1;
	}
	else {
		year = 2013;
	}

	/* Updating borough values*/
	/* Number of boroughs and the borough names will stay the same */
	boroughValues = Object.values(bar_dataset[year]);

	// Update all labels
	svg.selectAll("rect")
	   .data(boroughValues)
	   .transition()
	   .delay(function(d, i) {
   	       return i / numOfBoroughs * 1000;
	   })
	   .duration(500)
	   .attr("y", function(d) {
		   return yScale_bar(d);
	   })
   	   .attr("height", function(d) {
   		   return h - yScale_bar(d); /* number of accidents */
   });

	//Update title
	svg.select(".xy.axis")
		.transition()
		.duration(1000)
        	.attr("transform", "translate("+ (w / 3) +","+ (margin.left-55) +")")
    	.text(titleTxt + year)
    	.style("font-size", "16px"); 	
   	});
});


