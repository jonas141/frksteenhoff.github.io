			//Width and height
			var w = 500;
			var h = 600;
			var max_all = 0;
			var bar_dataset;
			var titleTxt = "Accidents per borough, NYC, ";
			var borough = ["BRONX", "BROOKLYN", "MANHATTAN", "QUEENS", "STATEN ISLAND", "Unspecified"];
			var years_of_interest = [2013, 2014, 2015, 2016];
			var year = 2013;
			var numOfBoroughs, boroughNames, boroughValues;

			d3.json("year_data.json", function(data) {
  				bar_dataset = data;

  			/* Find largest values within all years */
  			for (var i = 0; i < years_of_interest.length; i++) {
  				max_y = d3.max(Object.values(bar_dataset[years_of_interest[i]]));
  				if(max_y > max_all) {
  					max_all = max_y;
  				}
  			}
  			/* Variables needed in script */
  			numOfBoroughs = Object.keys(bar_dataset[year]).length;
  			boroughNames  = Object.keys(bar_dataset[year]); 
  			boroughValues = Object.values(bar_dataset[year]);
  			var padding   = 70;


  			/* Setting script values for bar chart */
			var xScale_bar = d3.scale.ordinal()
							.domain(d3.range(numOfBoroughs))
							.rangeRoundBands([0, w], 0.075);

			var yScale_bar = d3.scale.linear()
							.domain([0, max_all])
							.range([0, h]);

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
						.attr("width", w)
						.attr("height", h);
			
			//Create bars
			svg.selectAll("rect")
			   .data(boroughValues)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale_bar(i);
			   })
			   .attr("width", xScale_bar.rangeBand())
			   .attr("y", function(d) {
			   		return h - yScale_bar(d);
			   })
			   .attr("height", function(d) {
			   		return yScale_bar(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0," + (d * 10) + ")";
			   });

			//Create X axis
			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + (h/1.01) + ")")
				.call(xAxis);
			
			//Create Y axis
			svg.append("g")
				.attr("class", "y axis")
				.attr("transform", "translate(" + padding/7 + ",0)")
				.call(yAxis);

		   	// Add plot title
 		    svg.append("text")
				.attr("class", "xy axis")
            	.attr("transform", "translate("+ (w / 3) +","+ (padding/6) +")")
            	.text(titleTxt + year)
            	.style("font-size", "16px");

			   /* Decide what happens on click event */
			   d3.select("p2")
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

					// Update scale domain
					yScale_bar.domain([0, max_all]);

					// Update rects
					svg.selectAll("rect")
					.data(boroughValues)
					.transition()
					.delay(function(d, i) {
					       return i / numOfBoroughs * 1000;
					})    
					// not a good use here, can add function
					.duration(500)
					//.ease("linear") // not as pretty as "cubic-in-out"
					//.ease("bounce") // fun but childish
					.ease("elastic")  // one of the better options
					.attr("y", function(d){
					    return h - yScale_bar(d);
					})
					.attr("height", function(d) {
					    return yScale_bar(d);
					})
					.attr("fill", function(d) {
					    return "rgb(0, 0, " + (d * 10) + ")";
			   		});
	
					// Update all labels
					svg.selectAll("text")
					   .data(boroughNames)
					   .transition()
					   .delay(function(d, i) {
				   	      return i / numOfBoroughs * 1000;
					   })
					   .duration(500)
					   .text(function(d) {
				   	      return d;
					   })
					   .attr("x", function(d, i) {
	  			   	      return xScale_bar(i) + xScale_bar.rangeBand() / 2;
					   })
			   		   .attr("y", function(d) {
			   		   	  return h - yScale_bar(d) + 14;
			   		   })
			   		//Update title
					svg.select(".xy.axis")
			    		.transition()
			    		.duration(1000)
	   	            	.attr("transform", "translate("+ (w / 3) +","+ (padding/2) +")")
    		        	.text(titleTxt + year)
    		        	.style("font-size", "16px"); 	
			   	});
			});


