			//Width and height
			var w = 500;
			var h = 600;
			var max_all = 0;
			var vehicle_data;
			var year = 2013;
			var titleText = "Primary vehicle in accident, ";
			var vehicle = [];
			var vehicle_values = [];

			d3.json("primary_vehicle.json", function(data) {
  				vehicle_data = data;


  			/* Create array of causes and values */
  			for (var i = 0; i < vehicle_data.length; i++){
  				vehicle.push(vehicle_data[i][0]);
  				vehicle_values.push(parseInt(vehicle_data[i][1]))
  			}

  			/* Variables needed in script */
  			var padding      = 70;
  			var maxAccidents = d3.max(vehicle_values);


  			/* Setting script values for bar chart */
			var xScale_bar = d3.scale.ordinal()
							.domain(d3.range(vehicle.length))
							.rangeRoundBands([0, w], 0.075);

			var yScale_bar = d3.scale.linear()
							.domain([0, maxAccidents])
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
			var svg = d3.select("#primary_vehicle")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
			
			//Create bars
			svg.selectAll("rect")
			   .data(vehicle_values)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return xScale_bar(i);
			   })
			   .attr("y", function(d) {
			   		return h - yScale_bar(d);
			   })
			   .attr("width", xScale_bar.rangeBand())
			   .attr("height", function(d) {
			   		return yScale_bar(d);
			   })
			   .attr("fill", function(d) {
					return "rgb(0, 0," + (d * 10) + ")";
			   });
			
			//Create labels
			svg.selectAll("text")
			   .data(vehicle)
			   .enter()
			   .append("text")
			   .text(function(d) {
			   		return d;
			   })
			   .attr("text-anchor", "middle")
			   .attr("x", function(d, i) {
			   		return xScale_bar(i) + xScale_bar.rangeBand() / 2;
			   })
			   .attr("y", function(d) {
			   		return h - yScale_bar(d) + 14;
			   })
			   .attr("font-family", "sans-serif")
			   .attr("font-size", "11px")
			   .attr("fill", "black");

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
            	.text(titleText + year)
            	.style("font-size", "16px");

			});


