var height = 200;
            var width = 500;
            var barPadding = 1;

            var svg = d3.select("body")
                        .append("svg")
                        .attr({
                            width: width,
                            height: height
                        });

            var dataset = [];

            for (var i = 0; i < 20; i++) {
                dataset.push(Math.ceil(100 * Math.random()))
            }

            var bars = svg.selectAll("rect")
                             .data(dataset)
                             .enter()
                             .append("rect");

            bars.attr({
              x: function(d, i) {
                  return i * (width/dataset.length);
                },
              y: function(d) {
                  return height - d;
                },
              width: width / dataset.length - barPadding,
              height: function(d) {
                return d;
              },
              fill: function() {
                  return "#" + (Math.random()*0xFFFFFF<<0).toString(16);
              }
            });

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