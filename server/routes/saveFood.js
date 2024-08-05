var express = require("express");
var router = express.Router();
const SaveFoodController = require("../controllers/saveFood");
const upload = require("../config/multerConfig");

router.get("/", SaveFoodController.getAllSaveFood);

//localhost:3000/SaveFood/5sa4d949qw86d5sa4d6sa
// https://localhost:3000/SaveFood
//req.params.id
router.get("/", SaveFoodController.getAllSaveFood);

router.get("/:date", SaveFoodController.getSaveFoodByDate);

router.delete("/:id", SaveFoodController.deleteSaveFood);

router.put("/:name", SaveFoodController.updateSaveFood);
/*
router.post("/", SaveFoodController.createSaveFood);
*/
router.post(
  "/",
  upload.array("images", 10),
  SaveFoodController.createSaveFood
);
router.put(
  "/:id",
  upload.single("image"),
  SaveFoodController.updateSaveFood
);

module.exports = router;
