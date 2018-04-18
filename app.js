const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const keys = require('./config/keys');
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

// Load models
require('./models/Review');

// Load Routes
const review = require('./routes/reviews');

const app = express();

// Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected.'))
    .catch(err => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// CORS configuration
app.use(cors(corsOptions));

// Index Route
app.get('/', (req, res) => {
    res.send('INDEX');
});

// Review Routes
app.use('/reviews', review);

// Port
const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
});

