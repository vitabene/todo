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
  if (err) console.log('Error connecting to mongoDB:', err);
  else {
    console.log('connected to:', url);
    app.db = db;
    app.tasks = db.collection('tasks');
    app.lists = db.collection('taskLists');
  }
});

// task - title, desc, completed, lists - lists_id
// list - title, desc, tasks_id

app.get('/api/tasks', function(req, res){
  getTasks(req,res);
});

app.post('/api/task/create', function(req, res) {
  insertTask(req, res);
});

app.post('/api/task/update', function(req, res){
  updateTask(req, res);
});

app.delete('/api/task/delete', function (req, res) {
  deleteTask(req, res);
});

var getTasks = function(req, res){
  app.tasks.find({}).toArray(function(err, items) {
    res.send(JSON.stringify(items));
  });
};

var insertTask = function(req, res) {
  var task = req.body;
  task['completed'] = 0;
  for (var i = 0; i < task.lists.length; i++)
    task.lists[i] = new ObjectID(task.lists[i]);
  var id = {};
  app.tasks.insert(task, function(err, result) {
    getTasks(req, res);
  });
}

var deleteTask = function(req, res) {
  var id = new ObjectID(req.body._id);
  app.tasks.deleteOne({_id: id}, function(err, results) {
        getTasks(req, res);
  });
}

var updateTask = function(req, res){
  var task = req.body;
  // var listIds = {};
  var id = new ObjectID(task._id);
  // update task
  app.tasks.update(
    { _id: id},
    { $set:{
        title:task.title,
        desc: task.desc,
        completed: task.completed
      }
    },
    {multi: true}, function(err, result) {
      getTasks(req,res);
  });
}

app.get('/api/lists', function(req, res){
  getLists(req,res);
});

app.post('/api/list/create', function(req, res) {
  insertList(req, res);
});

app.post('/api/list/update', function(req, res){
  updateList(req, res);
});

app.delete('/api/list/delete', function (req, res) {
  deleteList(req, res);
});

var getLists = function(req, res){
  var col = app.db.collection('taskLists');
  col.find({}).toArray(function(err, items) {
    res.send(JSON.stringify(items));
  });
};

var insertList = function(req, res) {
  var newlist = req.body;
  app.lists.insert(newlist, function(err, result) {
    getLists(req, res)
  });
};

var updateList = function(req, res) {
  var list = req.body;
  var id = new ObjectID(list._id);
  app.lists.update(
    { _id: id},
    { $set:{
        title: list.title,
        desc: list.desc,
        tasks: list.tasks
      }
    },
    {multi: true}, function(err, result) {
      getLists(req,res);
  });
};

var deleteList = function(reg, res) {
  var id = new ObjectID(req.body._id);
  app.lists.deleteOne({_id: id}, function(err, results) {
    getLists(req, res);
  });
}

var getListTasks = function(id){
  // get task associated with a list
  // col.find({}).toArray(function(err, items) {
    // res.send(JSON.stringify(items));
    // app.db.close();
  // });
};

app.use(express.static('./build')).listen(3000);
