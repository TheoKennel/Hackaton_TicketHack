var express = require('express');
var router = express.Router();
const booking = require('../models/booking')
const Cart = require('../models/cart');

// Ajout dans le booking
router.post('/', (req,res)=> {
    Cart.find()
    .then(data =>{
        if(!data.length > 1) {
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
        } else {
            for(let i=0; i < data.length; i++) {
                const newBooking = new booking({
                    departure: data[i].departure,
                    arrival: data[i].arrival,
                    date: data[i].date,
                    price: data[i].price
                })
                newBooking.save()
                .then(data=>{
                    let dataTabl = []
                    dataTabl.push(data)})
            } 
            res.json({ result: true })              
        }
        })
    })



// Affichage dans booking
router.get('/', (req,res) => {
    booking.find().then(data => {
    if(!data[0]) {
        res.json({result : false})
    } else {
        res.json({result: true, bookings : data})
    }
    })
})


module.exports = router;