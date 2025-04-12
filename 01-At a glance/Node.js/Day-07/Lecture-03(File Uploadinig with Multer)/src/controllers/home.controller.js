function handleHome(req, res) {
  return res.render("home");
}

async function handleFileUpload(req, res) {
  return res.end("<h1>File uploaded successfully</h1>");
}

module.exports = { handleHome, handleFileUpload };
