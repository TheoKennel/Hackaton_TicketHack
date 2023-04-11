var express = require('express');
var router = express.Router();
const Cart = require('../models/cart');
const Trip = require('../models/trips');


// ajout dans le panier
router.post('/:id', (req,res)=>{
    const { _id } = req.params;
    Trip.findById(_id)
    .then(data =>{
        const newCart = new Cart({
            departure: data.departure,
            arrival: data.arrival,
            date: data.date,
            price: data.price
        })
        .save()
        .then(res.json({result : true, cart: newCart}))
    })
})

//affichage panier
router.get('/', (req, res)=>{
    Cart.find().then(data=>{
        if (!data) {
            res.json({result : false})
        }else{
            res.json({result: true, trips : data})
        }
    })
})

//supprimer un element du panier
router.delete('/:id', (req,res)=>{
    Cart.deleteOne(id)
    .then(deleteDoc =>{
        if (deleteDoc.deletedCount > 0) {
            Cart.find().then(data=>{
                res.json({result: true, cart: data})
            })
        }else{
            res.json({result: false, error : "problème suppression"})
        }
    })
})


module.exports = router;