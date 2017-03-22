
			//Width and height
			var w = 600;
			var h = 250;
			
			var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
							11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

			var xScale_bar = d3.scale.ordinal()
							.domain(d3.range(dataset.length))
							.rangeRoundBands([0, w], 0.075);

			var yScale_bar = d3.scale.linear()
							.domain([0, d3.max(dataset)])
							.range([0, h]);
			
			//Create SVG element
			var svg = d3.select("#bars_scale")
						.append("svg")
						.attr("width", w)
						.attr("height", h);
			
			//Create bars
			svg.selectAll("rect")
			   .data(dataset)
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
					return "rgb(0, " + (d * 10) + ", 0)";
			   });
			
			//Create labels
			svg.selectAll("text")
			   .data(dataset)
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
			   .attr("fill", "white");

			   d3.select("p2")
					.on("click", function() {
	  									
					// new dataset values
					var numVal = dataset.length;
					var maxVal = 100;
					dataset    = [];
		
					for(var i = 0; i < numVal; i++) {
				       var newNum = Math.floor(Math.random() * maxVal);
				       dataset.push(newNum);
					}
					// Update scale domain
					yScale_bar.domain([0, d3.max(dataset)]);

					// Update rects
					svg.selectAll("rect")
					.data(dataset)
					.transition()
					.delay(function(d, i) {
					       return i / dataset.length * 1000;
					})    // not a good use here, can add function
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
					   .data(dataset)
					   .transition()
					   .delay(function(d, i) {
				   	      return i / dataset.length * 1000;
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
			   		   });
			   	});

