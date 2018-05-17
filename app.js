let bodyParser = require('body-parser');
let express = require('express');
let path = require('path');
let exphbs = require('express-handlebars');

let app = express();
let port = process.env.PORT || 3000;



app.engine(".hbs", exphbs({
  defaultLayout: "main",
  extname: ".hbs"
}));
app.set("view engine", ".hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//use for localhost
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/home.js"));

//handles 404 errors.
app.use(function(req, res, next) {

  res.status(404).send("page not found");
});

//handles error 500 errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Server error");
});

let server = app.listen(port, function() {
  console.log('Listening on port %d',port);
});



module.exports = server;
