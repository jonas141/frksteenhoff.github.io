
// Global variable
var test_data;

// Reading in data from CSV file
d3.csv("test_data.csv", function(data) { 
	if(error) {
		console.log(error);
	} else {
		console.log(test_data);

	test_data = data;

	// Doing something with data
	d3.select("#exercise").selectAll("div")
		.data(dataset)
		.enter()
		.append("div")
		.text(function(d) { return "I can count to " + d; })
		.style("color", "grey");
	}
});

