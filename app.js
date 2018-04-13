const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('INDEX');
});

app.listen(port,() => {
    console.log(`Server listening on port ${port}`);
});

