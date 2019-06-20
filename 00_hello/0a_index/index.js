// do
function suma(a, b) {
    let resultado = parseInt(a) + parseInt(b);
    return resultado.toString();
}

/* INPUT OUTPUT COMMAND LINE */
// input: node indes.js 3 6
var a = process.argv[2];
var b = process.argv[3];

// output
console.log(suma(a, b));
