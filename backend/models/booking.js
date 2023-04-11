const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
	departure : String,
    arrival : String, 
    date: Date, // a mettre en heure
    price : Number,
});

const Booking = mongoose.model('booking', bookingSchema);

module.exports = Booking;