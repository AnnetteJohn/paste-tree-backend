const { Order , ProductCart } = require("../models/order");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name, price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB"
        });
      }
      req.order = order;
      next();
    });
};


exports.getOrderStatus = (req, res) => {
  return res.json(req.order);
};


exports.createOrder = (req, res) => {
    const order = new Order(req.body);
 // const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB"
      });
    }
    res.json(order);
  });
};

// //getOrderById
// exports.getOrderById = (req, res, next, id) => {
//   Order.findById(id).exec((err, order) => {
//     if(err) {
//       return res.status(404).json({
//         error : "Order not found in DB"
//       });
//     }
//    req.order = order;
//    next();
//   });
// };


//updateStatus
exports.updateStatus = (req, res) => {
    
  const order = req.order;
 
  order.status = req.body.status;
  

  order.save((err, updatedStatus) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category"
      });
    }
    res.json({
      message:"Updation was successful",
      updatedStatus
    })
  });
};







exports.getAllOrders =
   (req, res) => 
  {
    Order.find().exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(orders);
    });
  };


  // exports.getOrderStatus = (req, res) => {
  //   const 
  // }



  exports.getOrderByUserId = (req, res, next, id) => {
    Order.find({user : req.params.userId})
      .exec((err, order) => {
        if (err) {
          return res.status(400).json({
            error: "Order not found"
          });
        }
        req.order = order;
        next();
      });
  }

  exports.getOrderByUser = (req, res) => {
    // req.product.photo = undefined;
    return res.json(req.order);
  };
  
  