var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const env = require('./env/environment');

// DB設定
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// eslint-disable-next-line max-len
//const mongoUri = `mongodb://${env.accountName}:${env.key}@${env.accountName}.documents.azure.com:${env.port}/?ssl=true&replicaSet=globaldb`;
const mongoUri = `mongodb://${env.accountName}.documents.azure.com:${env.port}/?ssl=true&replicaSet=globaldb`;

mongoose.connect(mongoUri, {
    auth: {
        user: env.accountName,
        password: env.key
    }
});
// mongoose.connect('mongodb://localhost:27017/ExpressAPI');
mongoose.connection.on('error', function (err) {
    console.error('MongoDB connection error: ' + err);
    process.exit(-1);
});

// body-parserの設定
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000; // port番号を指定

// 直書き
// app.get('/app/v1', (req, res) => {
//     res.json({
//         message: "hello world!"
//     });
// });

// ディレクトリに分ける
// NOTE ディレクトリ指定の場合は直下のindex.jsを参照する
var router = require('./routes/v1/');
app.use('/api/v1/', router);


// サーバ起動
app.listen(port);
console.log(`listen on port ${port}`);