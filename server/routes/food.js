var express = require("express");
var router = express.Router();

const FoodController = require("../controllers/food");
const upload = require('../config/multerConfig');


router.get("/", FoodController.getAllFood);

//localhost:3000/Food/5sa4d949qw86d5sa4d6sa
// https://localhost:3000/Food
//req.params.id

router.get("/:name", FoodController.getFoodByName);

router.delete("/:name", FoodController.deleteFood);

router.put("/:name",  upload.single('image'), FoodController.updateFood);

router.post("/", upload.array('images', 10), FoodController.createFood);

module.exports = router;
