const express = require('express');
const mongoose = require('mongoose');

// const User = mongoose.model('users');
const Review = mongoose.model('reviews');
const router = express.Router();

router.get('/', (req, res) => {
    Review.find({})
        .then(reviews => {
            res.send({data: reviews})
        });
});

// Process add Review
router.post('/', (req, res) => {
    let errors = [];

    // Check for errors and push to the errors array, if any
    //if(!req.body.movieTitle){errors.push({'Please add a title'})}
    
    const newReview = {
        movieTitle: req.body.movieTitle,
        pros: req.body.pros || [],
        cons: req.body.cons || [],
        other: req.body.other || []
    }

    new Review(newReview).save().then(() => console.log('Saved Review'));
    
    res.send('Saved Review.');
});

module.exports = router;