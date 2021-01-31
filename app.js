const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('6015ba65fd54b55a741dc9eb')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://clonghurst:cse341Shop@cluster0.6siqs.mongodb.net/shop?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'User',
          email: 'user@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(process.env.PORT || 5000, function(){
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
    });
  })
  .catch(err => {
    console.log(err);
  });
