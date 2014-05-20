//Svg variables
var height = 250;
var width = 600;
var barPadding = 1;

//key function
var key = function(d) {
  return d.key;
}

//Create svg
var svg = d3.select("body")
            .append("svg")
            .attr({
                width: width,
                height: height
            });

//Random data
var dataset = [ { key: 0, value: 5},
                { key: 1, value: 10 },
                { key: 2, value: 13 },
                { key: 3, value: 19 },
                { key: 4, value: 21 },
                { key: 5, value: 25 },
                { key: 6, value: 22 },
                { key: 7, value: 18 },
                { key: 8, value: 15 },
                { key: 9, value: 13 },
                { key: 10, value: 11 },
                { key: 11, value: 12 },
                { key: 12, value: 15 },
                { key: 13, value: 20 },
                { key: 14, value: 18 },
                { key: 15, value: 17 },
                { key: 16, value: 16 },
                { key: 17, value: 18 },
                { key: 18, value: 23 },
                { key: 19, value: 25 } ];

//Define scale
var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset.length))
                .rangeRoundBands([0, width], 0.05)

var yScale = d3.scale.linear()
               .domain([0, d3.max(dataset, function(d) { return d.value; })])
               .range([0, height]);

//Create bars
var bars = svg.selectAll("rect")
                 .data(dataset, key)
                 .enter()
                 .append("rect");

bars.attr({
  x: function(d, i) {
      return xScale(i);
    },
  y: function(d) {
      return height - yScale(d.value);
    },
  width: xScale.rangeBand(),
  height: function(d) {
    return yScale(d.value);
  },
  fill: function(d) {
      return "rgb(0,0, " + (d.value * 10) + ")";
  }
});

//Append data as text to bars
svg.selectAll("text")
   .data(dataset, key)
   .enter()
   .append("text")
   .text(function(d) {
      return d.value;
   })
   .attr({
      "text-anchor": "middle",
      x: function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
      },
      y: function(d) {
        return height - yScale(d.value) + 14;
      },
      fill: "white",
      "font-size": "11px",
      "font-family": "sans-serif"
   });



//On click, update with new data
d3.selectAll("button")
  .on("click", function() {
    var paragraphID = d3.select(this).attr("id");

    if (paragraphID !== "sort") {
      if (paragraphID === "add") {
        var maxValue = 60;
        var newNumber = Math.floor(Math.random() * maxValue);
        var lastKeyValue = dataset[dataset.length - 1].key;
        dataset.push({
          key: lastKeyValue + 1,
          value: newNumber
        });

      } else {
        dataset.shift();
      }

      //Update scale
      yScale.domain([0, d3.max(dataset, function(d) { return d.value; })]);
      xScale.domain(d3.range(dataset.length));

      bars = svg.selectAll("rect")
                .data(dataset, key);

      bars.enter()
          .append("rect")
          .attr("x", width)
          .attr("y", function(d) {
            return height - yScale(d.value);
          })
          .attr("width", xScale.rangeBand())
          .attr("height", function(d) {
            return yScale(d.value);
          })
          .attr("fill", function(d) {
            return "rgb(0,0, " + (d.value * 10) + ")";
          });

      //Update all rects
      bars.transition()
          .duration(500)
          .attr({
           "x": function(d, i) { return xScale(i); },
           "y": function(d) { return height - yScale(d.value); },
           "height": function(d) { return yScale(d.value); },
           "width": xScale.rangeBand()
          });


      //Exit...
      bars.exit()
          .transition()
          .duration(500)
          .attr("x", -xScale.rangeBand())
          .remove();

      //Update text
      var labels = svg.selectAll("text")
                    .data(dataset, key)


      labels.enter()
          .append("text")
          .text(function(d) {
            return d.value;
         })
         .attr({
            "text-anchor": "middle",
            x: function(d, i) {
              return xScale(i) + xScale.rangeBand() / 2;
            },
            y: function(d) {
              return height - yScale(d.value) + 14;
            },
            fill: "white",
            "font-size": "11px",
            "font-family": "sans-serif"
         });

      labels.transition()
          .duration(500)
          .text(function(d) { return d.value; })
          .attr({
           "x": function(d, i) { return xScale(i) + xScale.rangeBand() / 2; },
           "y": function(d) { return height - yScale(d.value) + 14; }
          });

      labels.exit()
          .transition()
          .duration(500)
          .attr("x", -xScale.rangeBand())
          .remove();
        } else {

          svg.selectAll("rect")
             .sort(function(a, b) {
               return d3.ascending(a.value, b.value);
             })
             .transition()
             .duration(1000)
             .attr("x", function(d, i) {
                return xScale(i);
             });

          svg.selectAll("text")
             .sort(function(a, b) {
               return d3.ascending(a.value, b.value);
             })
             .transition()
             .duration(500)
             .text(function(d) { return d.value; })
             .attr({
               "x": function(d, i) { return xScale(i) + xScale.rangeBand() / 2; },
               "y": function(d) { return height - yScale(d.value) + 14; }
            });

        }


  });


