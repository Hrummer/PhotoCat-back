/**
 * Created by vadym on 23.09.15.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('database');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/products', function (req, res) {
    db.all('SELECT * FROM products', function (err, data) {
        res.send(data).end();
    });
});

app.post('/products/:id/delete', function (req, res){
    db.run('DELETE FROM products WHERE id=?',[req.params.id], function (err) {
        if (err) res.sendStatus(500).end();
        else res.end();
    })
});

app.post('/products/:id/edit',function (req, res) {
    db.run('UPDATE products SET name=? WHERE id=?', [req.body.editedProduct, req.params.id], function(err) {
        if (err) res.sendStatus(500).end();
        else res.end();
    });
});

app.post('/products/add', function (req, res) {
    db.run('INSERT INTO products (name) VALUES (?)', [req.body.newProduct], function () {
        res.send(this.lastID.toString()).end();
    });
});


var server = app.listen(3000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('PhotoCat app listening at http://%s:%s', host, port);
});
