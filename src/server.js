// links
// http://expressjs.com/en/starter/basic-routing.html
// http://mongodb.github.io/node-mongodb-native/2.1/api/
// http://www.tutorialspoint.com/mongodb/mongodb_data_modeling.htm
// http://blog.modulus.io/mongodb-tutorial
// http://stackoverflow.com/questions/34857782/cant-find-mongodb-collections-data
// https://mongodb.github.io/node-mongodb-native/markdown-docs/queries.html

var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert');

var app = express();
app.db = {};

var dbAction = function(callback) {
  var url = 'mongodb://localhost:27017/konnektodo';
  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('connected to:', url);
      app.db = db;
      callback.call();
    }
  });
};

app.get('/lists', function(req, res){
  dbAction(function(){
    getLists(req,res);
  });
});

var getLists = function(req, res){
  var col = app.db.collection('tasks');
  col.find({}).toArray(function(err, items) {
    res.send(JSON.stringify(items));
    app.db.close();
  });
};

app.delete('/list/:id', function (req, res) {
  res.send('Got a DELETE request at /list');
});

app.delete('/task/:id', function (req, res) {
  res.send('Got a DELETE request at /task');
});

app.put('/task', function (req, res) {
  res.send('Got a PUT request at /task');
});

app.get('/list/:id', function(){
  // show the tasks associated to the list with id :id
});

app.get('/task/:id', function(){
  // shows the details of a specific task,
  // including the name of the lists it belongs to
});

app.use(express.static('./build')).listen(3000);
