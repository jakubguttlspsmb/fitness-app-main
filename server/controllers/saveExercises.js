const SaveExercises = require("../models/saveExercises");

exports.getAllSaveExercises = async (req, res) => {
  try {
    const result = await SaveExercises.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "SaveExercises found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "SaveExercises not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSaveExercisesByDate = async (req, res) => {
  try {
    const result = await SaveExercises.find({ date: req.params.date });
    if (result) {
      return res.status(200).send({
        msg: "SaveExercises found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "SaveExercises not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getSaveExercisesByName = async (req, res) => {
  try {
    const result = await SaveExercises.find({ name: req.params.name });
    if (result) {
      return res.status(200).send({
        msg: "SaveExercises found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "SaveExercises not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteSaveExercises = async (req, res) => {
  try {
    const result = await SaveExercises.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "SaveExercises deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateSaveExercises = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      exerciseName: req.body.exerciseName,
      calories: req.body.calories,
      category: req.body.category,
      date: req.body.date,
    };
    const result = await SaveExercises.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "SaveExercises updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "SaveExercises was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createSaveExercises = async (req, res) => {
  try {
    const data = new SaveExercises({
      name: req.body.name,
      exerciseName: req.body.exerciseName,
      calories: req.body.calories,
      category: req.body.category,
      date: req.body.date,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "SaveExercises created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "SaveExercises was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
