exponential
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Exponential distribution.


## Installation

``` bash
$ npm install distributions-exponential
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var createDist = require( 'distributions-exponential' );
```

To create an exponential distribution,

``` javascript
var dist = createDist();
```

The distribution is configurable and has the following methods...


#### dist.support()

Returns the distribution support, which is all positive real numbers and 0.

``` javascript
dist.support();
// returns [ 0, +inf ]
```


#### dist.rate( [value] )

This method is a setter/getter. If no `value` is provided, returns the `rate`. To set the `rate`,

``` javascript
dist.rate( 100 );
```

The default rate is 1.


#### dist.mean()

Returns the distribution `mean`, which is equal to the inverse `rate`.

``` javascript
dist.mean();
// returns 1/rate
```


#### dist.variance()

Returns the distribution `variance`.

``` javascript
dist.variance();
```


#### dist.median()

Returns the distribution `median`.

``` javascript
var median = dist.median();
```


#### dist.mode()

Returns the distribution `mode`, which is 0.

``` javascript
var mode = dist.mode();
// returns 0
```


#### dist.skewness()

Returns the distribution `skewness`, which is 2.

``` javascript
var skewness = dist.skewness();
// returns 2
```

#### dist.ekurtosis()

Returns the distribution `excess kurtosis`, which is 6.

``` javascript
var excess = dist.ekurtosis();
// returns 6
```


#### dist.information()

Returns the [Fisher information](http://en.wikipedia.org/wiki/Fisher_information), which is equal to the variance.

``` javascript
var info = dist.information();
// equals dist.variance()
```


#### dist.entropy()

Returns the distribution's [differential entropy](http://en.wikipedia.org/wiki/Differential_entropy).

``` javascript
var entropy = dist.entropy();
```

#### dist.pdf( [arr] )

If a vector is not provided, returns the probability density function (PDF). If a vector is provided, evaluates the PDF for each vector element.

``` javascript
var data = [ 0, 1, 10, 100, 1000 ];

var pdf = dist.pdf( data );
// returns [...]
```

#### dist.cdf( [arr] )

If a vector is not provided, returns the cumulative density function (CDF). If a vector is provided, evaluates the CDF for each vector element.

``` javascript
var data = [ 0, 1, 10, 100, 1000 ];

var cdf = dist.cdf( data );
// returns [...]
```


#### dist.quantile( [arr] )

If a cumulative probability vector is not provided, returns a quantile function. If a cumulative probability vector is provided, evaluates the quantile function for each vector element.

``` javascript
var probs = [ 0.025, 0.5, 0.975 ];

var quantiles = dist.quantiles( probs );
// returns [...]
``` 

Note: all vector values must exist on the interval `[0, 1]`.



## Examples

``` javascript
var createDist = require( 'distributions-exponential' );

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
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/distributions-exponential.svg
[npm-url]: https://npmjs.org/package/distributions-exponential

[travis-image]: http://img.shields.io/travis/distributions-io/exponential/master.svg
[travis-url]: https://travis-ci.org/distributions-io/exponential

[coveralls-image]: https://img.shields.io/coveralls/distributions-io/exponential/master.svg
[coveralls-url]: https://coveralls.io/r/distributions-io/exponential?branch=master

[dependencies-image]: http://img.shields.io/david/distributions-io/exponential.svg
[dependencies-url]: https://david-dm.org/distributions-io/exponential

[dev-dependencies-image]: http://img.shields.io/david/dev/distributions-io/exponential.svg
[dev-dependencies-url]: https://david-dm.org/dev/distributions-io/exponential

[github-issues-image]: http://img.shields.io/github/issues/distributions-io/exponential.svg
[github-issues-url]: https://github.com/distributions-io/exponential/issues