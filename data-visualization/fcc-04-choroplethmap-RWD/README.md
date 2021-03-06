*[see all the Data visualization projects](https://github.com/s-manguy/projects/tree/main/data-visualization)*


# The freeCodeCampProject : Visualize Data with a Choropleth Map  
This project is the first of five projects to obtain the [**Data Visualization Certification**](https://www.freecodecamp.org/certification/fcc3ab085a4-3e2d-4160-a445-50914111cc0d/data-visualization).  
Have a look at the [codepen](https://codepen.io/s-manguy/full/jOBajye) realised on 2021/05/31 to obtain the certification.

**HAVE A LOOK TO THE RWD VERSION [codepen](https://codepen.io/s-manguy/full/mdmggav) CORRESPONDING TO THE BELOW CODE created on 2021/08/.**  

## Instructions
**Objective:** Build a CodePen.io app that is functionally similar to this: https://codepen.io/freeCodeCamp/full/EZKqza.  

**Fulfill the below user stories and get all of the tests to pass. Give it your own personal style.**  

*You can use HTML, JavaScript, CSS, and the D3 svg-based visualization library. Required (non-virtual) DOM elements are queried on the moment of each test. If you use a frontend framework (like Vue for example), the test results may be inaccurate for dynamic content. We hope to accommodate them eventually, but these frameworks are not currently supported for D3 projects.*  

**User Story #1:** My choropleth should have a title with a corresponding id="title".  
**User Story #2:** My choropleth should have a description element with a corresponding id="description".  
**User Story #3:** My choropleth should have counties with a corresponding class="county" that represent the data.  
**User Story #4:** There should be at least 4 different fill colors used for the counties.  
**User Story #5:** My counties should each have data-fips and data-education properties containing their corresponding fips and education values.  
**User Story #6:** My choropleth should have a county for each provided data point.  
**User Story #7:** The counties should have data-fips and data-education values that match the sample data.  
**User Story #8:** My choropleth should have a legend with a corresponding id="legend".  
**User Story #9:** There should be at least 4 different fill colors used for the legend.  
**User Story #10:** I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.  
**User Story #11:** My tooltip should have a data-education property that corresponds to the data-education of the active area.  

Here are the datasets you will need to complete this project:

    US Education Data:https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json
    US County Data:https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json

You can build your project by using this CodePen template and clicking Save to create your own pen. Or you can use this CDN link to run the tests in any environment you like: https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js  

Once you're done, submit the URL to your working project with all its tests passing.

## The way I worked
* I have added a table for accessibility. 
* The tooltips are hidden for smartphone, Iphone and Ipad users because the countries cannot be selected by the finger. 
* The general view is provided by the map. 
* The details are provided by the table. 

## Result
Have a look at the [codepen](https://codepen.io/s-manguy/full/jOBajye) realised on 2021/05/31 to obtain the certification.

**HAVE A LOOK TO THE RWD VERSION [codepen](https://codepen.io/s-manguy/full/mdmggav) CORRESPONDING TO THE BELOW CODE created on 2021/08/.**  


![mobile screenshot](https://github.com/s-manguy/projects/blob/main/data-visualization/fcc-04-choroplethmap-RWD/14%20chloroplethmap_mobile_sandrinemanguy_red.png) 
![ipad screenshot](https://github.com/s-manguy/projects/blob/main/data-visualization/fcc-04-choroplethmap-RWD/14%20chloroplethmap_tablet_sandrinemanguy_red.png)
![desktopscreenshot](https://github.com/s-manguy/projects/blob/main/data-visualization/fcc-04-choroplethmap-RWD/14%20chloroplethmap_desktop_sandrinemanguy_red.png)  
