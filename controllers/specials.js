const Special = require("../models/specials")



  

  exports.createSpecial = 
  (req, res) =>
    {
   
    const special = new Special(req.body);
   
    special.save((err, special) => 
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
           
          });
        }
        }

       
      res.json({ special });
    });
  };
  


  // exports.getSpecialById = (req, res, next, id) => {
  //   Special.findById(id).exec((err, foundSpecial) => {
  //     if (err) {
  //       return res.status(400).json({
  //         error: "Category not found in DB"
  //       });
  //     }
  //     req.special = foundSpecial;
  //     next();
  //   });
  // };
  
  
  exports.getSpecial = (req, res) => {
    return res.json(req.special);
  };

  exports.getSpecialById = (req, res, next, id) => {
    Special.findById(id)
    .populate("products")    
    .exec((err, foundSpecial) => {
      if (err) {
        return res.status(400).json({
          error: "Category not found in DB"
        });
      }
      req.special = foundSpecial;
      next();
    });
  };
  
  
  exports.getSpecial = (req, res) => {
    return res.json(req.special);
  };
  


  // exports.getAllSpecialItems = (req, res, next, id) => {
  //   Special.findById(id)
  //     .populate("products.product", "name price")
  //     .exec((err, item) => {
  //       if (err) {
  //         return res.status(400).json({
  //           error: "NO order found in DB"
  //         });
  //       }
  //       req.item = item;
  //       next();
  //     });
  // };

  exports.getAllSpecials =
   (req, res) => 
  {
    Special.find().exec((err, specials) => {
      if (err) {
        return res.status(400).json({
          error: "NO categories found"
        });
      }
      res.json(specials);
    });
  };
  





  exports.updateSpecial = (req, res) => {
    
    const special = req.special;
   
    special.name = req.body.name;
  
    special.save((err, updatedSpecial) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to update category"
        });
      }
      res.json(updatedSpecial);
    });
  };
  


  exports.removeSpecial = (req, res) => {
   
   
    const special = req.special;
  
    special.remove((err, special) => {
      if (err) {
        return res.status(400).json({
          error: "Failed to delete this category"
        });
      }
      res.json({
        message: "Successfull deleted"
      });
    });
  };