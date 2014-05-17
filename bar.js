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
    dataset = [11, 12, 15, 20, 18, 17, 16, 18, 23, 25,
                5, 10, 13, 19, 21, 25, 22, 18, 15, 13];

    //Update all rects
    svg.selectAll("rect")
       .data(dataset)
       .attr({
        "y": function(d) { return height - yScale(d); },
        "height": function(d) { return yScale(d); },
        "fill": function(d) { return "rgb(0, 0, " + (d * 10) +")"; }
       });

    //Update text
    svg.selectAll("text")
       .data(dataset)
       .text(function(d) { return d; })
       .attr({
        "x": function(d, i) { return xScale(i) + xScale.rangeBand() / 2; },
        "y": function(d) { return height - yScale(d) + 14; }
       });
  });
