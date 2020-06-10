const Product = require("../models/product");
const Special = require("../models/specials")
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
var multer = require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

var upload = multer({ storage: storage })




exports.createProduct = 
(req, res) =>
 {
 
  const product = new Product(req.body);
  product.special = req.body.special;
  
  product.productImagePath = req.file.path;

  
//   product.save((err, product) => 
//   {
//     if (err) {
//         if(err.code === 11000 || err.code === 11001)
//         {
//           return res.status(400).json({
//             error: "Duplicate Value " +req.body.name +",Value must be unique",
          
//           });
//         }
//         else
//         {
//           return res.status(400).json({
//             error: "NOT able to save category in DBs",
//             messgae : err
          
//           });
//         }
//     }
    

//     Special.findOne({special : product.special}).exec((err, special) => {
//         if (special) {
//             // The below two lines will add the newly saved review's 
//             // ObjectID to the the User's reviews array field
//             special.products.push(product);
//             special.save();
//             res.json({ message: 'Special  created!' });
//         }
//     });
//   })
  
//     res.status(500).json({ error });
  
//  }

  product.save((err, product) => 
  {
    if (err) 
    {

      if(err.code === 11000 || err.code === 11001)
      {
        return res.status(400).json({
          error: "Duplicate Value " +req.body.name +",Value must be unique",
         
        });
      }
      else
      {
        return res.status(400).json({
          error: "NOT able to save category in DBs",
          messgae : err
         
        });
      }
      }

     
    res.json({ product });
  });
};


exports.getAllproduct =
   (req, res) => 
  {
    Product.find().exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(product);
    });
  };


exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("menuItem")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};

exports.getProductByCategoryId = (req, res, next, id) => {
  Product.find({special : req.params.specialId})
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
}


exports.getProductByMenuItemId = (req, res, next, id) => {
  Product.find({menuItem : req.params.menuItemId})
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
}


exports.getProduct = (req, res) => {
    // req.product.photo = undefined;
    return res.json(req.product);
  };


exports.getProductByCategory = (req, res) => {
    // req.product.photo = undefined;
    return res.json(req.product);
  };

exports.getProductByMenuItem = (req, res) => {
    // req.product.photo = undefined;
    return res.json(req.product);
  };


// // delete controllers
exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete the product"
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedProduct
    });
  });
};

// // delete controllers



exports.updateProduct = (req, res) => {
  const product = req.product;
  product.name = req.body.name;
  product.price = req.body.price;
  product.description = req.body.description;
  product.menuItem = req.body.menuItem;
  product.special = req.body.special;
  product.stock = req.body.stock;
  
  product.productImagePath = req.file.path;


  product.save((err, updatedProduct) => {
    if(err){
      return res.status(400).json({
        error : "Failed to update Product"
      });
    }
    res.json({
      message : "Updation was successful",
      updatedProduct
    });
  });
};

