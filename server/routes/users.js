var express = require("express");
var router = express.Router();

const UsersController = require("../controllers/users");

router.get("/", UsersController.getAllUsers);

//localhost:3000/Users/5sa4d949qw86d5sa4d6sa
// https://localhost:3000/Users
//req.params.id

router.get("/:name", UsersController.getUsersByName);

router.delete("/:name", UsersController.deleteUsers);

router.put("/:name", UsersController.updateUsers);

router.post("/", UsersController.createUsers);

module.exports = router;
