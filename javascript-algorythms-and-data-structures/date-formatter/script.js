const currentDateParagraph = document.getElementById('current-date');
const dateOptionsSelectElement = document.getElementById('date-options');

const date = new Date();
const day = date.getDate(); 
/* The getDate() returns a number between 1 and 31 
that represents the day of the month for that date */
const month = date.getMonth() + 1;
/* The .getMonth() method returns a number between 0 and 11. 
This represents the month for the date provided, 
where 0 is January and 11 is December. 
Because the number this method returns is zero-based, 
you need to add 1 to it to get the expected month number.*/
const year = date.getFullYear();
/* The .getFullYear() method returns a number which 
represents the year for the provided date. */
const hours = date.getHours();
/* The .getHours() method returns a number between 0 and 23. 
This represents the hour for the provided date, 
where 0 is midnight and 23 is 11 p.m. */
const minutes = date.getMinutes();
/* The .getMinutes() method returns a number between 0 and 59 
which represents the minutes for the provided date. */

const formattedDate = `${day}-${month}-${year}`;
// console.log(formattedDate);
currentDateParagraph.textContent = formattedDate;

dateOptionsSelectElement.addEventListener('change', () => {
    switch (dateOptionsSelectElement.value) {
        case 'yyyy-mm-dd':
            currentDateParagraph.textContent = formattedDate
                .split("-")
                .reverse()
                .join("-");
            break;
        case 'mm-dd-yyyy-h-mm':
            currentDateParagraph.textContent = `${month}-${day}-${year} ${hours} Hours ${minutes} Minutes`;
            break;
        default:
            currentDateParagraph.textContent = formattedDate;
    }
});