const SaveFood = require("../models/saveFood");

exports.getAllSaveFood = async (req, res) => {
  try {
    const result = await SaveFood.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "SaveFood found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "SaveFood not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSaveFoodByName = async (req, res) => {
  try {
    const result = await SaveFood.find({ name: req.params.name });
    if (result) {
      return res.status(200).send({
        msg: "SaveFood found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "SaveFood not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSaveFoodByDate = async (req, res) => {
  try {
    const result = await SaveFood.find({ date: req.params.date });
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

exports.deleteSaveFood = async (req, res) => {
  try {
    const result = await SaveFood.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "SaveFood deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateSaveFood = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      foodName: req.body.name,
      kcal: req.body.kcal,
      bil: req.body.bil,
      sach: req.body.sach,
      tuk: req.body.tuk,
      date: req.body.date,
    };
    const result = await SaveFood.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "SaveFood updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "SaveFood was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createSaveFood = async (req, res) => {
  try {
    const data = new SaveFood({
      name: req.body.name,
      foodName: req.body.foodName,
      kcal: req.body.kcal,
      bil: req.body.bil,
      sach: req.body.sach,
      tuk: req.body.tuk,
      date: req.body.date,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "SaveFood created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "SaveFood was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
