const express = require('express');
const router = express.Router();
const verify = require('./verifyToken')
const Product = require('../models/Product')

//get all products
router.get('/', verify , async (req, res) =>{
    try{
        const products = await Product.find();
        res.send(products);
    } catch (err){
        res.send({message: err})
    }

});


//new product
router.post('/',  async (req,res) => {
    console.log(req.body);
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image
    });
    try {
        const savedProduct = await product.save()
        res.send(savedProduct)
    } catch (err) {
        res.send({message : err});
    }
});

//get product by id
router.get('/:productId', async (req,res) =>{
    console.log(req.params.productId);
    try{
        const product = await Product.findById(req.params.productId);
        res.send(product);
    } catch (err){
        res.send({message: err});
    }
});

//delete post
router.delete('/:productId', async (req,res) =>{
    try{
        const removedProduct = await Product.deleteOne({_id: req.params.productId});
        res.send(removedProduct);
    } catch (err){
        res.send({message: err});
    }
});

//update the title of a product
router.patch('/:productId', async (req,res) =>{
    try{
        const patchedProduct = await Product.updateOne(
            {_id: req.params.productId},
            { $set: { title: req.body.title } }
            );
        res.send(patchedProduct);
    } catch (err){
        res.send({message: err});
    }
});

module.exports = router;
