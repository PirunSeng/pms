var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('mongodb://localhost:27017/pms_development');

// CREAT a product
router.post('/', function(req, res) {
  var product_name = req.body.product_name;
  var price        = req.body.price;
  var description  = req.body.description;
  var timestamp    = new Date();

  if(!product_name) {
    return res.status(400).send({
      success: 'false',
      message: 'product_name is required'
    });
  } else if(!price) {
    return res.status(400).send({
      success: 'false',
      message: 'price is required'
    });
  }
  var product = {
    "product_name": product_name,
    "price": price,
    "description": description,
    "timestamp": timestamp
  }

  var db = req.db;
  var products = db.get('products');

  products.insert(product, function(err, product){
    if(err){
      return res.status(400).send({
        success: 'false',
        message: 'There was an error saving the product'
      });
    }else{
      return res.status(201).send({
        success: 'true',
        message: 'product added successfuly',
        product: product
      })
    }
  });
});

// READ Get all products
router.get('/', function(req, res, next) {
  var db = req.db;
  var products = db.get('products');

  products.find({}, {}, function(err, products){
    res.status(200).send({
      success: 'true',
      message: 'products retrieved successfully',
      products: products
    });
  });
});

// READ Show a product
router.get('/:id', function(req, res, next) {
  var db = req.db;
  var products = db.get('products');
  var pid = req.params.id;
  var filter = { _id: pid }

  products.findOne(filter, {}, function(err, product){
    if(!product){
      res.status(404).send({
        success: 'false',
        message: 'Record not found'
      })
    }else{
      res.status(200).send({
        success: 'true',
        message: 'product retrieved successfully',
        product: product
      });
    }
  });
});

// UPDATE a product
router.put('/:id', function(req, res) {
  var pid          = req.params.id;
  var product_name = req.body.product_name;
  var price        = req.body.price;
  var description  = req.body.description;
  var timestamp    = new Date();

  if(!product_name) {
    return res.status(400).send({
      success: 'false',
      message: 'product_name is required'
    });
  } else if(!price) {
    return res.status(400).send({
      success: 'false',
      message: 'price is required'
    });
  }

  var filter    = { _id: pid };
  var db        = req.db;
  var products  = db.get('products');

  products.findOne(filter, {}, function(err, product){
    if(!product){
      return res.status(404).send({
        success: 'false',
        message: 'Record not found'
      })
    }else{
      var product = {
        "product_name": product_name,
        "price": price,
        "description": description,
        "timestamp": timestamp
      }

      var newvalues = { $set: product };
      products.update(filter, newvalues, function(err, product){
        if(!product){
          return res.status(400).send({
            success: 'false',
            message: 'There was an issue updating the product'
          });
        }else{
          return res.status(201).send({
            success: 'true',
            message: 'product updated successfuly',
            product: product
          });
        }
      });
    }
  });
});

// DELETE
router.delete('/:id',  function(req, res){
  var pid      = req.params.id;
  var products = db.get('products');
  var filter   = { _id: pid };
  products.findOne(filter, {}, function(err, product){
    if(!product){
      return res.status(404).send({
        success: 'false',
        message: 'record not found',
      });
    }else{
      products.remove(filter, function(err){
        return res.status(200).send({
          success: 'true',
          message: 'product deleted successfuly',
        });
      });
    }
  });
});

module.exports = router;
