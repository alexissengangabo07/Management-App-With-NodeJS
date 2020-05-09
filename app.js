var express = require('express');
var mongoose = require('mongoose');
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');
var multer = require('multer');

var upload = multer({
    dest: __dirname + '/uploads'
});
 
mongoose.connect('mongodb://localhost:27017/gestionclient');

require('./Models/Client');
require('./Models/Type');

var app = express();

app.use(bodyParser.urlencoded());
app.use(upload.single('file'));

app.use('/css', express.static(__dirname +'/node_modules/bootstrap/dist/css'));

app.use('/types', require('./Routes/types'));
app.use('/', require('./Routes/main'));


app.use('/uploads', express.static(__dirname + '/uploads'));

nunjucks.configure('Views', {
    autoescape: true,
    express: app
});

app.listen(3000);