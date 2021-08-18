const projectName = "D3 Bar chart";

const url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';


const width = 800;
const height = 400;
const padding = 80;

// create the bar chart container
const svg = d3.select(".dataVis")
.append("svg")
.attr("viewBox", "0 0 880 480") /* width+padding, height+padding */
.attr("preserveAspectRatio", "xMidYMid meet")
.attr('role', 'group'); 
    
svg.append('text')
    .attr('transform', 'rotate(-90)') // x becomes y, y becomes x
    .attr('x', -245)
    .attr('y', padding)
    .attr("font-size", 1.2+"rem")
    .attr("aria-label", "Axis-y title") // accessibility
    .text('Gross Domestic Product');

svg.append('text')
    .attr('x', width)
    .attr('y', height+padding/2)
    .attr("font-size", 1.2+"rem")
    .attr('text-anchor', 'end')
    .attr("aria-label", "Axis-x title") // accessibility
    .text('Year');

svg.append('a')	
    .attr("href","http://www.bea.gov/national/pdf/nipaguid.pdf" )
    .attr('alt', 'Have a look at the source doucment in a new tab') // accessibility
    .attr("target", "_blank")
    .attr('tabindex', '0') // accessibility
    .attr('role', 'link') // accessibility
    .append("text")
    .text('Source: http://www.bea.gov/national/pdf/nipaguid.pdf')
    .attr('x', (width/2) + (padding/2))
    .attr('y', height + 0.75*padding)
    .attr('text-anchor', "middle")
    .style("font-size", 1.2 + "rem")
    .style("font-style", "italic");

const tooltip = d3
    .select(".dataVis")
    .append("div")
    .attr("id", "tooltip")
    .attr("role", "tooltip") // accessibility
    .attr("aria-hidden", "true") // accessibility
    .style("opacity", 0);

// Get data
const req = new XMLHttpRequest();
req.open("GET", "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json", true);
req.send();
req.onload = () => {
    const dataset = JSON.parse(req.responseText).data;
    const date = dataset.map((item) => new Date(item[0]));
    const gdp = dataset.map((item) => item[1]);
    
    
    ///////////////////////////////
    ///////* THE BARCHART * ///////
    ///////////////////////////////

    const barWidth = width / dataset.length; 

    // Create axis
    // x
    const minX = new Date(d3.min(date,));
    const maxX = new Date(d3.max(date));

    const xScale = d3
    .scaleTime()
    .domain([minX, maxX])
    .range([1.75*padding,width]);

    const xAxis = d3.axisBottom(xScale)
                    .ticks(5);

    svg.append('g')
        .attr("id", "x-axis")
        .attr("role", "graphics-axis") // accessibility
        .attr("aria-orientation", "horizontal") // accessibility
        .attr("aria-datatype", "datetime ") // accessibility
        .attr("aria-valuemin", "1947") // accessibility
        .attr('aria-valuemax', '2015') // accessibility
        .attr('aria-label', 'x-axis') // accessibility
        .attr("transform", "translate(0, 400)")
        .call(xAxis);


    //y
    const minGdp = d3.min(gdp);
    const maxGdp = d3.max(gdp);

    const yScale = d3
    .scaleLinear()
    .domain([0, maxGdp])
    .range([height,padding/2]);

    const yAxis = d3.axisLeft(yScale);

    svg.append("g")
        .attr("id", "y-axis")
        .attr("role", "graphics-axis") // accessibility
        .attr("aria-orientation", "vertical") // accessibility
        .attr("aria-datatype", "count") // accessibility
        .attr("aria-valuemin", "0") // accessibility
        .attr('aria-valuemax', '18.000') // accessibility
        .attr('aria-label', 'x-axis') // accessibility
        .call(yAxis)
        .attr("transform", "translate(" + 1.75*padding + ", 0)");		

    
    // create bars		
    const bars = svg.selectAll("rect")
                    .data(dataset)
                    .enter()
                    .append("rect")
                    .attr("x", (d, i) => xScale(date[i]))
                    .attr("y", (d, i) => yScale(gdp[i]))
                    .attr("width", barWidth)
                    .attr("height", (d, i) => height - yScale(gdp[i]))
                    .attr("data-date", (d,i) => d[0])
                    .attr("data-gdp", (d,i) => d[1])
                    .attr('role', 'graphics-symbol') // accessibility
                    .attr('aria-roledescription', 'bar') // accessibility
                    /*.attr('tabindex', '0') // accessibility */
                    .attr("class", "bar")
                    .attr('aria-label', (d) => "year: " + d[0] + ", GDP in billion dollars: " + d[1]) // accessibility
                    // Make tooltips appear
                    .on("mouseenter", (d, i) => {
                        d3.select(d.currentTarget)
                        .style('fill', "#b3e5fc");
                        tooltip
                            .transition()
                            .duration(200)
                            .style("opacity", 0.9);
                        tooltip
                            .html(
                                "Date: " + i[0] + 
                                "<br/>" +
                                "GDP: $ " + i[1] + " Billion"
                            )
                            .attr("data-date", i[0])
                            .attr("data-gdp", i[1])
                    })
                    .on("mouseleave", () => {
                        tooltip
                            .transition()
                            .duration(200)
                            .style("opacity", 0)
                        d3.selectAll("rect")
                            .style("fill", "#0d47a1");
                    })

    ///////////////////////////
    ///////* THE TABLE *///////
    ///////////////////////////

    // Create the table
    const table = d3.select("#dataVis_table")
                    .append('table')
                    .attr('summary', "United States Gross Domestic Product in Billion Dollars per quarters from 1947 to 2015.");
    
    const caption = table.append('caption')
                        .attr('class', 'sr_only') // accessibility
                        .text("United States GDP in Billion dollars");

    const thead = table.append('thead')
                        .attr('class', 'table_head');

    const thead_tr = thead.append('tr');
    thead_tr.append('th')
            .text('Year')
            .attr("scope", "col"); // accessibility
    thead_tr.append('th')
            .text('Gross Domestic Product')
            .attr("scope", "col"); // accessibility

    const tbody = table.append('tbody')
                        .attr('class', 'table_body');

    const rows = tbody.selectAll('tr')
                    .data(dataset)
                    .enter()
                    .append('tr');

    const cells = rows.selectAll('td')
                        .data((d,i) => {return Object.values(d);})
                        .enter()
                        .append('td')
                        .text((d) => d)
                        .style('padding', 1+'vw')
                        .style('border-width', 1+"px")
                        .style('border-color', 'black')
                        .style('border-style', 'solid'); 
    
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
}