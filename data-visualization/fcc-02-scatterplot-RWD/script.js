const projectName = "Scatterplot Graph";

const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';



/* get data */
document.addEventListener('DOMContentLoaded', () => {
	const request = new XMLHttpRequest();
	request.open("GET", url, true);
	request.send();
	request.onload = () => {
		if(request.status >= 200 && request.status < 400) {
			const dataset = JSON.parse(request.responseText);
	
			
			///////////////////////			
			//////// header ///////
			///////////////////////

			// headings
			const header = d3.select('body')
							.append('header');

			const header_heading = header.append('h1')
									.text("Doping in Professional Bicycle Racing");

			const header_subtitle = header.append("h2")
									.text("35 Fastest times up Alpe d'Huez");


			///////////////////////			
			//////// main /////////
			///////////////////////

			const container = d3.select("body")
								.append("main")
								.attr("id", "container")
								.style("position", "relative");



			///////////////////////			
			///// scatterplot /////
			///////////////////////
			const padding = 40;
			const width = 900 + padding*2;
			const height = 600 + padding*2;

			/* scatterplot area */
			const svg = d3.select("main")
							.append("svg")
							.attr('id', 'graph')
							.attr("width", width)
							.attr("height",height)
							.attr("class", "main");

			/* headings */
			const title = svg
				.append("text")
				.attr("id", "title")
				.attr("role", "heading")
				.attr("aria-level", "1")
				.attr("x", width/2)
				.attr("text-anchor", 'middle')
				.attr("y", padding*1.5)
				.text("Doping in Professional Bicycle Racing");

			const subtitle = svg
				.append("text")
				.attr("id", "subtitle")
				.attr("role", "heading")
				.attr("aria-level", "2")
				.attr("x", width/2)
				.attr("text-anchor", 'middle')
				.attr("y", padding * 2.3)
				.text("35 Fastest times up Alpe d'Huez");
			
			/* tooltips */
			const tooltip = d3
				.select("#container")
				.append("div")
				.attr("id", "tooltip")
				.attr("class", "tooltip")
				.style("opacity", 0);
			
			
			/* axis */
			// x axis
			const minX = d3.min(dataset, (d) => d.Year)- 1; // to avoid dots to be on the y axis
			const maxX = d3.max(dataset, (d) => d.Year)+ 1;
			const xScale = d3.scaleUtc()
				.domain([minX, maxX])
				.range([padding*2.5, width - padding]);
			
			const xAxis = d3.axisBottom(xScale)
				.tickFormat(d3.format('d'))
			
			svg.append("g")
				.attr("id", "x-axis")
				.attr("role", "graphics-axis")
				.attr("aria-orientation", "horizontal")
				.attr("aria-datatype", "datetime")
				.attr("transform", "translate(0," + (height - padding*1.5) + ")")
				.call(xAxis)
				.attr('class', 'ticks_font');
			
			svg.append("text")
				.attr("x", width-padding)
				.attr("y", height-padding*2/3)
				.style('text-anchor', 'end')
				.attr("class", "axis-label")
				.text("Year");
			
			// y axis
			const shortestTime = d3.min(dataset, (d) => new Date(d.Seconds * 1000));
      		const longestTime = d3.max(dataset, (d) => new Date(d.Seconds * 1000));
			
			const yScale =  d3.scaleTime()
				.domain([longestTime, shortestTime])
				.range([height - padding *1.5, padding*3])
			
			const yAxis = d3.axisLeft(yScale)
				.tickFormat(d3.timeFormat('%M:%S'));
			
			svg.append("g")
				.attr("id", "y-axis")
				.attr("role", "graphics-axis")
				.attr("aria-orientation", "vertical")
				.attr("aria-datatype", "duration")
				.attr("transform", "translate(" + padding*2.5 +", 0)")
				.call(yAxis)
				.attr('class', 'ticks_font');
			
			svg.append("text")
				.attr("transform", "rotate(-90)")
				.attr("x", - height/2)
				.attr("y", padding)
				.attr('text-anchor', 'middle')
				.attr("class", "axis-label")
				.text("Time in minutes");
			
			/* plots */
			const dots = svg
				.selectAll("circle")
				.data(dataset)
				.enter()
				.append("circle")
				.attr("cx", (d) => xScale(d.Year))
				.attr("cy", (d) => yScale(new Date(d.Seconds * 1000)))
				.attr("r", 6)
				.attr("data-xvalue", (d) => d.Year)
				.attr("data-yvalue", (d) => new Date(d.Seconds * 1000))
				.attr("class", "dot")
				.style("fill", (d) => d.Doping === "" ? '#0288d1' : '#ff3d00')

			// tooltips  	
				.on('mouseover', (event, d) => {
					const [x, y] = d3.pointer(event);
					
					tooltip
						.attr("data-year", d.Year)
						.style("display", "block")
						.style("opacity", 0.9)
						.html(
							d.Name + ": " +  d.Nationality + '<br/>' +
							"Year: " + d.Year + '<br/>' +
							"Time: " + d.Time + '<br/>' +
							(d.Doping ? '<br/>' + d.Doping : "")
						)
						.style('left', x  + 'px')
						.style('top', (y + 10) + 'px')
	
				})
				.on('mouseout', (event, d) => {
					tooltip
						.transition()
						.duration(200)
						.style("opacity", 0);
				});

			
			/* legend */
			const legend = [
				{
					"text": "Riders with doping allegations",
					"color": "#ff3d00"
				},
				{
					"text": "No doping allegations",
					"color": "#0288d1"
				},
			];
			
			const legendArea = svg
				.append("g")
				.attr("id", "legend")
				.attr("role", "content-info")
				.attr("aria-label", "scatterplot legend")
			
			const legendItem = legendArea
				.selectAll('#legend')
				.data(legend)
				.enter()
				.append('g')
				.attr("class", "legend");
			
			// icon
			const iconWidth = 18;
			const iconHeight = 18;
			legendItem.append('rect')
				.attr('x', width - padding - 250)
				.attr("y", (d, i) => i === 0 ? 250 : 250 + padding * (i/2))
				.attr('width', iconWidth)
				.attr('height', iconHeight)
				.style("fill", (d, i) => d.color);
			
			// text
			legendItem.append('text')
				.attr("x", width - padding - 250 + iconWidth + 5)
				.attr("y", (d, i) => i === 0 ? 250 : 250 + padding * (i/2))
				.attr("dy", 13) // to  to align the text vertically with the icon
				.style("text-anchor", "start")
				.style("vertical-align", "center")
				.text((d) => d.text);


			///////////////////////			
			//////// table ////////
			///////////////////////
			// get the Object porperties (keys) to set the columns.
			const columnsHeader = Object.keys(dataset[0]); // get the property names.
			/* console.log (columnsHeader); */
			// for information: columnsHear = ["Time", "Place", "Seconds", "Name", "Year", "Nationality", "Doping", "URL"] 

			const datavisTable = d3.select('#container')
									.append('div')
									.attr('id', 'dataVisTable');

			// Create a function to draw the table to have the possibilty to choose which columns to display.
			const drawTable = (data, columns) => {
				/* table */
				const table = datavisTable.append('table');

				/* caption */
				const caption = table.append('caption')
									.attr('class', 'sr-only')
									.text('Doping in Professional Bicycle Racing: 35 Fastest times up Alpe d\'Huez');

				/* thead */
				const thead = table.append('thead');

				const thead_th = thead.append('tr')
									.selectAll('th')
									.data(columns)
									.enter()
									.append('th')
									.attr('scope', 'col')
									.text((d) => d)


				/* tbody */
				const tbody = table.append('tbody');

				const rows = tbody.selectAll('tr')
								.data(data)
								.enter()
								.append('tr');

				const cells = rows.selectAll('td')
								/* .data((d, i) => Object.values(d) ) */
								.data((row) => {
									return columns.map((column) => {
										return {name: column, value: row[column]}
									})
								})
								.enter()
								.append('td')
								.attr('data-th', (d) => d.name)
								.text((d) => d.value);

				// Get and modify the first tr td to tr th for accessibility
				const element = document.querySelectorAll("table tbody tr");
		
				for (var i=0; i<element.length; i++) {
					var tr = element[i];
					var firstTd = element[i].firstElementChild;
					/* console.log("tr: " + tr + "td: " +firstTd); */
					// Keep the style and text information
					var firtsTdText = firstTd.textContent;
					var firstTdStyle = firstTd.getAttribute("style");
					var firstTdData = firstTd.getAttribute("data-th");// Added for THIS table
					// Create a new element th before the first td
					var newThElement = document.createElement('th');
					newThElement.setAttribute("style", firstTdStyle); 
					newThElement.setAttribute("data-th", firstTdData); // Added for THIS table
					// accessibility
					newThElement.setAttribute("scope", "row"); 
					newThElement.textContent = firtsTdText;
					// Replace the td node by the th node
					tr.replaceChild(newThElement, firstTd);
				};
				/* console.log(element); */

					

				return table;
			}
			
			drawTable(dataset, ["Time", "Place", "Name", "Year", "Nationality", "Doping"]);

			///////////////////////			
			//////// author ////////
			///////////////////////

			// author
			const footer = d3
				.select("body")
				.append("footer")
				.attr("class", "footer")
				.append('text')
				.text("coded by ")
				.append("a")
				.attr("href","https://codepen.io/s-manguy")
				.attr("target", "blank")
				.text("Sandrine MANGUY");
			
// error when getting data 
		} else {
			console.error(request.status + " " + request.statusText);
		}	
	};
	request.onerror = () => {
		console.error("Network error");
	}
});