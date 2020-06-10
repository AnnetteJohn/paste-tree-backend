const express = require("express");
const router = express.Router();
var multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null,file.originalname);
  }
});

var upload = multer({ storage: storage })

const {
  getProductById,
  createProduct,
  getAllproduct,
  getProduct,
  photo,
  updateProduct,
  deleteProduct,
  getProductByCategoryId,
  getProductByCategory,
  getProductByMenuItem,
  getProductByMenuItemId,
  getAllProducts,
  getAllUniqueCategories
} = require("../controllers/product");


//all of params

router.param("productId", getProductById);
router.param("specialId", getProductByCategoryId);
router.param("menuItemId", getProductByMenuItemId);

//all of actual routes
//create route
router.post(
  "/product/create",
  upload.single('productImage'),
  createProduct
);

router.put(

  "/product/:productId", 
  upload.single('productImage'),
  updateProduct
  );

router.get(
    "/product",
    getAllproduct
  );

// // read routes
router.get("/product/:productId", getProduct);

router.get("/product/special/:specialId", getProductByCategory);

router.get("/product/menu/:menuItemId", getProductByMenuItem);



// //delete route
router.delete(
  "/product/:productId",
  deleteProduct
);



module.exports = router;