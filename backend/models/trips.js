const mongoose = require('mongoose');

const tripsSchema = mongoose.Schema({
	departure : String,
    arrival : String, 
    date: Date, // a mettre en heure
    price : Number,
});

const Trips = mongoose.model('trips', tripsSchema);

module.exports = Trips;