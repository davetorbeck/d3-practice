//Svg dimensions
var width = 300;
var height = 300;

//Data
var dataset = [5, 10, 20, 45, 6, 25];

var color = d3.scale.category20b();

var outerRadius = width / 2;
var innerRadius = 0;
var arc = d3.svg.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius);

var pie = d3.layout.pie();

//Create svg element
var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

//Set up groups
var arcs = svg.selectAll("g.arc")
              .data(pie(dataset))
              .enter()
              .append("g")
              .attr("class", "arc")
              .attr("transform", "translate(" + outerRadius + ", " + outerRadius + ")");

//Draw arc paths
arcs.append("path")
    .attr("fill", function(d, i) {
     return color(i);
    })
    .attr("d", arc);

arcs.append("text")
    .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .text(function(d) {
      return d.value;
    })
    .style("fill", "white");
