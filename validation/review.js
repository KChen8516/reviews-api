const Validator = require("validator");
const isEmpty = require("./is-empty");

const MOVIE_TITLE_MAX = 50;
const MOVIE_TITLE_MIN = 3;

module.exports = function validateReviewInput(data) {
	let errors = {};

	data.movieTitle = !isEmpty(data.movieTitle) ? data.movieTitle : "";
	data._id = !isEmpty(data._id) ? data._id : "";
	data.score = !isEmpty(data.score) ? data.score : "";

	if (!Validator.isLength(data.movieTitle, { min: MOVIE_TITLE_MIN, max: MOVIE_TITLE_MAX })) {
		errors.movieTitle = `'Movie Title' must be between ${MOVIE_TITLE_MIN} and ${MOVIE_TITLE_MAX} characters`;
	}

	if (Validator.isEmpty(data._id)) {
		errors.user = "User cannot be blank";
	}

	if (!Validator.isAlphanumeric(data._id)) {
		errors._id = "ID is not valid";
	}

	if (!Validator.isEmpty(data.score)) {
		if (!Validator.isNumeric(data.score)) {
			errors.score = `'Score' must be an integer or decimal between 0-10`;
		}

		if (Validator.isInt(data.score)) {
			if (!Validator.isInt(data.score, { allow_leading_zeroes: false })) {
				errors.score = `'Score' cannot contain leading zeroes`;
			} else if (!Validator.isInt(data.score, { min: 0, max: 10 })) {
				errors.score = `'Score' must be between 0-10`;
			}
		}

		if (Validator.isDecimal(data.score)) {
			if (!Validator.isDecimal(data.score, { decimal_digits: "0,1" })) {
				errors.score = `'Score' can only contain one trailing number`;
			} else {
				if (
					!Validator.isInt(data.score.split(".")[0], {
						allow_leading_zeroes: false,
					})
				) {
					errors.score = `'Score' cannot contain leading zeroes`;
				} else if (!Validator.isInt(data.score.split(".")[0], { min: 0, max: 10 })) {
					errors.score = `'Score' must be between 0-10`;
				}
			}
		}
	}

	return {
		errors,
		isValid: isEmpty(errors),
	};
};
