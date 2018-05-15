const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const cors = require('cors');
// const passport = require('passport');

const keys = require('./config/keys');
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    credentials: true
}

// Load models
require('./models/Review');
require('./models/User');

// Passport Config
// require('./config/passport')(passport);

// Load Routes
// const auth = require('./routes/auth');
const review = require('./routes/reviews');
const user = require('./routes/users');

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

// More Middleware
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));

// Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Set global variables
// app.use((req, res, next) => {
//     res.locals.user = req.user || null;
//     next();
// });

// app.use('/auth', auth);

// Index Route
app.get('/', (req, res) => {
    res.send('INDEX');
});

// User Routes
app.use('/users', user);

// Review Routes
app.use('/reviews', review);

// Port
const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
});

