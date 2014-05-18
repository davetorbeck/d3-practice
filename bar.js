//Svg variables
var height = 250;
var width = 600;
var barPadding = 1;
var maxValue = 90;

//Create svg
var svg = d3.select("body")
            .append("svg")
            .attr({
                width: width,
                height: height
            });

//Random data
var dataset = [];

for (var i = 0; i < 20; i++) {
    dataset.push(Math.ceil(maxValue * Math.random()))
}

//Define scale
var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset.length))
                .rangeRoundBands([0, width], 0.05)

var yScale = d3.scale.linear()
               .domain([0, d3.max(dataset)])
               .range([0, height]);

//Create bars
var bars = svg.selectAll("rect")
                 .data(dataset)
                 .enter()
                 .append("rect");

bars.attr({
  x: function(d, i) {
      return xScale(i);
    },
  y: function(d) {
      return height - yScale(d);
    },
  width: xScale.rangeBand(),
  height: function(d) {
    return yScale(d);
  },
  fill: function() {
      return "#" + (Math.random()*0xFFFFFF<<0).toString(16);
  }
});

//Append data as text to bars
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
      return d;
   })
   .attr({
      "text-anchor": "middle",
      x: function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      },
      y: function(d) {
        return height - yScale(d) + 14;
      },
      fill: "white",
      "font-size": "11px",
      "font-family": "sans-serif"
   });


d3.select("button")
  .on("click", function() {
    //New values for dataset
    var numValues = dataset.length;                    //Count original length of dataset
    dataset = [];                                      //Initialize empty array
    for (var i = 0; i < numValues; i++) {              //Loop numValues times
      var newNumber = Math.ceil(maxValue * Math.random());   //New random integer (0-99)
      dataset.push(newNumber);                         //Add new number to array
    }

    //Update all rects
    svg.selectAll("rect")
       .data(dataset)
       .transition()
       .delay(function(d, i) { return i / dataset.length * 1000; })
       .duration(1200)
       .attr({
        "y": function(d) { return height - yScale(d); },
        "height": function(d) { return yScale(d); },
        "fill": function(d) { return "#" + (Math.random()*0xFFFFFF<<0).toString(16); }
       });

    //Update text
    svg.selectAll("text")
       .data(dataset)
       .transition()
       .duration(500)
       .delay(function(d, i) { return i / dataset.length * 1000; })
       .text(function(d) { return d; })
       .attr({
        "x": function(d, i) { return xScale(i) + xScale.rangeBand() / 2; },
        "y": function(d) { return height - yScale(d) + 14; }
       });

    //Update scale
    yScale.domain([0, d3.max(dataset)]);
  });
