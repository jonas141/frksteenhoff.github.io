// Visualizing geo data
	// Width and height
	var w = 600;
	var h = 300;

      // Global variables for data
      var datapoints_k2;
      var datapoints_k3;
      var datapoints_k4;
      var datapoints_k5;
      var datapoints_k6;
      var centroids_k2;
      var centroids_k3;
      var centroids_k4;
      var centroids_k5;
      var centroids_k6;

      // Projection variable
      var projection = d3.geo.mercator()
                             .center([-122.433701, 37.767683])
                             .translate([w/2, h/2])
                             .scale([100000]);

      // Path variable
      var path = d3.geo.path()
                       .projection(projection);

      //Create SVG element
		var svg = d3.select("#geo_data")
					.append("svg")
					.attr("width", w)
					.attr("height", h);

      // Loading geodata
      d3.json("sfpddistricts.json", function(json) {
        svg.selectAll("path")
           .data(json.features)
           .enter()
           .append("path")
           .attr("d", path)
           .style("fill", "steelblue");
       });

      // Loading crime data
      d3.json("model_data.json", function(data) {
        	// storing data
      		datapoints_k2 = data.datapoints.k2;
        	datapoints_k3 = data.datapoints.k3;
        	datapoints_k4 = data.datapoints.k4;
        	datapoints_k5 = data.datapoints.k5;
        	datapoints_k6 = data.datapoints.k6;
        	centroids_k2  = data.centroids.k2;
        	centroids_k3  = data.centroids.k3;
        	centroids_k4  = data.centroids.k4;
        	centroids_k5  = data.centroids.k5;
        	centroids_k6  = data.centroids.k6;

        // Drawing data
        svg.selectAll("k2data")
           .data(datapoints_k2)
           .enter()
           .append("circle")
           .attr("class", "data points")
           .attr("cx", function(d) {
                   return projection([d.lon, d.lat])[0];
           })
           .attr("cy", function(d) {
                   return projection([d.lon, d.lat])[1];
           })
           .attr("r", 2)
           .style("fill", function(d) {
                  if (d.Cluster == 1) {
                    return "Yellow";
                  } else {
                    return "Red";
                  }
           })
           .style("opacity", 0.6);

           // Drawing data
           svg.selectAll("k2centroids")
              .data(centroids_k2)
              .enter()
              .append("circle")
              .attr("class", "centroids")
              .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
              })
              .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
              })
              .attr("r", 5)
              .style("fill", "none")
              .style("stroke", "black")
              .style("stroke-width","2")
              .style("opacity", 1);

/*            // Change data on click
            d3.select("p2")
            	.on("click", function()) {
					this.id
            	}*/
      });
