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

// task - title, description, completed, lists - lists_id
// list - title, description, tasks_id

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

app.get('/api/lists', function(req, res){
  dbAction(function(){
    getLists(req,res);
  });
});

var getLists = function(req, res){
  var col = app.db.collection('taskLists');
  col.find({}).toArray(function(err, items) {
    res.send(JSON.stringify(items));
    app.db.close();
  });
};

var insertList = function(req, res) {
  var col = app.db.collection('taskLists');
  var list = req.body;
  col.insert(list, function(err, result) {
    assert(null, err);
    res.send(JSON.stringify(result));
    app.db.close();
  });
};

var getListTasks = function(id){
  // get task associated with a list
  // col.find({}).toArray(function(err, items) {
    // res.send(JSON.stringify(items));
    // app.db.close();
  // });
};

var insertTask = function(req, res) {
  var col = app.db.collection('tasks');
  // get the object
  var task = req.body;
  var listIds = {};
  var id = {};
  // insert into tasks
  col.insert(task, function(err, result) {
    assert(null, err);
    id = result.id;
    res.send(JSON.stringify(result));
    app.db.close();
  });
  // update lists
  var col = app.db.collection('taskLists');
  // col.update(list, function(err, result) {
    // assert(null, err);
    // res.send(JSON.stringify(result));
    // app.db.close();
  // });
}

app.delete('/list/:id', function (req, res) {

  res.send('Got a DELETE request at /list');
});

app.delete('/task/:id', function (req, res) {
  res.send('Got a DELETE request at /task');
});

// inserting a task
app.put('/task', function (req, res) {
  dbAction(function(){
    insertTask(req,res);
  });
});

app.get('/list/:id', function(){
  dbAction(function(){
    getListTasks(req,res);
  });
  // show the tasks associated to the list with id :id
});

app.get('/task/:id', function(){
  // shows the details of a specific task,
  // including the name of the lists it belongs to
});

app.use(express.static('./build')).listen(3000);
