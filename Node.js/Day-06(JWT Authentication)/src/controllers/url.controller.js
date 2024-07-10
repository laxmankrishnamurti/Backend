const URL = require("../models/urlShortner.model");
const { getUser } = require("../utils/authJWT.utils");
const generateNerShortID = require("../utils/generateNewShortID");

function handleSuccess(req, res) {
  res.render("success");
}

async function handleGenerateNewShortID(req, res) {
  const url = req.body.url;
  const loginToken = req.cookies.loginToken;

  if (!url) {
    return res.status(400).render("generateShortID", {
      status: "false",
    });
  }

  const generatedID = generateNerShortID(8);
  const loggedInUserInfo = getUser(loginToken);

  const result = await URL.create({
    shortID: generatedID,
    redirectURL: url,
    visitHistory: [],
    createdBy: loggedInUserInfo.id,
  });

  if (result) {
    // res.status(201).render("generateShortID", { id: result.shortID });
    res.status(201).redirect("/");
  } else {
    res.status(500).json({
      status: false,
      msg: "Internal server error! Something went wrong while creating a shortID for the URL.",
    });
  }
}

async function handleURL(req, res) {
  const url = req.params.id;

  if (!url) {
    return res.status(400).json({
      status: false,
      msg: "url id is required",
    });
  }

  const result = await URL.findOneAndUpdate(
    { shortID: url },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  if (result) {
    return res.redirect(result.redirectURL);
  } else {
    return res.status(400).json({
      status: false,
      msg: "ID dosen't exist!!!",
    });
  }
}

async function handleURLAnalytics(req, res) {
  const id = req.params.id;

  if (!id) {
    return res.status(400).json({
      status: false,
      msg: "shortID is required to check analytics",
    });
  }

  const result = await URL.findOne({ shortID: id });

  if (result) {
    return res.status(200).render("analytics", {
      totalClicks: result.visitHistory.length,
      visitHistory: result.visitHistory,
    });
  } else {
    return res.status(400).json({
      status: false,
      msg: "The shortID dosen't exist!!!",
    });
  }
}

module.exports = {
  handleGenerateNewShortID,
  handleURL,
  handleURLAnalytics,
  handleSuccess,
};
