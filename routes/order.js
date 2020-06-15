const express = require("express");
const router = express.Router();



const {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
  getOrderByUser,
  getOrderByUserId
} = require("../controllers/order");

//params
router.param("orderId", getOrderById);
router.param("userId", getOrderByUserId);



//Actual routes


//create
router.post(
  "/order/create",

  createOrder
);

//update


router.put(
  "/order/:orderId",
 
  updateStatus
);



router.get("/orders", getAllOrders);

router.get("/order/:orderId", getOrderStatus);

router.get("/order/user/:userId", getOrderByUser);






module.exports = router;