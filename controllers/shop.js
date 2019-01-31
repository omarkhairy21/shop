const Product = require('../models/product');

const getProducts = (req, res, next) => {
        Product.fetchAll((products)=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle : 'All Products',
            path: '/products',
            //hasProducts: products.length > 0
        })
    });
};

const getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index',{
            prods:products,
            pageTitle:'shop',
            path:'/'
        });
    });
};

const getCart = (req, res,  next) => {
    res.render('shop/cart',{
        path: '/cart',
        pageTitle: 'Your Cart'
    })
};
 
const getCheckout = (req, res, next) => {
    res.render('shop/checkout',{
        path:'checkout',
        pageTitle: 'Checkout'
    });
};

module.exports = {
    getProducts,
    getIndex,
    getCart,
    getCheckout
}