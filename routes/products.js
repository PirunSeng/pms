var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('mongodb://localhost:27017/pms_development');

// READ
router.get('/show/:id', function(req, res, next){
  var db = req.db;
  var products = db.get('products');

  products.findOne({ _id: req.params.id }, {}, function(err, product){
    if(!product){
      res.render('error', {
        message: 'Record not found',
        error: {
          status: 404
        }
      });
    }else{
      res.render('show', {
        "product": product
      });
    }
  });
});

// GET
router.get('/add', function(req, res, next){
  res.render('addproduct', {
    "title": "Add Product"
  });
});

// GET
router.get('/edit/:id', function(req, res, next){
  var db = req.db;
  var products = db.get('products');

  products.findOne({ _id: req.params.id }, {}, function(err, product){
    if(!product){
      res.render('error', {
        message: 'Record not found',
        error: {
          status: 404
        }
      });
    }else{
      res.render('edit', {
        "product": product
      });
    }
  });
});

// CREATE
router.post('/add', function(req, res, next){
  var product_name = req.body.product_name;
  var price        = req.body.price;
  var description  = req.body.description;
  var timestamp    = new Date();

  // form validation
  req.checkBody('product_name', 'Product name is required').notEmpty();
  req.checkBody('price', 'Price is required').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    res.render('addproduct', {
      errors: errors,
      product_name: product_name,
      price: price
    });
  }else{
    var products = db.get('products');
    // submit to db
    products.insert({
      "product_name": product_name,
      "price": price,
      "description": description,
      "timestamp": timestamp
    }, function(err, product){
      if(err){
        res.send('There was an issue saving the product.')
      }else{
        req.flash('success', 'Product submitted!');
        res.location('/');
        res.redirect('/');
      }
    });
  }
});

// UPDATE
router.post('/update/:id', function(req, res, next){
  var product_name = req.body.product_name;
  var price       = req.body.price;
  var description = req.body.description;
  // var timestamp   = new Date();
  var pid         = req.params.id;
  var products    = db.get('products');

  // form validation
  req.checkBody('product_name', 'Product name is required').notEmpty();
  req.checkBody('price', 'Price is required').notEmpty();
  var errors = req.validationErrors();
  if(errors){
    products.findOne({ _id: pid }, {}, function(err, product){
      res.render('edit', {
        "product": product,
        errors: errors
      });
    });
  }else{
    // submit to db
    var filter = { _id: pid };
    var newvalues = { $set: { "product_name": product_name, "price": price, "description": description } };
    products.update(filter, newvalues, function(err, product){
      if(err){
        res.send('There was an issue updating the product.')
      }else{
        req.flash('success', 'Product updated!');
        res.location('/');
        res.redirect('/');
      }
    });
  }
});

// DELETE
router.delete('/delete/:id',  function(req, res){
  var pid         = req.params.id;
  var products = db.get('products');
  var filter = { _id: pid };
  products.remove(filter, function(err){
    if(err){
      res.send('There was an issue deleting the product.')
    }else{
      req.flash('success', 'Product deleted!');
    }
  });
});

module.exports = router;

// todo : add all remaining fields including image or drop table and create again.
