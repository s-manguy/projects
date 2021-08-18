/* global constants */

const projectName = "Treemap Diagram";

const urlKp = " https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json"; // KickstarterPledges
const urlMovie = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"; // Movie Sales
const urlVgame = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"; //Video Game Sales

// Colors taken from categorical20
const colors = ["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896","#9467bd","#c5b0d5","#8c564b","#c49c94","#e377c2","#f7b6d2","#7f7f7f","#c7c7c7","#bcbd22","#dbdb8d","#17becf","#9edae5"];


// Measurements
const padding = 30;
const width = 900;
const height = 650;
const legendHeight = height;
const legendWidth = 200;
const legTileWidth = 25;
const legTileHeight = 20;
const legTileSpacing = 12;
const fullWidth = width + legendWidth + padding*3;



/* the project */
document.addEventListener('DOMContentLoaded', () => {
	/* Listen to radio input data selection */
	document.getElementById("data-selector").addEventListener("change", () => {
		let selected = document.querySelector("input[type=radio]:checked").value;
		getSelectedData(selected);
	});
	
	/* Get the data */
	const getSelectedData = (type) => {
		// Empty the elements
		document.getElementById("diagram").innerHTML = "";
		document.getElementById("legend").innerHTML = "";
		document.getElementById("title").innerHTML = "";
		document.getElementById("description").innerHTML = "";
		document.getElementById("source-url").innerHTML = "";
		// Select the correct url
		var url;
		if (type === "pledge") {
			url = urlKp;
		} else if (type === "movie") {
			url = urlMovie;
		} else {
			url = urlVgame;
		}
		// Get data
		const request = new XMLHttpRequest();
		request.open("GET", url, true );
		request.send();
		request.onload = () => {
			if (request.status >= 200 && request.status <= 400) {
				const data = JSON.parse(request.responseText);
				console.log(data);
				// Call the function to draw the diagram	
				drawDiagram(data);
			// if error when getting Data		
			} else {
				console.error(request.status + " " + request.statusText);
			}
		};
		request.onerror = () => {
			console.error("Network error when loading Data")
		};
		
	}
	
	
	/* Draw the treemap diagram */
	const drawDiagram = (data) => {
					
			// Create the headings
			const title = d3
				.select("#title");
		
			if (data.name === "Video Game Sales Data Top 100") {
					title.html("Video Game Sales");
				} else if (data.name === "Kickstarter") {
					title.html(data.name);
				} else if (data.name === "Movies"){
					title.html("Movies Sales");
				}
	
			const description = d3
				.select("#description");
	
			if (data.name === "Video Game Sales Data Top 100") {
				description.html("Top 100 Most Sold Video Games Grouped by Platform");
			} else if (data.name === "Kickstarter") {
				description.html("Top 100 Most Pledged Kickstarter Campaigns Grouped By Category");
			} else if (data.name === "Movies"){
				description.html("Top 100 Highest Grossing Movies Grouped By Genre");
			}
			
			// Create svg, group, tooltip and treemap
				const svg = d3
					.select("#diagram")
					.attr("width", width)
					.attr("height", height);

				const legend = d3.select("#legend")
					.attr("x", width)
					.attr("width", legendWidth);

				const tooltip = d3
					.select("#graph")
					.append("div")
					.attr("id", "tooltip")
					.attr("class", "tooltip");

				const treemap = d3
					.treemap()
					.size([width, height])
					.paddingInner(1)// paddingOuter for spacing between the groups
					.round(true);

		
				/* Prepare the colorScale */ 
				// Collect the categories
				const categories = data.children.map((item) => item.name);
				console.log(categories);
	
				// The colorScale
				const colorScale = d3
					.scaleOrdinal()
					.domain(categories)
					.range(colors);
		
				// an opacity scale // /https://www.d3-graph-gallery.com/graph/treemap_custom.html Not used her just kept as exemple for future use
				// const opacity = d3.scaleLinear().domain([10, 30]).range([.5,1])
		
				// Create the legend colors
				const legendColors = [];
				for (let i = 0; i < categories.length; i++) {
					const obj = {};
					obj.category = categories[i];
					obj.color = colors[i]
					legendColors.push(obj)
				}
				console.log(legendColors);
		
		
				// Draw the tree
				const root = d3
					.hierarchy(data)
					.eachBefore( function (d) {d.data.id = (d.parent ? d.parent.data.name + "." : "") + d.data.name;}) // https://bl.ocks.org/guanzo/cda716d75831841ed00a09e6630d26a6
					.sum(d => d.hasOwnProperty("value") ? d.value : 0)
					.sort((a, b) => {
							return b.height - a.height || b.value - a.value
					});
				//console.log(root.leaves());
		
				treemap(root);
				//console.log(treemap);
		
				// Create the groups
				const group = svg
					.selectAll("g")
					.data(root.leaves())
					.enter()
					.append("g")
					.attr("class", "group")
					.attr('transform', (d) => {return 'translate(' + d.x0 + ',' + d.y0 + ')'}); // to place the tiles and the etxt in correct place !
					
					
				// create tiles inside the groups
				const tile = group
					.append("rect")
					.attr("id", d => d.data.id)
					.attr("class", "tile")
					.attr("width", d => d.x1 - d.x0)
					.attr("height", d => d.y1 - d.y0)
					.attr("data-name", d => d.data.name)
					.attr("data-category", d => d.data.category)
					.attr("data-value", d => d.data.value)
					.attr("fill", d => colorScale(d.data.category))
					// Show the tooltips
					.on("mouseover", (event, d) => {
						//const [x, y] = d3.pointer(event);
						tooltip
							.transition()
							.duration(200)
							.style("opacity", 0.9);
						tooltip
							.attr("data-value", d.data.value)
							.style("left", (event.offsetX + 50) +"px")
							.style("top", (event.offsetY + 100) + "px")
							.style("display", "block");
						tooltip
							.html(
								"<strong>Name: </strong>" + d.data.name + "<br/>" +
								"<strong>Category: </strong>" + d.data.category + "<br/>" +
								"<strong>Value: </strong>" + d.data.value
							)	
					})
					// Hide the tooltips
					.on("mouseout", () => {
						tooltip
							.transition()
							.duration(200)
							.style("opacity", 0)
					});
					
				// Add labels to the cells
				const labels = group
					.append("text")
					.attr("class", "tile-text")
					.selectAll("tspan")
					.data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g)) // I have tried with split (" ") but was not so efficient
					.enter()
					.append("tspan")
					.text(d => d)
					.attr("x", 5)
					.attr('y', (d, i) => 15 + i * 15);

				// Draw legend	
				const legendTile = legend
					.selectAll("rect")
					.data(legendColors)
					.enter()
					.append("rect")
					.attr("class", "legend-item")
					.attr("x", padding)
					.attr("y", (d, i) => i * (legTileHeight + legTileSpacing))
					.attr("width", 25)
					.attr("height", 20)
					.attr("fill", d => d.color)
					;
		
				const legendLabel = legend
					.selectAll("text")
					.data(legendColors)
					.enter()
					.append("text")
					.attr("class", "legend-item")
					.attr("x", padding + legTileWidth + legTileSpacing )
					.attr("y", (d, i) => legTileHeight + i * (legTileHeight + legTileSpacing) ) // rect position + rect height : the rect anchor is at the top left, the text anchor is at the bottom left !
					.text(d => d.category);
				
				// Create the source link
				const sourceUrl = d3
					.select("#source-url")
					.attr("class", "link");
			
				if (data.name === "Video Game Sales Data Top 100") {
					sourceUrl.html(urlVgame);
				} else if (data.name === "Kickstarter") {
					sourceUrl.html(urlKp);
				} else if (data.name === "Movies"){
					sourceUrl.html(urlMovie);
				}
			
		}
	
	getSelectedData("video");
	
});