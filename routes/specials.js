const express = require('express')

const router = express.Router();

const {getSpecialById, createSpecial, getSpecial , getAllSpecials,
       updateSpecial, removeSpecial, getAllSpecialItems } = require("../controllers/specials");

router.param("specialId", getSpecialById);

//create a new special
router.post( "/special/create",  createSpecial );

//get a specific special  by id
router.get("/special/:specialId", getSpecial);

// router.get("/special/:specialId/items", getAllSpecialItems);

//get all specials
router.get("/specials", getAllSpecials);

//update a specific special
router.put("/special/:specialId", updateSpecial );

//delete a menu item
router.delete("/special/:specialId",removeSpecial );


module.exports = router;