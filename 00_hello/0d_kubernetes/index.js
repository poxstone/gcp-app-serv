// do
function suma(a, b) {
  let resultado = parseInt(a) + parseInt(b);
  return resultado.toString();
}

/* INPUT OUTPUT COMMAND LINE */
/* input outpu */
var express = require('express');
var app = express();

// input: http://localhost:3000/?3=1&b=6
app.get('/', (req, res) => {
  var a = req.query.a || 0;
  var b = req.query.b || 0;

  res.send(suma(a, b));
});

// server
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});
