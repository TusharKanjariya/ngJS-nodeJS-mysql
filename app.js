var express = require('express');
var sql = require('mysql');
var app = express();

var connection = sql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'angulardemo'
})

connection.connect(function (err) {
    if (err) throw err;
});

app.use(express.static(__dirname + '/public'));

app.listen(3001);

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/getUsers", function (req, res) {
    var q = "SELECT * FROM users";
    connection.query(q, function (err, result) {
        res.send(JSON.stringify(result));
    })
});

app.get('/deleteUser', function (req, res) {
    var id = req.query.eid;
    var q = "DELETE FROM `users` WHERE `users`.`id` = ?";
    connection.query(q, [id], function (err, result) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.get('/singleRow', function (req, res) {
    var id = req.query.eid;
    var q = "SELECT `id`, `name`, `password` FROM `users` WHERE `users`.`id` = ?";
    connection.query(q, [id], function (err, result) {
        res.send(JSON.stringify(result));
    });
});

app.get('/updateData', function (req, res) {
    var id = req.query.eid;
    var name = req.query.name;
    var pwd = req.query.password;

    var q = "UPDATE `users` SET `name` = '" + name + "', `password` = '" + pwd + "' WHERE `users`.`id`=" + id;
    connection.query(q, function (err, result) {
        res.send(JSON.stringify(result));
    });
});

app.get('/addData', function (req, res) {
    var name = req.query.name;
    var pwd = req.query.password;
    var q = "INSERT INTO `users` (`id`, `name`, `password`) VALUES (NULL, '" + name + "', '" + pwd + "')";
    connection.query(q, function (err, result) {
        res.send(JSON.stringify(result));
    });
});