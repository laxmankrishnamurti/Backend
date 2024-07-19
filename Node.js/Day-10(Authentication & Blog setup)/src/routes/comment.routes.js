const express = require("express");
const { handleAddComment } = require("../controllers/comment.controller");

const router = express.Router();

router.route(":id").post(handleAddComment);

module.exports = router;
