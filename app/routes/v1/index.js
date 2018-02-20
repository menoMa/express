var express = require('express');
// ルーティングする
var router = express.Router();

// routerにルーティングの動作を書いてく

// localhost:3000/api/v1/ 以降のパスを指定する
// router.get('/',function(req,res){
//     res.json({
//         message:"Hello,world"
//     });
// });

// ファイルに分ける
router.use('/article', require('./article.js'));
router.use('/user', require('./user.js'));
router.use('/common', require('./common.js'));

//routerをモジュールとして扱う準備
module.exports = router;