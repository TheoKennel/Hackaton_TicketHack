var express = require('express');
var router = express.Router();
require('../models/connection')
const Trips = require('../models/trips');
const moment = require('moment/moment');

router.get('/', (req,res) => {
    const { departure, arrival, date } = req.body;
    // const dateUtc = moment.utc(date).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    Trips.find( {
        departure : { $regex: new RegExp(req.body.departure, "i") },
        arrival : { $regex: new RegExp(req.body.arrival, "i") },
        date : date // Date à vérifier, (format à modifier soit en back soit en front)
    }).then(data => {
        if(data.length > 0 ) {
            res.json({ result : true, trajet : data})
        } else {
            res.json({ result : false, error : "Trajet, not found"})
        }
    })
})




module.exports = router;