const express = require('express');
const mongoose = require('mongoose');

const User = mongoose.model('users');
const Review = mongoose.model('reviews');
const router = express.Router();

// Load input validation
const validateReviewInput = require('../validation/review');

// @route  GET /reviews
// @desc   Fetch all reviews
// @access Public
router.get('/', (req, res) => {
    Review.find({})
        .then(reviews => {
            res.send(reviews)
        });
});

// @route  GET /reviews/user/:id
// @desc   Fetch reviews by user
// @access Public
router.get('/user/:id', (req, res) => {
    Review.find({user: req.params.id})
        .then(reviews => res.send(reviews))
        .catch(err => res.status(400).send('Error finding reviews.'));
});


// Fetch single Review
router.get('/:id', (req, res) => {
    Review.findOne({_id: req.params.id})
        .then(review => {res.send(review)});
});

// Fetch edit Review
router.get('/edit/:id', (req, res) => {
    Review.findOne({_id: req.params.id})
        .then(review => {res.send(review)});
});

// Process add Review
router.post('/', (req, res) => {
    const { errors, isValid } = validateReviewInput(req.body);

    // Check validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newReview = {
        user: req.body._id,
        movieTitle: req.body.movieTitle,
        pros: req.body.pros,
        cons: req.body.cons,
        other: req.body.other
    }

    new Review(newReview).save()
        .then(() => {
            res.send('Saved Review');
        });
});

router.put('/edit/:id', (req, res) => {
    Review.findOne({_id: req.params.id})
        .then(review => {

            review.movieTitle = req.body.movieTitle;
            review.pros = req.body.pros;
            review.cons = req.body.cons;
            review.other = req.body.other;
            
            review.save().then(review => console.log('Updated review'));

            res.send('Updated Review.');
        });
})

module.exports = router;