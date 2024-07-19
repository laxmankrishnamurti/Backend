async function handleAddComment(req, res) {
  const blogId = req.params.id;
  console.log(req.body);
  return res.redirect(`/blog/${blogId}`);
}

module.exports = { handleAddComment };
