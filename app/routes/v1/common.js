var express = require('express');
var router = express.Router();

var ArticleModel = require('../../models/articleModel');
var UserModel = require('../../models/userModel.js');

router.get('/', function (req, res) {
    ArticleModel
        .find()
        .then(function (articles) {
            UserModel.find().then((users) => {

                res.json({
                    articles: articles,
                    users: users
                });
            })
        });
});

router.get('/articleAuthor/:author', function (req, res) {
    var author = req.params.author;
    ArticleModel
        .findOne({
            author: author
        })
        .then((article) => {
            UserModel.findOne({
                screen_name: article.author
            }).then((user) => {
                res.json({
                    article: article.title,
                    user: user._id
                });
            })
        });
});

module.exports = router;