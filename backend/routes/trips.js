var express = require('express');
var router = express.Router();
require('../models/connection')
const Trips = require('../models/trips')

router.get('/', (req,res) => {
    const { departure, arrival, date } = req.body;
    Trips.find( {
        departure : { $regex: new RegExp(req.body.departure, "i") },
        arrival : { $regex: new RegExp(req.body.arrival, "i") },
        date 
    }).then(data => {
        if(data.length > 0 ) {
            res.json({ result : true, trajet : data})
        } else {
            res.json({ result : false, error : "Trajet, not found"})
        }
    })
})




module.exports = router;