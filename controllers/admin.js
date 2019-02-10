const Product = require('../models/product');

const getAddProduct = (req, res, next)=>{
    res.render('admin/edit-product',{    
            pageTitle:'Add Product',
            path: '/admin/add-product',
            editing: false   
        }
    );
};

const postAddProduct = (req, res, next) => {
    const title  = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(null,title, imageUrl, price, description);
    product
    .save()
    .then(() => {
        res.redirect('/');
    })
    .catch(err => console.log(err))
    ;
  
};
const getEditProduct = (req, res, next)=> {
    const editMode = req.query.edit; 
    if(!editMode){
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle : 'Edit Product',
            path: '/admin/edit-product',
            editing: editMode,
            product: product
        });
    });
};

const postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedImageUrl,
        updatedPrice,
        updatedDesc,
    
    );    
    updatedProduct.save();
    res.redirect('/admin/products');
}

const getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('admin/products',{
            prods: products,
            pageTitle:'Admin Products',
            path:'/admin/products'
        })
    });
};

const postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}
module.exports = {
    getAddProduct,
    postAddProduct,
    getEditProduct,
    postEditProduct,
    getProducts,
    postDeleteProduct
}