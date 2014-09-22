
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	createDist = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'distributions-exponential', function tests() {
	'use strict';

	// SETUP //

	var dist;

	beforeEach( function() {
		dist = createDist();
	});


	// TESTS //

	it( 'should export a function', function test() {
		expect( createDist ).to.be.a( 'function' );
	});

	describe( 'support', function tests() {

		it( 'should provide a method to get the distribution support', function test() {
			expect( dist.support ).to.be.a( 'function' );
		});

		it( 'should return the support', function test() {
			assert.deepEqual( dist.support(), [ 0, Number.POSITIVE_INFINITY ] );
		});

	}); // end TESTS support

	describe( 'rate', function tests() {

		it( 'should provide a setter/getter for the distribution rate', function test() {
			expect( dist.rate ).to.be.a( 'function' );
		});

		it( 'should throw an error if not provided a numeric value', function test() {
			var values = [
					'5',
					true,
					undefined,
					null,
					NaN,
					[],
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.rate( value );
				};
			}
		});

		it( 'should throw an error if given a rate less than or equal to 0', function test() {
			expect( badValue( 0 ) ).to.throw( Error );
			expect( badValue( -1 ) ).to.throw( Error );

			function badValue( value ) {
				return function() {
					dist.rate( value );
				};
			}
		});

		it( 'should set the rate', function test() {
			dist.rate( 10 );
			assert.strictEqual( dist.rate(), 10 );
		});

	}); // end TESTS rate

	describe( 'mean', function tests() {

		it( 'should provide a method for the distribution mean', function test() {
			expect( dist.mean ).to.be.a( 'function' );
		});

		it( 'should return the distribution mean', function test() {
			dist.rate( 10 );
			assert.strictEqual( dist.mean(), 0.1 );
		});

	}); // end TESTS mean

	describe( 'variance', function tests() {

		it( 'should provide a method for the distribution variance', function test() {
			expect( dist.variance ).to.be.a( 'function' );
		});

		it( 'should return the distribution variance', function test() {
			dist.rate( 10 );
			assert.strictEqual( dist.variance(), 0.01 );
		});

	}); // end TESTS variance

	describe( 'median', function tests() {

		it( 'should provide a method to get the distribution median', function test() {
			expect( dist.median ).to.be.a( 'function' );
		});

		it( 'should return the median value', function test() {
			dist.rate( 10 );
			assert.strictEqual( dist.median(), 0.1*Math.log(2) );
		});

	}); // end TESTS median

	describe( 'mode', function tests() {

		it( 'should provide a method to get the distribution mode', function test() {
			expect( dist.mode ).to.be.a( 'function' );
		});

		it( 'should return the mode which is 0', function test() {
			assert.strictEqual( dist.mode(), 0 );
		});

	}); // end TESTS mode

	describe( 'skewness', function tests() {

		it( 'should provide a method to get the distribution skewness', function test() {
			expect( dist.skewness ).to.be.a( 'function' );
		});

		it( 'should return the skewness, which is 2', function test() {
			assert.strictEqual( dist.skewness(), 2 );
		});

	}); // end TESTS skewness

	describe( 'excess kurtosis', function tests() {

		it( 'should provide a method to get the distribution excess kurtosis', function test() {
			expect( dist.ekurtosis ).to.be.a( 'function' );
		});

		it( 'should return the excess kurtosis, which is 6', function test() {
			assert.strictEqual( dist.ekurtosis(), 6 );
		});

	}); // end TESTS kurtosis

	describe( 'entropy', function tests() {

		it( 'should provide a method to get the distribution entropy', function test() {
			expect( dist.entropy ).to.be.a( 'function' );
		});

		it( 'should return the distribution entropy', function test() {
			dist.rate( Math.E );
			assert.strictEqual( dist.entropy(), 0 );
		});

	}); // end TESTS entropy

	describe( 'information', function tests() {

		it( 'should provide a method to get the distribution information', function test() {
			expect( dist.information ).to.be.a( 'function' );
		});

		it( 'should return the distribution information', function test() {
			dist.rate( 10 );
			assert.strictEqual( dist.information(), 0.01 );
		});

	}); // end TESTS information

	describe( 'pdf', function tests() {

		it( 'should provide a method to get/evaluate the distribution PDF', function test() {
			expect( dist.pdf ).to.be.a( 'function' );
		});

		it( 'should return a function', function test() {
			expect( dist.pdf() ).to.be.a( 'function' );
		});

		it( 'should throw an error if not provided an array', function test() {
			var values = [
					5,
					'5',
					true,
					undefined,
					null,
					NaN,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.pdf( value );
				};
			}
		});

		it( 'should throw an error if array contains non-numeric values', function test() {
			var values = [
					[],
					'5',
					true,
					undefined,
					null,
					NaN,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.pdf( [value] );
				};
			}
		});

		it( 'should evaluate the pdf' );

	}); // end TESTS pdf

	describe( 'cdf', function tests() {

		it( 'should provide a method to get/evaluate the distribution CDF', function test() {
			expect( dist.cdf ).to.be.a( 'function' );
		});

		it( 'should return a function', function test() {
			expect( dist.cdf() ).to.be.a( 'function' );
		});

		it( 'should throw an error if not provided an array', function test() {
			var values = [
					5,
					'5',
					true,
					undefined,
					null,
					NaN,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.cdf( value );
				};
			}
		});

		it( 'should throw an error if array contains non-numeric values', function test() {
			var values = [
					[],
					'5',
					true,
					undefined,
					null,
					NaN,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.cdf( [value] );
				};
			}
		});

		it( 'should evaluate the cdf' );

	}); // end TESTS cdf

	describe( 'quantile', function test() {

		it( 'should provide a method to get/evaluate the distribution quantile function', function test() {
			expect( dist.quantile ).to.be.a( 'function' );
		});

		it( 'should return a function', function test() {
			expect( dist.quantile() ).to.be.a( 'function' );
		});

		it( 'should throw an error if not provided an array', function test() {
			var values = [
					5,
					'5',
					true,
					undefined,
					null,
					NaN,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.quantile( value );
				};
			}
		});

		it( 'should throw an error if array contains non-numeric values', function test() {
			var values = [
					[],
					'5',
					true,
					undefined,
					null,
					NaN,
					{},
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					dist.quantile( [value] );
				};
			}
		});

		it( 'should throw an error if array contains numeric values not on the interval [0,1]', function test() {
			var values = [ -0.01, 1.01 ];
			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}
			function badValue( value ) {
				return function() {
					dist.quantile( [value] );
				};
			}
		});

		it( 'should evaluate the quantile function' );

	}); // end TESTS quantile

});