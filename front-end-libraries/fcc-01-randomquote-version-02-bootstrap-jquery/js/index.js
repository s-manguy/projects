const projectName = 'random-quote-machine';

// 1- Global variables about data
let quotesData;
var currentQuote = '',
  currentAuthor = '';

// 2- get the quotes from the API and put them in an array
const apiCamperbot = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

const getQuotes = () => {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url:
      apiCamperbot,
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        /* console.log for building test */
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

// 3- Get a random quote
const getRandomQuote = () => {
  /* The quotesData is an object containing ONE property containing OBJECTS each one containing two properties : one quote and one author. To have access to the quote or author property the path is very long : quotesData.quotes[index].propertyName */
  let quotesArray = quotesData.quotes;
  
  return quotesArray[
    Math.floor(Math.random() * quotesArray.length)
  ];
}

// 4- create the array of colors for the animation.
/* Material Design color palettes --> accessibility with white background and text color */
var colors = [
    '#D50000', /* Red A700 */
    '#C51162', /* Pink A700 */
    '#AA00FF', /* Purple A700 */
    '#6200EA', /* Deep purple  A700 */
    '#304FFE', /* Indigo A700 */
    '#2962FF', /* Blue A700 */
    '#01579B', /* Light blue 900 */
    '#006064', /* Cyan 900 */
    '#2E7D32', /* Green 800 */
    '#DD2C00', /* Deep orange A700 */
    '#5D4037', /* Brown 700 */
    '#757575', /* Gray 600 */
    '#546E7A', /* Blue Gray 600 */
];

// 5- All the effects of the click on the "New quote" button
const newQuote = () =>{
  let randomQuote = getRandomQuote();
  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;

// 6- Tweet Icon : Give the attribut of the current Quote
  $('#tweet-quote').attr(
    'href',
    'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
      encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
  );

// 7- make the current quote and author disappear with opacity from 1 to 0 and then insert the new randomQuote quote playing with opacity from 0 to 1
/* quote */
  $('.box_quote--text').animate({ opacity: 0 }, 'normal', function () {
    $(this).animate({ opacity: 1 }, 'normal');
    $('#text').text(currentQuote);
  });
  
/* author */
  $('.box_quote--author').animate({ opacity: 0 }, 'normal', function () {
    $(this).animate({ opacity: 1 }, 'normal');
    $('#author').html(currentAuthor);
  });

 
// 8- apply the new color to the background and the text
  /*get a random colors index.*/
  var color = Math.floor(Math.random() * colors.length);
 
  $('.container-fluid').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    800 /* let time to previous quote to disappear and the new quo to appear (400+400) */
  );

// 10- animate the background color of the buttons
  $('.btn').animate(
    {
      backgroundColor: colors[color]
    },
    800
  );
}

// 11- wait for the document being ready to call the getQuotes and getQuote function to obtain a quote as soon as the file opens.
$(document).ready(function () {
  getQuotes().then(() => {
    newQuote();
  });

  $('#new-quote').on('click', newQuote);
});