# express
express.js for practice


## mongoDBを立ち上げる必要があります

windowsの導入方法は[こちら](https://garafu.blogspot.jp/2016/12/install-mongodb.html)を参考に

```
$ mongod --dbpath "C:\mongodb\server\data"
```

### azure mongoDBの接続について
mongoose v5.0.0 以降は以下のようにして接続する必要があります。
Azureの公式ドキュメントと比べて uri と connect時の引数が異なるので注意してください
```javascript
const env = require('./env/environment');
var mongoose = require('mongoose');

// DB設定 
// NOTE:mongoose v5.0.0 以降は以下のようにして接続する必要があります。
mongoose.Promise = global.Promise;
const mongoUri = `mongodb://${env.accountName}.documents.azure.com:${env.port}/?ssl=true&replicaSet=globaldb`;

mongoose.connect(mongoUri, {
    auth: {
        user: env.accountName,
        password: env.key
    }
});
```


# azure mongoDBをmongooseを使って接続する場合
mongoose v5.0.0 以降は以下のようにして接続する必要があります。
Azureの公式ドキュメントと比べて uri と connect時の引数が異なるので注意してください
```javascript
const env = require('./env/environment');
var mongoose = require('mongoose');

// DB設定 
// NOTE:mongoose v5.0.0 以降は以下のようにして接続する必要があります。
mongoose.Promise = global.Promise;
const mongoUri = `mongodb://${env.accountName}.documents.azure.com:${env.port}/?ssl=true&replicaSet=globaldb`;

mongoose.connect(mongoUri, {
    auth: {
        user: env.accountName,
        password: env.key
    }
});
```

[参考](https://stackoverflow.com/questions/48425520/error-connecting-to-azure-illegal-character-in-password-with-mongoose-5-0-1-but)