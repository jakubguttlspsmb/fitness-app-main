const Exercises = require("../models/exercises");
const upload = require('../config/multerConfig');

exports.getAllExercises = async (req, res) => {
  try {
    const result = await Exercises.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Exercises found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Exercises not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getExercisesByName = async (req, res) => {
  try {
    const result = await Exercises.findOne({ name: req.params.name });
    if (result) {
      return res.status(200).send({
        msg: "Exercises found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Exercises not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.getExercisesByCategory = async (req, res) => {
  try {
    const result = await Exercises.find({ category: req.params.category });
    if (result) {
      return res.status(200).send({
        msg: "Exercises found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Exercises not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteExercises = async (req, res) => {
  try {
    const result = await Exercises.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Exercises deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateExercises = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      met: req.body.met,
      category: req.body.category,
    };
    const result = await Exercises.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Exercises updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Exercises was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createExercises = async (req, res) => {
  try {
    const data = new Exercises({
      name: req.body.name,
      met: req.body.met,
      category: req.body.category,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : undefined,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Exercises created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Exercises was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
