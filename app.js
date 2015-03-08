var fs = require("fs"),
    express = require('express'),
    moment = require('moment'),
    sqlite3 = require("sqlite3").verbose();

var config = require('./config/config');

var port = 9002;

var app = express();;


var exists = fs.existsSync(config.dbfile);



var db = new sqlite3.Database(config.dbfile);


/////////////////////////////////////////////////////////////////////////
//
// Routes

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', function(req, res) {


  getPosts(function(rows) {
      rows.forEach(function(row) {
          console.log(row.title);
      });
      res.send(rows);
  });

});



var getPosts = function(callback) {

  db.serialize(function() {

    db.all("SELECT title FROM posts", function(err, rows) {
      callback(rows);
    });
  });

}



///////////////////////////////////////////////////
var server = app.listen(port, function() {
  console.log('Listening on port ' + port);
});
