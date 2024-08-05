const Food = require("../models/food");
const upload = require('../config/multerConfig');


exports.getAllFood = async (req, res) => {
  try {
    const result = await Food.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Food found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Food not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getFoodByName = async (req, res) => {
  try {
    const result = await Food.findOne({ name: req.params.name });
    if (result) {
      return res.status(200).send({
        msg: "Food found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Food not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteFood = async (req, res) => {
  try {
    const result = await Food.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Food deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateFood = async (req, res) => {
  try {
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    const data = {
      name: req.body.name,
      kcal: req.body.kcal,
      bil: req.body.bil,
      sach: req.body.sach,
      tuk: req.body.tuk,
      imageUrl: imageUrls,
    };
    const result = await Food.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Food updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Food was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createFood = async (req, res) => {
  try {
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    const data = new Food({
      name: req.body.name,
      kcal: req.body.kcal,
      bil: req.body.bil,
      sach: req.body.sach,
      tuk: req.body.tuk,
      imageUrl: imageUrls,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Food created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Food was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
