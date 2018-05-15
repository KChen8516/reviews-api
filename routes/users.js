const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// Load User Model
const User = mongoose.model('users');

router.post('/login', (req, res) => {
    // See if the User already exists
    User.findOne({ email: req.body.email })
        .then(user => {
            if(user) {
                return res.status(200).json(user);
                // return res.status(400).json({email: 'Email already exists.'});
            } else {
                const newUser = {
                    googleID: req.body.googleID,
                    displayName: req.body.displayName,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    image: req.body.image
                };

                new User(newUser)
                    .save()
                    .then(
                        user => {
                            res.status(200).json(user);
                        }
                    )
                    .catch(error => res.status(400).send('Failed to save new User.'))
            }
        })
});

module.exports = router;