var mongoose = require('mongoose'); //mongoDBに接続するためのライブラリ
var Schema = mongoose.Schema; //mongoDBのスキーマを作る
var moment = require('moment');
var defaultAuthor = "menom";

var TodoSchema = new Schema({
    title: String,
    description: String,
    isComplete: Boolean,
    date: String
});


// スキーマをモデルとしてコンパイルし、それをモジュールとして扱えるようにする
module.exports = mongoose.model('AngularTodo', TodoSchema);