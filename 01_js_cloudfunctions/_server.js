var express = require('express');
const bodyParser = require("body-parser");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', (req, res) => {
  var indexjs = require('./index.js');
  indexjs.jsStress(req, res);
});

app.listen(4000, () => {
  console.log('Example app listening on port 4000!');
});
