//Svg variables
var height = 100;
var width = 600;
var barPadding = 1;

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
    dataset.push(Math.ceil(100 * Math.random()))
}

//Define scale
var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset.length))
                .rangeRoundBands([0, width], 0.05)

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
      return height - d;
    },
  width: xScale.rangeBand(),
  height: function(d) {
    return d;
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
      x: function(d, i) {
        return i * (width/dataset.length) + 5;
      },
      y: function(d) {
        return height - d + 15;
      },
      fill: "white",
      "font-size": "11px",
      "font-family": "sans-serif"
   });
