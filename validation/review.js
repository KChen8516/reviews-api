const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateReviewInput (data) {
    let errors = {};

    data.movieTitle = !isEmpty(data.movieTitle) ? data.movieTitle : '';

    if(!Validator.isLength(data.movieTitle, {min: 3, max: 30})) {
        errors.movieTitle = '\'Movie Title\' must be between 3 and 30 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};