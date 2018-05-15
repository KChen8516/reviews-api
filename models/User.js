const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleID: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    displayName: {
        type: String
    },
    firstName: {
        type: String,        
    },
    lastName: {
        type: String,        
    },
    image: {
        type: String,        
    }
});

mongoose.model('users', UserSchema);