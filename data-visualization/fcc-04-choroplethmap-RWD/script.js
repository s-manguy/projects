// Based on https://bl.ocks.org/mbostock/4060606


/* global constants */
const projectName = 'Choropleth Map';

const urlData = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json";
const urlMap = "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json";

const colors = ['#f7fbff','#deebf7','#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#08519c','#08306b'];// https://colorbrewer2.org/?type=sequential&scheme=Blues&n=9
const n = colors.length;

// measurements
const fullWidth = 1060; // 1100 - main padding *2
const fullHeight = 740;
const padding = 20;
const width = fullWidth - padding *2;
const height = fullHeight - padding *2;
const cellWidth = 40;
const cellHeight = 15;
const legendWidth = cellWidth * (n-2);


// graph container
const svg = d3.select("#graph")
	.append('svg')
	.attr("viewBox", "0 0 " + fullWidth + " " + fullHeight)
	.attr("preserveAspectRatio", "xMidYmid meet")
	.style("background", "#fafafa");

// path for the map
const path = d3.geoPath();




/* get data */
document.addEventListener('DOMContentLoaded', () => {
	// get Map Data
	const requestMap = new XMLHttpRequest();
	requestMap.open("GET", urlMap, true );
	requestMap.send();
	requestMap.onload = () => {
		if (requestMap.status >= 200 && requestMap.status <= 400) {
			const dataMap = JSON.parse(requestMap.responseText);
			console.log(dataMap);
	
			// get Educational Data
			const requestData = new XMLHttpRequest();
			requestData.open("GET", urlData, true );
			requestData.send();
			requestData.onload = () => {
				if (requestData.status >= 200 && requestData.status <= 400) {
					const dataEducation = JSON.parse(requestData.responseText);
					console.log(dataEducation);
					
					const minLevel = d3.min(dataEducation, (d) => d.bachelorsOrHigher);
					const maxLevel = d3.max(dataEducation, (d) => d.bachelorsOrHigher);
					console.log(minLevel + "-" + maxLevel); // --> 2.6 - 75.1
					
					/* mix the data */
					// create a new dataset
					//as if the data are mixed in the same dataset, topojson does not recognize theaddes properties --> add them directly in the topojson file.
					const dataset = topojson.feature(dataMap, dataMap.objects.counties).features;
					console.log(dataset);
					
					// match the data in the new dataset
					//solution using the find() method
					for (let i=0; i < dataset.length; i++) {
						var currentCountyId = dataset[i].id;
						
						const found = dataEducation.find( el => el.fips === currentCountyId);
						
						if (found !== undefined) {
							dataset[i].education = found.bachelorsOrHigher;
							dataset[i].state = found.state;
							dataset[i].area = found.area_name;	
						} else {
							console.log("no found data for: " + currentCountyId);
						}
					};
					
					
					//solution using filter()	
					/*
					for (let i=0; i < dataset.length; i++) {
						var currentCountyId = dataset[i].id;
						
						let result = dataEducation.filter(function (obj) {
						return obj.fips === currentCountyId;
						});
						
						if (result[0]) {
							dataset[i].education = result[0].bachelorsOrHigher;
							dataset[i].state = result[0].state;
							dataset[i].area = result[0].area_name;	
						} else {
							console.log("no found data for: " + currentCountyId);
						}
					};
					*/					
					console.log(dataset);
					
					
					
					/* Draw the graph */
					// legend
					const legendScale = d3
						.scaleLinear()
						.domain([minLevel, maxLevel])
						.rangeRound([240, 780 + legendWidth]);// x start position, x end position

					const colorScale = d3
					  .scaleThreshold()
					  .domain(d3.range(minLevel, maxLevel, (maxLevel - minLevel) / 9)) // start, end, number of steps
					  .range(d3.schemeBlues[9]); // 9 colors but only 7 used --> always take 2 colors more than wanted

					const legend = svg
					  .append('g')
					  .attr('class', 'key')
					  .attr('id', 'legend')
					  .attr('transform', 'translate(0,650)');

					const legendCells= legend
					  .selectAll('rect')
					  .data(
						 colorScale.range().map(function (d) {
							d = colorScale.invertExtent(d);
							if (d[0] === null) {
							  d[0] = x.domain()[0];
							}
							if (d[1] === null) {
							  d[1] = x.domain()[1];
							}
							return d;
						 })
					  )
					  .enter()
					  .append('rect')
					  .attr('height', cellHeight)
					  .attr('x', (d) => {
						 return legendScale(d[0]);
					  })
					 .attr('width', (d) => {return legendScale(d[1]) - legendScale(d[0]);})
					  .attr('fill', (d) => {
						 return colorScale(d[0]);
					  });


						/* No need here; kept for further use
						const legendTitle = legend
						  .append('text')
						  .attr('class', 'caption')
						  .attr('x', legendScale.range()[0])
						  .attr('y', -6)
						  .attr('fill', '#000')
						  .attr('text-anchor', 'start')
						  .attr('font-weight', 'bold')
						.text("Legend title");
						*/

						const legendAxis = d3
							.axisBottom(legendScale)
							.tickSize(10) // tick height
							.tickFormat((x) => {return Math.round(x) + '%';})// keep x !
							.tickValues(colorScale.domain());

						legend
							.append("g")
							.attr("transform", "translate(0," + cellHeight + ")")
							.call(legendAxis)
							.attr('class', 'ticks_font')
							.select('.domain')
							.remove(); // select & remove permit to delete the right end ticks

						/* other way to write cont legendAxis and append the "g" to legend
						legend.call(
						  d3
							 .axisBottom(legendScale)
							 .tickSize(13)
							 .tickFormat((x) => {return Math.round(x) + '%';})
							 .tickValues(colorScale.domain())
						)
						  .select('.domain')
						  .remove();
						*/

						
					// tooltip					
					const tooltip = d3.select("#graph")
						.append('div')
						.attr("id", "tooltip")
						.attr("class", "tooltip");
					
					// Draw counties
					const counties = svg
						.append("g")
						.attr("id", "counties")
						.attr("class", "counties")
						.selectAll("path")
						.data(dataset)
						.enter()
						.append("path")
						.attr("class", "county")
						.attr("d", path) // draw the path
						.attr("transform", "translate(80, 0)") // move to the right to center
						.attr('data-fips', (d) => d.id)
						.attr('data-education', (d) => d.education)
						.attr('fill', (d) => colorScale(d.education))

						// tooltip show
						.on("mouseover", (event, d) => {
							const [x, y] = d3.pointer(event);
							tooltip
								.transition()
								.duration(200)
								.style("opacity", 1);
	
							tooltip
								.attr('data-education', d.education)
								.html( d.id + "</br>" + d.area  + ", " + d.state + "</br>" + d.education + "%"
								)
								.style('left', x +'px')
								.style('top', y + 'px');		
						})
						// tooltip hide
						.on('mouseout', (event, d) => {
							tooltip
								.style("opacity", 0)
						});
						
					
						const states = svg
							.append("g")
							.attr("id", "states")
							.append("path")
							.datum(topojson.mesh(dataMap, dataMap.objects.states, (a, b) => { return a !== b}))
							.attr("transform", "translate(80, 0)")
							.attr("class", "states")
							.attr("d", path);	


					/////////////////////
					/////// TABLE ///////
					/////////////////////

					const titles = ["Fips", "State", "County", "%"];

					const table = d3.select('.dataVis_table')
									.append('table');
						
					const caption = table.append('caption')
										.attr('class', 'sr_only')
										.html(
											"United States Educational Attainment" +" </br>" +
											"<span class='subtitle'>Percentage of adults age 25 and older with a bachelor's degree or higher (2010-2014)</span>"
										);
					
					const thead = table.append('thead');
					
					const thead_tr = thead.append('tr');
					
					const thead_th = thead_tr.selectAll('th')
												.data(titles)
												.enter()
												.append('th')
												.text((d) => d)
												.attr("scope", "col"); // accessibility;
					
					const tbody = table.append('tbody');
					
					const rows = tbody.selectAll('tr')
									.data(dataEducation)
									.enter()
									.append('tr')
									.attr('background', (d) => colorScale(d.education))
									.on("mouseover", function() {
										d3.select(this)
											.transition()
											.duration(200)
										 	.style('background-color', "#ffd54f");
									})
									.on("mouseout", function() {
										d3.select(this)
											.transition()
											.duration(200)
										 	.style('background-color', "white");
									});

					const cells = rows.selectAll('td')
									.data((d,i) => {return Object.values(d);})
									.enter()
									.append('td')
									.text((d) => d);

					// Get and modify the first tr td to tr th for accessibility
					const element = document.querySelectorAll("table tbody tr");

					for (var i=0; i<element.length; i++) {
						var tr = element[i];
						var firstTd = element[i].firstElementChild;
						/*console.log("tr: " + tr + "td: " +firstTd);*/
						// Keep the style and text information
						var firtsTdText = firstTd.textContent;
						var firstTdStyle = firstTd.getAttribute("style");
						// Create a new element th before the first td
						var newThElement = document.createElement('th');
						newThElement.setAttribute("style", firstTdStyle);
						newThElement.setAttribute("scope", "row"); // accessibility
						newThElement.textContent = firtsTdText;
						// Replace the td node by the th node
						tr.replaceChild(newThElement, firstTd);
					};
					/*console.log(element);*/  
					
				//if error when getting Education Data
				} else {
					console.error(requestData.status + " " + requestData.statusText);
				}
			};
			requestData.onerror = () => {
				console.error("Network error when loading County Data");
			};	
			
			
// if error when getting County Data		
		} else {
			console.error(requestMap.status + " " + requestMap.statusText);
		}
	}
	requestMap.onerror = () => {
		console.error("Network error when loading County Data")
	}
});








