const Users = require("../models/users");

exports.getAllUsers = async (req, res) => {
  try {
    const result = await Users.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Users found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Users not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getUsersByName = async (req, res) => {
  try {
    const result = await Users.findOne({ name: req.params.name });
    if (result) {
      return res.status(200).send({
        msg: "Users found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Users not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteUsers = async (req, res) => {
  try {
    const result = await Users.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Users deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUsers = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      fullName: req.body.fullName,
      password: req.body.password,
      ip: req.body.ip,
    };
    const result = await Users.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Users updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Users was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createUsers = async (req, res) => {
  try {
    const data = new Users({
      name: req.body.name,
      fullName: req.body.fullName,
      password: req.body.password,
      ip: req.body.ip,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Users created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Users was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
