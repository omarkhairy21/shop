const Product = require('../models/product')

const getAddProduct = (req, res, next)=>{
    res.render('add-product', 
        {   pageTitle:'Add Product',
            pageTitle: 'add-product.pug',
            path: '/admin/add-product'   
        }
    );
};

const postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
};


const getProducts = (req, res, next) => {
    const products =  Product.fetchAll((products)=>{
        res.render('shop', {
            prods: products,
            pageTitle : 'Shop',
            path: '/',
            hasProducts: products.length > 0
        })
    });
}

module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts
}