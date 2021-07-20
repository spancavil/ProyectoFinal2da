const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb://localhost:27017/ecommerce2", { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
    console.log('[Mongoose] - connected in: /localhost:27017/ecommerce2');
});

mongoose.connection.on('error', (err) => {
    console.log('[Mongoose] - error:', err);
});

module.exports = connection;