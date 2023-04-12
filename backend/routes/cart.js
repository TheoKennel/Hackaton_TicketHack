var express = require('express');
var router = express.Router();
const Cart = require('../models/cart');
const Trip = require('../models/trips');


// ajout dans le panier
router.post('/', (req,res)=>{
    const id = req.body.id
    Trip.findById(id)
    .then(data =>{
        console.log(data);
        const newCart = new Cart({
            departure: data.departure,
            arrival: data.arrival,
            date: data.date,
            price: data.price
        })
        .save()
        .then(data=>{
            res.json({result: true, cart: data})
        })
    })
})

//affichage panier
router.get('/', (req, res)=>{
    Cart.find().then(data=>{
        console.log(data)
        if (!data[0]) {
            res.json({result : false})
        }else{
            res.json({result: true, carts : data})
        }
    })
})

//supprimer un element du panier
router.delete('/:id', (req,res)=>{
    const id = req.params.id
    Cart.deleteOne({_id: id})
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


//supprimer tout le panier
router.delete('/', (req, res) =>{
    Cart.deleteMany({})
    .then(()=>{
        res.json({result: true})
    })
})

module.exports = router;