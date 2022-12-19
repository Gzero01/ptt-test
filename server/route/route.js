const express = require("express");
const router = express.Router();
const itemController = require("../controller/itemController");
const multer = require("multer");
const upload = multer({ dest: "../public/images/" });

router.post("/additem", upload.single("Picture"), itemController.additem);

router.route("/getitem").get(itemController.getitem);

module.exports = router;
