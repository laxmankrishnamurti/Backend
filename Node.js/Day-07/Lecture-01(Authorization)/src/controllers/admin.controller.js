const URL = require("../models/urlShortner.model");

async function handleDeleteAdminAction(req, res) {
  const urlId = req.params.id;

  const isDeleted = await URL.findOneAndDelete({ _id: urlId });

  if (isDeleted) {
    return res.status(200);
  } else {
    return res.render("home", {
      status: false,
      msg: "Internal server error, Delete again",
    });
  }
}

module.exports = handleDeleteAdminAction;
