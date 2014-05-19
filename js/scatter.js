//Dynamic, random dataset
var dataset = [];
var numDataPoints = 100;
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

//Define clipping path
svg.append("clipPath")
   .attr("id", "chart-area")
   .append("rect")
   .attr("x", padding)
   .attr("y", padding)
   .attr("width", width - padding * 3)
   .attr("height", height - padding * 2);

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
   .attr("class", "x axis")
   .attr("transform", "translate(0," + (height - padding) + ")")
   .call(xAxis);

//Create Y axis
svg.append("g")
   .attr("class", "y axis")
   .attr("transform", "translate(" + padding + ",0)")
   .call(yAxis);

//Create data points
var circles = svg.append("g")
                 .attr("id", "circles")
                 .attr("clip-path", "url(#chart-area)")
                 .selectAll("circle")
                 .data(dataset)
                 .enter()
                 .append("circle")
                 .attr({
                  "cx": function(d) { return xScale(d[0]); },
                  "cy": function(d) { return yScale(d[1]); },
                  "r": function(d) { return rScale(d[1]); }
                 })
                 .attr("fill", function(d) { return "#" + (Math.random()*0xFFFFFF<<0).toString(16)})

//On click, update with new data
d3.select("button")
  .on("click", function() {
    //New values for dataset
    var numValues = dataset.length;
    var maxRange = Math.random() * 1000;
    dataset = [];
    for (var i = 0; i < numValues; i++) {
      var newNumber1 = Math.floor(Math.random() * maxRange);
      var newNumber2 = Math.floor(Math.random() * maxRange);
      dataset.push([newNumber1, newNumber2]);
    }

    //Update scale domains
    xScale.domain([0, d3.max(dataset, function(d) { return d[0]; })]);
    yScale.domain([0, d3.max(dataset, function(d) { return d[1]; })]);

    //Update all circles
    svg.selectAll("circle")
       .data(dataset)
       .transition()
       .duration(1000)
       .each("start", function() {
          d3.select(this)
            .attr("fill", "magenta")
            .attr("r", 3);
       })
       .attr({
        "cx": function(d) { return xScale(d[0]); },
        "cy": function(d) { return yScale(d[1]); }
        })
       .transition()
       .duration(1000)
       .attr("fill", function(d) {
          return "#" + (Math.random()*0xFFFFFF<<0).toString(16);
        })
       .attr("r", 2);

    //Update x-axis
    svg.select(".x.axis")
       .transition()
       .duration(1000)
       .call(xAxis);

    //Update y-axis
    svg.select(".y.axis")
       .transition()
       .duration(1000)
       .call(yAxis);
  });

