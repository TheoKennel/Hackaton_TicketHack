var express = require('express');
var router = express.Router();
const Cart = require('../models/cart');


// ajout dans le panier
router.post('/', (req,res)=>{

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

})

module.exports = router;