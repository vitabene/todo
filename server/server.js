var express = require('express'),
    MongoClient = require('mongodb').MongoClient,
    ObjectID = require('mongodb').ObjectID,
    assert = require('assert'),
    bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.db = {};

var url = 'mongodb://localhost:27017/konnektodo';
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('connected to:', url);
    app.db = db;
  }
});

// task - title, desc, completed, lists - lists_id
// list - title, desc, tasks_id

app.get('/api/lists', function(req, res){
    getLists(req,res);
});

app.get('/api/tasks', function(req, res){
    getTasks(req,res);
});

app.post('/api/task/update', function(req, res){
    updateTask(req,res);
});

var getLists = function(req, res){
  var col = app.db.collection('taskLists');
  col.find({}).toArray(function(err, items) {
    res.send(JSON.stringify(items));
  });
};

var getTasks = function(req, res){
  var col = app.db.collection('tasks');
  col.find({}).toArray(function(err, items) {
    res.send(JSON.stringify(items));
  });
};

var insertList = function(req, res) {
  var col = app.db.collection('taskLists');
  var list = req.body;
  col.insert(list, function(err, result) {
    res.send(JSON.stringify(result));
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
  console.log(req.body);
  task['completed'] = 0;
  var listIds = {};
  var id = {};
  // insert into tasks
  col.insert(task, function(err, result) {
    getTasks(req, res);
  });
  // update lists
  // var col = app.db.collection('taskLists');
  // col.update(list, function(err, result) {
    // assert(null, err);
    // res.send(JSON.stringify(result));
    // app.db.close();
  // });
}

var updateTask = function(req, res){
  var col = app.db.collection('tasks');
  var task = req.body;
  // var listIds = {};
  var id = new ObjectID(task._id);
  // update task
  col.update(
    { _id: id},
    { $set:{
        title:task.title,
        desc: task.desc,
        completed: task.completed
      }
    },
    {multi: true}, function(err, result) {
      console.log(result.result);
      getTasks(req,res);
  });
}

app.delete('/list/:id', function (req, res) {

  res.send('Got a DELETE request at /list');
});

app.delete('/api/task/delete', function (req, res) {
  var col = app.db.collection('tasks');
  var id = new ObjectID(req.body._id);
  col.deleteMany({_id: id}, function(err, results) {
        getTasks(req, res);
      }
  );
  // res.send('Got a DELETE request at /task');
});

// inserting a task
app.post('/api/task/create', function(req, res) {
  // dbAction(function(){
    insertTask(req, res);
  // });
});

app.get('/list/:id', function(){
    getListTasks(req,res);
  // show the tasks associated to the list with id :id
});

app.get('/task/:id', function(){
  // shows the details of a specific task,
  // including the name of the lists it belongs to
});

app.use(express.static('./build')).listen(3000);
