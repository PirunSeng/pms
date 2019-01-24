var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('mongodb://localhost:27017/pms_development');

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var db = req.db;
  var products = db.get('products');

  products.find({}, {}, function(err, products){
    // res.send({"products": products});
    res.render('index', {
      "products": products
    });
  });
});

module.exports = router;
