'use strict';

// FUNCTIONS //

/**
* FUNCTION: getPDF( lambda )
*	Returns a probability density function for an exponential distribution with rate `lambda`.
*
* @private
* @param {Number} lambda - distribution rate
* @returns {Function} probability density function (PDF)
*/
function getPDF( lambda ) {
	/**
	* FUNCTION: pdf( x )
	*	Evaluates the probability distribution function at input value `x`.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated PDF
	*/
	return function pdf( x ) {
		return lambda * Math.exp( -lambda*x );
	};
} // end FUNCTION getPDF()

/**
* FUNCTION: getCDF( lambda )
*	Returns a cumulative density function for an exponential distribution with rate `lambda`.
*
* @private
* @param {Number} lambda - distribution rate
* @returns {Function} cumulative density function (CDF)
*/
function getCDF( lambda ) {
	/**
	* FUNCTION: cdf( x )
	*	Evaluates the cumulative distribution function at input value `x`.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated CDF
	*/
	return function cdf( x ) {
		return 1 - Math.exp( -lambda*x );
	};
} // end FUNCTION getCDF()

/**
* FUNCTION: getQuantileFunction( lambda )
*	Returns a quantile function for an exponential distribution with rate `lambda`.
*
* @private
* @param {Number} lambda - distribution lambda
* @returns {Function} quantile function
*/
function getQuantileFunction( lambda ) {
	/**
	* FUNCTION: quantile( x )
	*	Evaluates the quantile function at input value `x`.
	*
	* @private
	* @param {Number} x - input value
	* @returns {Number} evaluated quantile function
	*/
	return function quantile( x ) {
		return -Math.log( 1-x ) / lambda;
	};
} // end FUNCTION getQuantileFunction()


// DISTRIBUTION //

/**
* FUNCTION: Distribution()
*	Distribution constructor.
*
* @constructor
* @returns {Distribution} Distribution instance
*/
function Distribution() {
	this._rate = 1; // lambda
	return this;
} // end FUNCTION Distribution()

/**
* METHOD: support()
*	Returns the distribution support.
*
* @returns {Array} distribution support
*/
Distribution.prototype.support = function() {
	return [ 0, Number.POSITIVE_INFINITY ];
}; // end METHOD support()

/**
* METHOD: rate( [value] )
*	Rate setter and getter. If a value is provided, sets the rate. If no value is provided, returns the rate.
*
* @param {Number} [value] - rate
* @returns {Distribution|Number} Distribution instance or rate
*/
Distribution.prototype.rate = function( value ) {
	if ( !arguments.length ) {
		return this._rate;
	}
	if ( typeof value !== 'number' || value !== value ) {
		throw new TypeError( 'rate()::invalid input argument. The rate must be numeric.' );
	}
	if ( value <= 0 ) {
		throw new Error( 'rate()::invalid input argument. Rate must be greater than 0.' );
	}
	this._rate = value;
	return this;
}; // end METHOD rate()

/**
* METHOD: mean()
*	Returns the distribution mean.
*
* @returns {Number} mean value
*/
Distribution.prototype.mean = function( value ) {
	return 1 / this._rate;
}; // end METHOD mean()

/**
* METHOD: variance()
*	Returns the distribution variance.
*
* @returns {Number} variance
*/
Distribution.prototype.variance = function( value ) {
	var r = this._rate;
	return 1 / ( r*r );
}; // end METHOD variance()

/**
* METHOD: median()
*	Returns the distribution median.
*
* @returns {Number} median
*/
Distribution.prototype.median = function( value ) {
	return Math.log( 2 ) / this._rate;
}; // end METHOD median()

/**
* METHOD: mode()
*	Returns the distribution mode.
*
* @returns {Number} mode
*/
Distribution.prototype.mode = function( value ) {
	return 0;
}; // end METHOD mode()

/**
* METHOD: skewness()
*	Returns the distribution skewness.
*
* @returns {Number} skewness
*/
Distribution.prototype.skewness = function( value ) {
	return 2;
}; // end METHOD skewness()

