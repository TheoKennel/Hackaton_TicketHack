const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
	departure: String,
    arrival: String, 
    date: Date, // a mettre en heure
    price: Number,
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;