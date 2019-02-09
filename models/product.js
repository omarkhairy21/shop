const fs = require('fs');
const path = require('path');

const Cart =require('./cart');

// path.join method joins all given path segments together
const p = path.join(
    // path.dirname method returns the directory Name of a path -returns String- 
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = (callback) => {
    fs.readFile(p,(err, fileContent) => {
        if(err){
            callback([])
        }else{
            callback(JSON.parse(fileContent));
        }
    });
}   
module.exports = class Product{
    constructor(id,title, imageUrl, price, description){
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save(){
        // Updated Product By Id
        getProductsFromFile((products) => {
            // Check if the product Exist and need to updated
            if(this.id) {
                // catch index of the product
                const existingProductIndex = products.findIndex(
                    prod => prod.id === this.id
                );
                // copy products
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p , JSON.stringify(updatedProducts), err => {
                    console.log(err);
                });
            } else {
                // Create Random ID for product object
                this.id = Math.random().toString();
                // products = [];
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err)
                });
            }
        });    
    }
    static deleteById(id) {
        getProductsFromFile((products) => {
            const product = products.find(prod => prod.id === id);
            const updatedProducts = products.filter((p) => {
                console.log(id);
                console.log(p.id);
                return p.id !== id
            });
            fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                if(!err){
                    console.log(product.price)
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }
    static fetchAll(callback){
        getProductsFromFile(callback);
    }
    // Find Product 
    static findById(id,callback){
        getProductsFromFile((products) => {
            const product = products.find(p => p.id === id);
            callback(product);
        });
    }
}