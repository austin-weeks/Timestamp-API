// index.js
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

function getDateJson(dateIn) {
  if (!dateIn) return dateJson(new Date());
  
  //If input only includes digits.
  if (! dateIn.match(/[\D]/g)) return dateJson(new Date(parseInt(dateIn)));

  dateObj = new Date(dateIn);
  return !dateObj.getTime() ? {error: "Invalid Date"} : dateJson(dateObj);
  
  function dateJson(date){
    return {
      unix: date.getTime(),
      utc: date.toUTCString()
    }
  }
}

app.get("/api/?", (req, res) => {
  res.send(getDateJson());
});

app.get("/api/:date", (req, res) => {
  res.json(getDateJson(req.params.date));
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

