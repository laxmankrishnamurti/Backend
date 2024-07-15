const BLOG = require("../models/blog.model");
const COMMENT = require("../models/comment.model");

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

  const getRequestedBlog = await BLOG.findOne({ _id: blogId }).populate(
    "createdBy"
  );
  const getAllBlogComment = await COMMENT.find({ blogId: blogId }).populate(
    "userId"
  );

  if (getRequestedBlog) {
    return res.render("readBlog", {
      blog: getRequestedBlog,
      user: req.user,
      comments: getAllBlogComment,
    });
  }
}

/**
 * Comment Controllers
 */

async function handleAddComment(req, res) {
  const blogId = req.params.blogId;

  const newComment = await COMMENT.create({
    comment: req.body.comment,
    blogId: blogId,
    userId: req.user._id,
  });

  if (newComment) {
    return res.redirect(`/blog/${blogId}`);
  }
}

module.exports = {
  handleGetAddNewBlog,
  handleAddNewBlog,
  handleBlogRender,
  handleAddComment,
};
