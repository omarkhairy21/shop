const Product = require('../models/product');

const getProducts = (req, res, next) => {
    const products =  Product.fetchAll((products)=>{
        res.render('shop/product-list', {
            prods: products,
            pageTitle : 'Shop',
            path: '/',
            hasProducts: products.length > 0
        })
    });
};

const getIndex = (req, res, next) => {
    product.fetchAll(products => {
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