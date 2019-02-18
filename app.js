const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const {get404} = require('./controllers/error');

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'pug');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) => {
    User.findByPk(1).then(user => {
        console.log(`${req.user} **********`); // undefined
        console.log(user);
        req.user = user;
        next();
        console.log('/*****************************************************************/')
        console.log(`${req.user} **********`);
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminData.router);
app.use(shopRoutes);

app.use(get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

   // Force for State changes in products tables
sequelize.sync()
  .then(result => {
      return User.findByPk(1);
    // console.log(result);
  })
    .then (user => {
        if(!user) {
            return User.create({name:'Omakr' , email:'Teste@test.com'});
        }
        return user;
    })
    .then(user => {
        app.listen(9000);
    })
  .catch(err => {
    console.log(err);
  });


