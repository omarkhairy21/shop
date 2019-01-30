const Product = require('../models/product');

const getAddProduct = (req, res, next)=>{
    res.render('admin/add-product', 
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


module.exports = {
    getAddProduct,
    postAddProduct
}