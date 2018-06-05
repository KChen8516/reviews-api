if(process.env.NODE_ENV === 'production') {
    console.log('Using production keys');
    module.exports = require('./keys_prod');
} else {
    module.exports = require('./keys_dev');
};