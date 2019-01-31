const Product = require('../models/product');

const getAddProduct = (req, res, next)=>{
    res.render('admin/add-product',{    
            pageTitle:'Add Product',
            path: '/admin/add-product'   
        }
    );
};

const postAddProduct = (req, res, next) => {
    const title  = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, price, description);
    product.save();
    res.redirect('/');
};

const getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('/admin/products',{
            prods: products,
            pageTitle:'Admin Products',
            path:'/admin/products'
        })
    });
};
module.exports = {
    getAddProduct,
    postAddProduct,
    getProducts
}