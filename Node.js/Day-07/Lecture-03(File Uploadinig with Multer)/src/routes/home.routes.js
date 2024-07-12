const express = require("express");
const {
  handleHome,
  handleFileUpload,
} = require("../controllers/home.controller");
const upload = require("../utils/fileUpload.utils");

const router = express.Router();

router
  .route("")
  .get(handleHome)
  .post(
    upload.fields([
      { name: "firstImage" },
      { name: "secondImage" },
      { name: "thirdImage" },
    ]),
    handleFileUpload
  );

module.exports = router;
