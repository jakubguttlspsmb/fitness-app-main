var express = require("express");
var router = express.Router();
const ExercisesController = require("../controllers/exercises");
const upload = require('../config/multerConfig');

router.get("/", ExercisesController.getAllExercises);

//localhost:3000/Exercises/5sa4d949qw86d5sa4d6sa
// https://localhost:3000/Exercises
//req.params.id
router.get("/:category/:name", ExercisesController.getExercisesByName);

router.get("/:category", ExercisesController.getExercisesByCategory);

router.delete("/:name", ExercisesController.deleteExercises);

router.put("/:name", ExercisesController.updateExercises);
/*
router.post("/", ExercisesController.createExercises);
*/
router.post('/', upload.array('images', 10), ExercisesController.createExercises);
router.put('/:id', upload.single('image'), ExercisesController.updateExercises);

module.exports = router;
