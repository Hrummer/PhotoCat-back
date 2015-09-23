/**
 * Created by vadym on 23.09.15.
 */
var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/list', function (req, res) {
    res.send(['cup', 'car', 'computer', 'microwave', 'coffee'])
});

var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)

});
