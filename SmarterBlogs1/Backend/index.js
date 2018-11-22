var express = require("express");

var app = express();
var bodyParser = require("body-parser");
var session = require("express-session");
var cookieParser = require("cookie-parser");

var cors = require("cors");

//set up cors
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//set up session variable

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



console.log("Linked Backend!");
app.listen(3001);
console.log("Server Listening on port 3001");