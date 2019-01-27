var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('mongodb://localhost:27017/pms_development');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.send({ message: 'Cool!' });
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

module.exports = router;
