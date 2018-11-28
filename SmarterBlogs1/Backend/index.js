var express = require("express");

var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");

var cors = require("cors");

//set up cors
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//set up session variable
<<<<<<< HEAD
let data1 ='';
=======

>>>>>>> 67f3cb482e9f50910c524dcaf5db12ec04d45651
app.use(
  session({
    secret: "linkedin",
    resave: false,
    saveUninitialized: false,
    duration: 60 * 60 * 100,
    activeDuration: 5 * 60 * 100
  })
);

app.use(bodyParser.json());

//Allow acceess control headers
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var search = require("./match_phrase");


app.post("/search", (req, res) => {
  console.log("in search people");
  console.log("search for:", req.body);
  search.search(req,res);
});

<<<<<<< HEAD
app.post('/autocorrect', function(req,res) {
  console.log("body:",req.body.userInput);
  var request = req.body.userInput;
  request = request.split(' ').join('+');
  console.log("request:",request);
  var request1= request.slice(0,-1);
  console.log("request:",request1);
  const http = require('http');
  http.get('http://18.188.195.95:5000/autoComplete/?phrase='+request1, (resp) => {
  let data = '';
  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });
  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(data);
    res.send(data)
  });
  data1 = data; 
}).on("error", (err) => {
  console.log("Error: " + err.message);
});

  //data1 = {"suggestions": ["Republicans", "to trump\u2014boy bye", "trumpster charged with", "religious trumpians suffer", "trumpians suffer from", "could be trumped", "he stop trumpism?", "exactly is trumpism?", "version of trumpism?", "trumpism: \u2018it\u2019s the"]} ;
  //res.send(data1);
//res.send(data1);

});

=======
>>>>>>> 67f3cb482e9f50910c524dcaf5db12ec04d45651


console.log("Linked Backend!");
app.listen(3001);
console.log("Server Listening on port 3001");