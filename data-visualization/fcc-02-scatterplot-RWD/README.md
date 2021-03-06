*[see all the Data visualization projects](https://github.com/s-manguy/projects/tree/main/data-visualization)*


# The freeCodeCampProject : Visualize Data with a Scatterplot Graph
This project is the second of five projects to obtain the [**Data Visualization Certification**](https://www.freecodecamp.org/certification/fcc3ab085a4-3e2d-4160-a445-50914111cc0d/data-visualization).  

Have a look at the [codepen](https://codepen.io/s-manguy/full/oNZwbev) realised on 2021/05/25 to obtain the certification.  

**HAVE A LOOK TO THE ADAPTATIVE VERSION [CODEPEN](https://codepen.io/s-manguy/full/eYWwdrp) realised on 2021/08/18.** 


## Instructions
**Objective:** Build a CodePen.io app that is functionally similar to this: https://codepen.io/freeCodeCamp/full/bgpXyK.  

**Fulfill the below user stories and get all of the tests to pass. Give it your own personal style.**

*You can use HTML, JavaScript, CSS, and the D3 svg-based visualization library. The tests require axes to be generated using the D3 axis property, which automatically generates ticks along the axis. These ticks are required for passing the D3 tests because their positions are used to determine alignment of graphed elements. You will find information about generating axes at https://github.com/d3/d3/blob/master/API.md#axes-d3-axis. Required (non-virtual) DOM elements are queried on the moment of each test. If you use a frontend framework (like Vue for example), the test results may be inaccurate for dynamic content. We hope to accommodate them eventually, but these frameworks are not currently supported for D3 projects.*  

**User Story #1:** I can see a title element that has a corresponding id="title".  
**User Story #2:** I can see an x-axis that has a corresponding id="x-axis".  
**User Story #3:** I can see a y-axis that has a corresponding id="y-axis".  
**User Story #4:** I can see dots, that each have a class of dot, which represent the data being plotted.  
**User Story #5:** Each dot should have the properties data-xvalue and data-yvalue containing their corresponding x and y values.  
**User Story #6:** The data-xvalue and data-yvalue of each dot should be within the range of the actual data and in the correct data format. For data-xvalue, integers (full years) or Date objects are acceptable for test evaluation. For data-yvalue (minutes), use Date objects.  
**User Story #7:** The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis.  
**User Story #8:** The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.  
**User Story #9:** I can see multiple tick labels on the y-axis with %M:%S time format.  
**User Story #10:** I can see multiple tick labels on the x-axis that show the year.  
**User Story #11:** I can see that the range of the x-axis labels are within the range of the actual x-axis data.  
**User Story #12:** I can see that the range of the y-axis labels are within the range of the actual y-axis data.  
**User Story #13:** I can see a legend containing descriptive text that has id="legend".  
**User Story #14:** I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.  
**User Story #15:** My tooltip should have a data-year property that corresponds to the data-xvalue of the active area.  

Here is the dataset you will need to complete this project: https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json  

You can build your project by using this CodePen template and clicking Save to create your own pen. Or you can use this CDN link to run the tests in any environment you like: https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js  

Once you're done, submit the URL to your working project with all its tests passing. 

## The way I worked
* I have added a table for accessibility. 
* The tooltips are hidden for smartphone, Iphone and Ipad users because the countries cannot be selected by the finger. 
* On tablets, the chart is removed by a table.
* On cell phones, the chart is removed by a one column table.

## Result
Have a look at the [codepen](https://codepen.io/s-manguy/full/oNZwbev) realised on 2021/05/25 to obtain the certification.
**HAVE A LOOK TO THE ADAPTATIVE VERSION [CODEPEN](https://codepen.io/s-manguy/full/eYWwdrp) realised on 2021/08/18.**  

![mobile screenshot](https://github.com/s-manguy/projects/blob/main/data-visualization/fcc-02-scatterplot-RWD/12%20scatterplot_mobile_sandrinemanguy_red.png)   
![ipad screenshot](https://github.com/s-manguy/projects/blob/main/data-visualization/fcc-02-scatterplot-RWD/12%20scatterplot_ipad_sandrinemanguy_red.png)  
![desktop screenshot](https://github.com/s-manguy/projects/blob/main/data-visualization/fcc-02-scatterplot-RWD/12%20scatterplot_desktop_sandrinemanguy_red.png)
