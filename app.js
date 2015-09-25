/**
 * Created by vadym on 23.09.15.
 */
var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var files = null;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/products', function (req, res) {
    res.send(files)
});

app.get('/products/:id', function (req, res) {
    console.log(req.params.id);
    res.end()
});

app.post('/products/:id/delete', function (req, res){
    files.splice(req.params.id, 1);
    fs.writeFile('data.json', JSON.stringify(files), 'utf8', function (err, data) {
        if (err) throw err;
        else console.log("Everything is OK");
    });
    res.end()
});

app.post('/products/:id/edit',function(req, res){
    files.splice(req.params.id, 1, req.body.editedProduct);
    fs.writeFile('data.json', JSON.stringify(files), 'utf8', function(err, data){
        if (err) throw err;
        else console.log("Everything is OK");
    });
    res.end()
});

app.post('/products/add', function (req, res) {
    files.push(req.body.newProduct);
    fs.writeFile('data.json', JSON.stringify(files), 'utf8', function(err, data){
        if (err) throw err;
        else console.log("Everything is OK");
    });
    res.end()
});

fs.readFile("data.json", "utf8", function (err, data) {
    if (err) {
        console.error(err)
    } else {
        files = JSON.parse(data);

        var server = app.listen(3000, function () {

            var host = server.address().address;
            var port = server.address().port;

            console.log('PhotoCat app listening at http://%s:%s', host, port);
        });
    }
});