/**
* METHOD: ekurtosis()
*	Returns the distribution excess kurtosis.
*
* @returns {Number} excess kurtosis
*/
Distribution.prototype.ekurtosis = function( value ) {
	return 6;
}; // end METHOD ekurtosis()

/**
* METHOD: information()
*	Returns the Fisher information.
*
* @returns {Array} Fisher information
*/
Distribution.prototype.information = function() {
	var r = this._rate;
	return 1 / ( r*r );
}; // end METHOD information()

/**
* METHOD: entropy()
*	Returns the entropy.
*
* @returns {Number} entropy
*/
Distribution.prototype.entropy = function() {
	return 1 - Math.log( this._rate );
}; // end METHOD entropy()

/**
* METHOD: pdf( [vec] )
*	If provided an input vector, evaluates the distribution PDF for each vector element. IF no input argument is provided, returns the PDF.
*
* @param {Array} [vec] - 1d input array
* @returns {Function|Array} distribution PDF or evaluated PDF
*/
Distribution.prototype.pdf = function( vec ) {
	var pdf, len, arr, val;

	pdf = getPDF( this._rate );

	if ( !arguments.length ) {
		return pdf;
	}
	if ( !Array.isArray( vec ) ) {
		throw new TypeError( 'pdf()::invalid input argument. Must provide an array.' );
	}
	len = vec.length;
	arr = new Array( len );
	for ( var i = 0; i < len; i++ ) {
		val = vec[ i ];
		if ( typeof val !== 'number' || val !== val ) {
			throw new TypeError( 'pdf()::invalid input argument. Array must only contain numeric values.' );
		}
		if ( val < 0 ) {
			throw new Error( 'pdf()::invalid input argument. Array value must be greater than or equal to 0.' );
		}
		arr[ i ] = pdf( val );
	}
	return arr;
}; // end METHOD pdf()

/**
* METHOD: cdf( [vec] )
*	If provided an input vector, evaluates the distribution CDF for each vector element. IF no input argument is provided, returns the CDF.
*
* @param {Array} [vec] - 1d input array
* @returns {Function|Array} distribution CDF or evaluated CDF
*/
Distribution.prototype.cdf = function( vec ) {
	var cdf, len, arr, val;

	cdf = getCDF( this._rate );

	if ( !arguments.length ) {
		return cdf;
	}
	if ( !Array.isArray( vec ) ) {
		throw new TypeError( 'cdf()::invalid input argument. Must provide an array.' );
	}
	len = vec.length;
	arr = new Array( len );
	for ( var i = 0; i < len; i++ ) {
		val = vec[ i ];
		if ( typeof val !== 'number' || val !== val ) {
			throw new TypeError( 'cdf()::invalid input argument. Array must only contain numeric values.' );
		}
		if ( val < 0 ) {
			throw new Error( 'cdf()::invalid input argument. Array value must be greater than or equal to 0.' );
		}
		arr[ i ] = cdf( val );
	}
	return arr;
}; // end METHOD cdf()

/**
* METHOD: inv( [vec] )
*	If provided an input vector, evaluates the inverse cumulative distribution (quantile) function for each vector element. If no input argument is provided, returns the quantile function.
*
* @param {Array} [vec] - 1d input array
* @returns {Function|Array} distribution quantile function or evaluated quantile function
*/
Distribution.prototype.inv = function( vec ) {
	var q, len, arr, val;

	q = getQuantileFunction( this._rate );

	if ( !arguments.length ) {
		return q;
	}
	if ( !Array.isArray( vec ) ) {
		throw new TypeError( 'inv()::invalid input argument. Must provide an array.' );
	}
	len = vec.length;
	arr = new Array( len );
	for ( var i = 0; i < len; i++ ) {
		val = vec[ i ];
		if ( typeof val !== 'number' || val !== val ) {
			throw new TypeError( 'inv()::invalid input argument. Array must only contain numeric values.' );
		}
		if ( val < 0 || val > 1 ) {
			throw new Error( 'inv()::invalid input argument. Array values must exist on the interval [0,1].' );
		}
		arr[ i ] = q( val );
	}
	return arr;
}; // end METHOD inv()


// EXPORTS //

module.exports = function createDistribution() {
	return new Distribution();
};
