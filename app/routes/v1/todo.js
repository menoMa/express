var express = require('express');
var router = express.Router();

var TodoModel = require('../../models/todoModel');

// GET  http://localhost:3000/api/v1/todo/
router.get('/', (req, res) => {
    TodoModel.find()
        .then((todolist) => {
            res.status(200).json(todolist);
        })
        .catch((error) => {
            res.status(500).json({
                message: JSON.stringify(error)
            });
        })
});

router.post('/new', function (req, res) {

    // モデル作成．
    var Todo = new TodoModel();

    // データを詰め込む
    Todo.title = req.body.title;
    Todo.description = req.body.description;
    Todo.isComplete = false;
    Todo.date = req.body.date;


    // 保存処理
    Todo.save((err, result) => {
        if (err) {
            // エラーがあった場合エラーメッセージを返す
            res.send(err);
        } else {
            // エラーがなければ「Success!!」
            res.json({
                message: 'Success!!',
                id: result._id
            });
        }
    });
});

router.put('/update/:id', function (req, res) {
    console.log(req.params.id);
    console.log(req.body);

    TodoModel.findByIdAndUpdate(req.params.id, req.body, (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'update Todo Error'
            });
        } else {
            console.log(result);
            res.status(200).json({
                message: "success update todo"
            });

        }
    })
});

router.delete('/delete/:id', (req, res) => {
    TodoModel.findByIdAndRemove(req.params.id, (error, result) => {
        if (error) {
            res.status(500).json({
                message: 'delete Todo Error'
            });
        } else {
            console.log(result);
            res.status(200).json({
                message: "success delete todo"
            });

        }
    });

});




module.exports = router;