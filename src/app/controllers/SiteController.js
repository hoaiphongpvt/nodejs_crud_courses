class NewsController {
    // [GET] /
    index(req, res) {
        res.render('home');
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new NewsController();
