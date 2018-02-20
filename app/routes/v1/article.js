var express = require('express');
var router = express.Router();

var ArticleModel = require('../../models/articleModel');

// GET  http://localhost:3000/api/v1/article/test
router.get('/tes', (req, res) => {
    res.json({
        message: "articletest api"
    });
});

router.post('/', function (req, res) {

    // モデル作成．
    var Article = new ArticleModel();

    // データを詰め込む
    Article.title = req.body.title;
    Article.text = req.body.text;
    Article.setDate();
    Article.setAuthor(req.body.author);

    // 保存処理
    Article.save(function (err) {
        if (err) {
            // エラーがあった場合エラーメッセージを返す
            res.send(err);
        } else {
            // エラーがなければ「Success!!」
            res.json({
                message: 'Success!!'
            });
        }
    });
});

router.get('/', function (req, res) {
    ArticleModel
        .find()
        .then(function (articles) {
            res.json(articles);
        });
});

router.get('/:id', function (req, res) {

    var Articleid = req.params.id;
    ArticleModel
        .findById(Articleid, function (err, article) {
            res.json(article);
        });
});


router.delete('/delete/', function (req, res) {
    var articleTitle = req.query.title;

    ArticleModel.remove({
            title: articleTitle
        })
        .then(function () {
            res.json({
                message: 'Success!!'
            });
        });
});

router.delete('/:id', function (req, res) {
    var Articleid = req.params.id;
    ArticleModel.remove({
            _id: Articleid
        })
        .then(function () {
            res.json({
                message: 'Success!!'
            });
        });
});


module.exports = router;