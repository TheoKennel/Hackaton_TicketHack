var express = require('express');
var router = express.Router();
const booking = require('../models/booking')
const Cart = require('../models/cart')

// Ajout dans le booking
router.post('/:id', (req,res)=> {
    const id = req.params.id
    Cart.findById(id)
    .then(data =>{
        console.log(data);
        const newBooking = new booking({
            departure: data.departure,
            arrival: data.arrival,
            date: data.date,
            price: data.price
        })
        newBooking.save()
        .then(data=>{
            res.json({result: true, booking: data})
        })
    })
})


// Affichage dans booking
router.get('/', (req,res) => {
    booking.find().then(data => {
    if(!data) {
        res.json({result : false})
    } else {
        res.json({result: true, bookings : data})
    }
    })
})


module.exports = router;