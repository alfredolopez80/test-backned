var controller = require("./controller");
var express = require("express");
var router = express.Router();

router.route("/").get(controller.getTest);

router.route("/test").post(controller.postMinimalTime);

router.route("*").get(controller.get404);

module.exports = router;
