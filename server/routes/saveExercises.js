var express = require("express");
var router = express.Router();
const SaveExercisesController = require("../controllers/saveExercises");
const upload = require("../config/multerConfig");

router.get("/", SaveExercisesController.getAllSaveExercises);

//localhost:3000/SaveExercises/5sa4d949qw86d5sa4d6sa
// https://localhost:3000/SaveExercises
//req.params.id
router.get("/", SaveExercisesController.getAllSaveExercises);

router.get("/:date", SaveExercisesController.getSaveExercisesByDate);

router.delete("/:id", SaveExercisesController.deleteSaveExercises);

router.put("/:name", SaveExercisesController.updateSaveExercises);
/*
router.post("/", SaveExercisesController.createSaveExercises);
*/
router.post(
  "/",
  upload.array("images", 10),
  SaveExercisesController.createSaveExercises
);
router.put(
  "/:id",
  upload.single("image"),
  SaveExercisesController.updateSaveExercises
);

module.exports = router;
