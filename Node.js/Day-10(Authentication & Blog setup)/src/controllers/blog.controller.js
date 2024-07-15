const BLOG = require("../models/blog.model");

function handleGetAddNewBlog(req, res) {
  return res.render("addNewBlog", {
    user: req.user,
  });
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
    return res.redirect("/");
  } else {
    return res.render("addNewBlog", {
      error: "Server error, Please try again",
    });
  }
}

async function handleBlogRender(req, res) {
  const blogId = req.params.id;

  if (!blogId) {
    return res.redirect("/");
  }

  const getRequestedBlog = await BLOG.findOne({ _id: blogId });
  if (getRequestedBlog) {
    return res.render("readBlog", {
      blog: getRequestedBlog,
      user: req.user,
    });
  }
}

module.exports = { handleGetAddNewBlog, handleAddNewBlog, handleBlogRender };
