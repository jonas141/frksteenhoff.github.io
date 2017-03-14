// Creating a scatterplot
var wi = 400;
var he = 120;

var dataset = [ [5, 20], [480, 90], [250, 50], [100, 33], [330, 95],
				[410, 12], [475, 44], [25, 67], [85, 21], [220, 88]
			  ];

var svg = d3.select("#scatter_circle")
			.append("svg")
			.attr({
				"width": wi,
				"height": he,
			});
// From basic SVG element properties, create circles
	var scatter = svg.selectAll("circle")
				 .data(dataset)
				 .enter()
				 .append("circle");
	scatter.attr("cx", function(d){
					return d[0];
			})
			.attr("cy", function(d) {
					return d[1]
			})
			.attr("r", 4);