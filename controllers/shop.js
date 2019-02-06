const Product = require('../models/product');
const Cart = require('../models/cart');

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

const getProduct = (req,res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product:product, 
            pageTitle:'Product-Detail', // for which title would be active
            path:'/products' // For Which class would be active 
        });
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

const postCart = (req,res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId,product.price);
    });
    res.redirect('/cart');
}
 
const getOrders = (req, res, next) => {
    res.render('shop/orders',{
        path:'/orders',
        pageTitle:'Your Orders'
    });
}; 

const getCheckout = (req, res, next) => {
    res.render('shop/checkout',{
        path:'checkout',
        pageTitle: 'Checkout'
    });
};

module.exports = {
    getProducts,
    getProduct,
    getIndex,
    getCart,
    postCart,
    getOrders,
    getCheckout
}