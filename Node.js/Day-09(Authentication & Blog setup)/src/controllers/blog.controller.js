const BLOG = require("../models/blog.model");

function handleGetAddNewBlog(req, res) {
  return res.render("addNewBlog");
}

async function handleAddNewBlog(req, res) {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.render("addNewBlog", {
      error: "title and body are required",
    });
  }

  const newBlog = await BLOG.create({
    title: title,
    body: body,
    coverImageUrl: `/uploads/${req.file.filename}`,
    createdBy: req.user._id,
  });

  if (newBlog) {
    console.log("newBlogInfo :: ", newBlog);
    return res.redirect("/");
  } else {
    return res.render("addNewBlog", {
      error: "Server error, Please try again",
    });
  }
}

module.exports = { handleGetAddNewBlog, handleAddNewBlog };
