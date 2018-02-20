var express = require('express');
var router = express.Router();
var UserModel = require('../../models/userModel.js');

// GET  http://localhost:3000/api/v1/user/test

// ユーザ取得
router.get('/', (req, res) => {
    UserModel.find().then((users) => {
        res.json(users);
    })
})

router.get('/:id', function (req, res) {

    var Userid = req.params.id;
    UserModel
        .findById(Userid, function (err, user) {
            res.json(user);
        });
});

//ユーザ登録
router.post('/', (req, res) => {
    // モデル作成．
    var User = new UserModel();

    // データを詰め込む
    User.name = req.body.name;
    User.screen_name = req.body.screen_name;
    User.bio = req.body.bio;

    User.save((err) => {
        err ? res.send(err) : res.json({
            mesage: "success save user"
        });
    })
})

// ユーザ編集
router.put('/:id', (req, res) => {

    var Userid = req.params.id;

    UserModel.findById(Userid, function (err, user) {
        if (err) {
            res.send(err);
        } else {
            var err = updateUser(req, user);
            if (err) {
                res.send(err);
            } else {
                res.json({
                    message: 'Success!'
                });
            }
        }
    });
});

function updateUser(req, user) {
    user.name = req.body.name
    user.screen_name = req.body.screen_name
    user.bio = req.body.bio

    return user.save((err) => {
        return err;
    })
}

//routerをモジュールとして扱う準備
module.exports = router;