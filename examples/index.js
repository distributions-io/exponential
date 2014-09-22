var createDist = require( './../lib' );

// Define the distribution parameters...
var rate = 0.1,
	xLow = 0,
	xHigh = 200;

// Create a vector...
var vec = new Array( 1000 ),
	len = vec.length,
	inc;

inc = ( xHigh - xLow ) / len;

for ( var i = 0; i < len; i++ ) {
	vec[ i ] = inc * i;
}

// Create an exponential distribution and configure...
var dist = createDist().rate( rate );

// Evaluate the probability density function over the vector...
var pdf = dist.pdf( vec );

var arr = new Array( 100 );
for ( var j = 0; j < arr.length; j++ ) {
	arr[ j ] = [ vec[j], pdf[j] ];
}
console.log( arr );

// Evaluate the quantile function for canonical cumulative probability values...
var quantiles = dist.quantile( [ 0.025, 0.5, 0.975 ] );

console.log( quantiles );