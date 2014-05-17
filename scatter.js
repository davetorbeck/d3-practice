//Dynamic, random dataset
var dataset = [];
var numDataPoints = 25;
var xRange = Math.random() * 1000;
var yRange = Math.random() * 1000;
for (var i = 0; i < numDataPoints; i++) {
  var newNumber1 = Math.floor(Math.random() * xRange);
  var newNumber2 = Math.floor(Math.random() * yRange);
  dataset.push([newNumber1, newNumber2]);
}

//svg variables
var width = 600;
var height = 200;
var padding = 30;

//Define scale for X coordinates
var xScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[0]; })])
                     .range([padding, width - padding * 2]);

//Define scale for Y coordinates
var yScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[1]; })])
                     .range([height - padding, padding]);

//Define scale for point radii
var rScale = d3.scale.linear()
                     .domain([0, d3.max(dataset, function(d) { return d[1];})])
                     .range([2, 5]);

//Create svg element
var svg = d3.select("body")
            .append("svg")
            .attr({
              "width": width,
              "height": height
            });

//Define X axis
var xAxis = d3.svg.axis()
              .scale(xScale)
              .orient("bottom")
              .ticks(5);

//Define Y axis
var yAxis = d3.svg.axis()
              .scale(yScale)
              .orient("left")
              .ticks(5);

//Create X axis
svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(0," + (height - padding) + ")")
   .call(xAxis);

//Create Y axis
svg.append("g")
   .attr("class", "axis")
   .attr("transform", "translate(" + padding + ",0)")
   .call(yAxis);

//Create data points
var circles = svg.selectAll("circle")
                 .data(dataset)
                 .enter()
                 .append("circle")
                 .attr({
                  "cx": function(d) { return xScale(d[0]); },
                  "cy": function(d) { return yScale(d[1]); },
                  "r": function(d) { return rScale(d[1]); },
                  "fill": "#00005C"
                 });



