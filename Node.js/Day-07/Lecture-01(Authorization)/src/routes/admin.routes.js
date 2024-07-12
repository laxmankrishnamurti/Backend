const express = require("express");
const handleDeleteAdminAction = require("../controllers/admin.controller");

const router = express.Router();

router.route("/:id").delete(handleDeleteAdminAction);

module.exports = router;
