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
    const prodId = req.body.productId;
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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            for (product of products){
                const cartProductData = cart.products.find(
                    prod => prod.id === product.id
                );
                if (cartProductData){
                    cartProducts.push({productData: product, qty: cartProductData.qty})
                }
            };
            res.render('shop/cart',{
                path: 'cart',
                pageTitle: 'Your Cart',
                products:cartProducts
            });
        });
    });
};

const postCart = (req,res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
}

const postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })
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
    postCartDeleteProduct,
    getOrders,
    getCheckout
}