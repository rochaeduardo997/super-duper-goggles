class HomeController {
  async index(req, res) {
    res.json({
      success: "Index page from /"
    })
  }
}

module.exports = new HomeController();
