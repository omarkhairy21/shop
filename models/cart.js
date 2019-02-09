const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart  
        fs.readFile(p, (err, fileContent) => {
            let cart = {products:[], totalPrice: 0 };
            if(!err){
                cart = JSON.parse(fileContent);
            }else{
                console.log(err);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex((prod)=> prod.id === id);

            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            // Add new product / increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty += 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }else{
                updatedProduct = {id:id, qty:1};
                cart.products = [...cart.products, updatedProduct];
            }

            cart.totalPrice += +productPrice; 
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice){
        fs.readFile(p , (err, fileContent) => {
            if(err){
                console.log(err);
                return;
            }
            // Copy Cart.json File in JS Object
            const updatedCart  = { ...JSON.parse(fileContent)};
            // Find The product By Id
            const product = updatedCart.products.find(prod => prod.id === id);
            if(!product){
                return;
            }
            // Assign Product Quantities
            const productQty = product.qty;
            // Reassign Updated Cart after Delete product
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            // Calculated The price After Delete The Product
            updatedCart.totalPrice -= productQty * productPrice;

            // Rewrite The file 
            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(callback) {
            fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                callback(null);
             } else {
                callback(cart);
             }
     });

    }
};