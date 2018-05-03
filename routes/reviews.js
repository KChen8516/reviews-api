const express = require('express');
const mongoose = require('mongoose');

// const User = mongoose.model('users');
const Review = mongoose.model('reviews');
const router = express.Router();

// Fetch all Reviews
router.get('/', (req, res) => {
    Review.find({})
        .then(reviews => {
            res.send(reviews)
        });
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
    let errors = [];

    // Check for errors and push to the errors array, if any
    //if(!req.body.movieTitle){errors.push({'Please add a title'})}
    
    const newReview = {
        movieTitle: req.body.movieTitle,
        pros: req.body.pros,
        cons: req.body.cons,
        other: req.body.other
    }

    new Review(newReview).save().then(() => console.log('Saved Review'));
    
    res.send('Saved Review.');
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