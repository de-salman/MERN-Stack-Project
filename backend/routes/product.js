const router = require('express').Router();
let Product = require('../models/product.model');

router.route('/').get((req,res) => {
    Product.find()
        .then(product => res.json(product))
        .catch(err => res.status(400).json('Error : ' + err));
});

router.route('/add').post((req,res) => {
    const productName = req.body.productName;
    const productDescription = req.body.productDescription;
    const productPrice = Number(req.body.productPrice);
    const productCategory = req.body.productCategory;

    const newProduct = new Product({
        productName,
        productDescription,
        productPrice,
        productCategory
    });

    newProduct.save()
    .then(() => res.json('Product Added'))
    .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/update/:id').post((req,res) => {
    Product.findById(req.params.id)
        .then(product => {
            product.productName = req.body.productName;
            product.productDescription = req.body.productDescription;
            product.productPrice = req.body.productPrice;
            product.productCategory = req.body.productCategory;

            product.save()
                .then(() => res.json('Product updated'))
                .catch(err => res.json('error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.json('error: ' + err));
});

router.route('/:id').delete((req,res) => {
    Product.findByIdAndDelete(req.params.id)
        .then(() => res.json('product deleted'))
        .catch(err => res.status(400).json('error: ' + err));
});




module.exports = router