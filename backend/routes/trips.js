var express = require('express');
var router = express.Router();
require('../models/connection')
const Trips = require('../models/trips');
const moment = require('moment');

router.get('/', (req,res) => {
    const { departure, arrival, date } = req.query;
    const dateDebut = moment(date).startOf('day')
    const dateFin = moment(date).endOf('day')

    Trips.find( {
        departure : { $regex: new RegExp(departure, "i") },
        arrival : { $regex: new RegExp(arrival, "i") },
        date : {$gte: dateDebut,
                 $lte: dateFin}// Date à vérifier, (format à modifier soit en back soit en front)
    }).then(data => {
        if(data) {
            res.json({ result : true, trajet : data})
        } else {
            res.json({ result : false, error : "Trajet, not found"})
        }
    })
})
// StartOf(), endOf()



module.exports = router;

