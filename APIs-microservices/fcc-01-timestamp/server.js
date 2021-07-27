// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", (req, res) => {
  const givenDate = req.params.date;
  let date;

  // empty
	if(!givenDate) {
		date = new Date();
  } else {
    //valid date is a string and is considered as a date
    //unix is a number but is considered as a string in the URI so it needs to be parsed to be considered as unix.
    date = isNaN(givenDate)?new Date(givenDate):new Date(parseInt(givenDate));
  }

  const unixDate = date.getTime();
  const utcDate = date.toUTCString();

  if(unixDate === null || utcDate === 'Invalid Date') {
    res.json({error: "Invalid Date" });
  } else {
    res.json({ unix: unixDate, utc: utcDate });
  }
  

  
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
