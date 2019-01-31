const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, price, description){
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save(){
        getProductsFromFile((products) => {
            // products = [];
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err)
            });
        });

    }

    static fetchAll(callback){
        getProductsFromFile(callback);
    }   
}