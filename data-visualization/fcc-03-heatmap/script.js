const projectName = "Heat Map";
// coded by Sandrine MANGUY

// this project has been designed for desktop

const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

const colors = ['#d73027', '#f46d43', '#fdae61', '#fee090', '#ffffbf', '#e0f3f8', '#abd9e9', '#74add1', '#4575b4'].reverse();
// https://colorbrewer2.org/?type=diverging&scheme=RdYlBu&n=9
// from red to blue --> inverse to match low to high temperature



/* get data */
document.addEventListener('DOMContentLoaded', () => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.send();
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.responseText);
      console.log(data);
      const dataset = data.monthlyVariance;
      //console.log(dataset);

      const firstYear = d3.min(dataset, d => d.year);
      //console.log(firstYear);
      const lastYear = d3.max(dataset, d => d.year);
      //console.log(lastYear);

      // transform dataset.month number to month name
      const monthName = { "1": "January", "2": "February", "3": "March", "4": "April", "5": "May", "6": "June", "7": "July", "8": "August", "9": "September", "10": "October", "11": "November", "12": "December" };

      const baseTemperature = data.baseTemperature;
      //console.log(baseTemperature);
      const minVariance = d3.min(dataset, d => d.variance);
      const maxVariance = d3.max(dataset, d => d.variance);
      const minTemperature = Math.floor(minVariance * 1000 + baseTemperature * 1000) / 1000; // avoid float
      const maxTemperature = Math.floor(maxVariance * 1000 + baseTemperature * 1000) / 1000;
      //console.log(minTemperature);
      //console.log(maxTemperature);

      const temperatureStep = [1, 2.5, 4, 5.5, 7, 8.5, 10, 11.5, 13, 14.5];

      const temperatureColor = temperature => {
        if (temperature >= temperatureStep[0] && temperature <= temperatureStep[1]) {return colors[0];
        } else if (temperature >= temperatureStep[1] && temperature <= temperatureStep[2]) {return colors[1];
        } else if (temperature >= temperatureStep[2] && temperature <= temperatureStep[3]) {return colors[2];
        } else if (temperature >= temperatureStep[3] && temperature <= temperatureStep[4]) {return colors[3];
        } else if (temperature >= temperatureStep[4] && temperature <= temperatureStep[5]) {return colors[4];
        } else if (temperature >= temperatureStep[4] && temperature <= temperatureStep[6]) {return colors[5];
        } else if (temperature >= temperatureStep[6] && temperature <= temperatureStep[7]) {return colors[6];
        } else if (temperature >= temperatureStep[7] && temperature <= temperatureStep[8]) {return colors[7];
        } else if (temperature >= temperatureStep[8]) {return colors[8];}
      };

      /* project container */
      const container = d3.
      select("body").
      append("div").
      attr("id", "container").
      style("position", "relative");

      const graph = container.
      append("div").
      attr("id", "graph").
      style("position", "relative").
      style("box-shadow", "3px 3px 8px grey").
      style("padding-top", "5px");

      /* headings */
      const title = graph.
      append("h1").
      attr("id", "title").
      text("Monthly Global Land-Surface Temperature").
      style("text-anchor", "middle");

      const subtitle = graph.
      append("h2").
      attr("id", "description").
      html(
      firstYear + " - " + lastYear + ": base temperature " + data.baseTemperature + " ℃").
      style("text-anchor", "middle");

      /* Heat map */

      // tooltip - code copied from https://github.com/caged/d3-tip
      const tooltip = d3.
      select("#container").
      append("div").
      attr("id", "tooltip").
      attr("class", "tooltip").
      style("opacity", 0);


      // measurements
      const width = 1200; //svgWidth - padding * 2 - yLabelWidth;
      const padding = 40;
      const yLabelWidth = 80;
      const nbYears = lastYear - firstYear;
      const cellWidth = (width - padding * 2 - yLabelWidth) / nbYears;

      // padding top and bottom --> use padding
      const height = 600; // padding + cellsHeight + xLabelHeight + padding + legendHeight + padding
      const cellsHeight = 400;
      const cellHeight = cellsHeight / 12;
      const xLabelHeight = 30;
      const legendHeight = padding + cellHeight + xLabelHeight;

      // svg
      const svg = d3.
      select("#graph").
      append("svg").
      attr("width", width).
      attr("height", height).
      style("font-size", 12);


      // x Axis
      const xScale = d3.
      scaleTime().
      domain([firstYear, lastYear + 1]).
      range([padding + yLabelWidth, width - padding]);

      const xAxis = d3.axisBottom(xScale).
      tickFormat(d3.format('d'));

      svg.append("g").
      attr("id", "x-axis").
      attr("transform", "translate(0, " + (padding + cellsHeight) + ")").
      attr("role", "graphics-axis").
      attr("aria-orientation", "horizontal").
      attr("aria-datatype", "datetime").
      call(xAxis);

      svg.append("text").
      text("Years").
      attr("y", padding + cellsHeight + xLabelHeight).
      attr("x", width - padding).
      style("text-anchor", "end");

      // y Axis

      const yScale = d3.
      scaleBand().
      domain([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]).
      range([padding + cellsHeight, padding]);

      const yAxis = d3.axisLeft(yScale).
      tickFormat(d => d3.timeFormat('%B')(new Date(0).setMonth(d - 1)));

      svg.append("g").
      attr("id", "y-axis").
      attr("role", "graphics-axis").
      attr("aria-orientation", "vertical").
      attr("aria-datatype", "datatime").
      attr("transform", "translate(" + (padding + yLabelWidth) + ", " + 0 + ")").
      call(yAxis);

      svg.append("text").
      text("Months").
      attr("transform", "rotate(-90)")
      //.attr("x", (padding + cellsHeight)/2 )
      //.attr("y", padding)
      .attr("x", -padding) // negative measurement !
      .attr("y", padding).
      style("text-anchor", "end");

      // map
      const cells = svg.
      selectAll('rect').
      data(dataset).
      enter().
      append('rect').
      attr("data-year", d => d.year).
      attr("data-month", d => d.month - 1).
      attr("data-temp", d => baseTemperature + d.variance).
      attr('width', cellWidth).
      attr('height', cellHeight).
      attr('x', d => xScale(d.year))
      //.attr('y', (d) => padding + ((d.month - 1) * cellHeight))
      .attr('y', d => yScale(d.month)).
      attr("class", "cell").
      style("fill", d => temperatureColor(Math.floor(d.variance * 1000 + baseTemperature * 1000) / 1000))


      // tooltip show
      .on('mouseover', (event, d) => {
        const [x, y] = d3.pointer(event);
        const temperature = (Math.floor(d.variance * 1000 + baseTemperature * 1000) / 1000).toFixed(1);


        tooltip.
        transition().
        duration(200).
        style("opacity", 0.9);
        tooltip.
        attr("data-year", d.year).
        style("display", "block").
        html(
        d.year + "-" + monthName[d.month] + '<br/>' +
        "Temperature: " + temperature + '°C<br/>' +
        "Variance: " + d.variance.toFixed(1) + '°C').

        style('left', x - 120 + 'px').
        style('top', y + 10 + 'px');

      }).
      on('mouseout', (event, d) => {
        tooltip.
        transition().
        duration(200).
        style("opacity", 0);
      });

      // legend
      const legendCellWidth = 50;
      const legendCellHeight = 20;
      const cellsnumber = colors.length;
      const legendWidth = legendCellWidth * cellsnumber;

      const legendArea = svg.
      append("g").
      attr("id", "legend");

      const legendCell = legendArea.
      selectAll("rect").
      data(colors).
      enter().
      append("rect").
      attr("width", legendCellWidth).
      attr("height", legendCellHeight).
      attr("x", (d, i) => padding + yLabelWidth + i * legendCellWidth).
      attr("y", padding + cellsHeight + xLabelHeight + padding / 2).
      style("fill", (d, i) => colors[i]);


      const legendText = legendArea.
      selectAll("text").
      data(temperatureStep).
      enter().
      append("text").
      text(d => d).
      attr("x", (d, i) => padding + yLabelWidth + i * legendCellWidth).
      attr("y", padding + cellsHeight + xLabelHeight + padding * 1.5).
      style("text-anchor", "middle");


      // source
      const source = svg.append("text").
      attr("x", width - padding).
      attr("y", height - padding).
      style("text-anchor", "end").
      style("font-size", 12 + 'px').
      text("source: ").
      append("a").
      attr("href", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json").
      attr("target", "_blank").
      text("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json");






      /* author */
      const footer = d3.
      select("#container").
      append("footer").
      attr("class", "footer").
      append('text').
      text("coded by ").
      append("a").
      attr("href", "https://codepen.io/s-manguy").
      attr("target", "blank").
      text("Sandrine MANGUY");

      // if error when getting data 
    } else {
      console.error(request.status + " " + request.statusText);
    }
  };
  request.onerror = () => {
    console.error("Network error");
  };
});