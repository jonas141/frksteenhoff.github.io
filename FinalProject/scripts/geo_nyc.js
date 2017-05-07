var width  = 1200,
    height = 800,
    geo;

// set projection
var projection = d3.geo.mercator()
                       .center([-73.92, 40.72])
                       .translate([width/2, height/2])
                       .scale([75000]);

// create path variable
var path = d3.geo.path()
              .projection(projection);

// create svg variable
var svg = d3.select("#geo")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

d3.json("data/NYCshapefile.JSON", function(topo) {
    geo = topo.features;
    svg.selectAll("path")
        .data(geo)
        .enter()
        .append("path")
        .attr("class", "feature")
        .style("fill", "green")
        .attr("d", path);

});