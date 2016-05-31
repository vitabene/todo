import React, { PropTypes } from 'react'
import TaskForm from './TaskForm'
import actions from '../actions'
import {Link} from 'react-router'

const newTask = {
  _id: 0,
  title : "New Task",
  desc: "Edit Me!"
};

class TaskList extends React.Component {
  constructor() {
    super();
    this.state = {
      addingTask: false,
      show: 2
    };
    this.addTask = this.addTask.bind(this);
    this.taskAdded = this.taskAdded.bind(this);
    this.createTask = this.createTask.bind(this);
    this.setFilter = this.setFilter.bind(this);
  }
  addTask(){
    this.setState({addingTask: true});
  }
  taskAdded(){
    this.setState({addingTask: false});
  }
  createTask(title, desc) {
    actions.createTask({
      title: title,
      desc: desc,
      lists: [this.props.activeList]
    });
  }
  deleteTask(id) {
    actions.deleteTask(id);
  }
  setFilter(e){
    this.setState({show: parseInt(e.target.name)});
  }
  render() {
    let tasks = [];
    if (typeof this.props.tasks === "undefined") return;
    // reverse order
    for (let i = this.props.tasks.length - 1; i >= 0; i--) {
      let task = this.props.tasks[i];
      // show only tasks from the active list
      if (task.lists.indexOf(this.props.activeList) != -1) {
        // state matches filter or no filter set
        if (this.state.show === task.completed || this.state.show === 2) {
          tasks.push(<li className="task" key={task._id}>
            <Link to={`/task/${task._id}`}>{task.title}</Link>
          </li>);
        }
      }
    };
    // add task button
    let addTaskButton = (<li className="task add" id="addTask"
                              onClick={this.addTask}>+</li>);
    // adding tasks
    var emptyListBool = tasks.length === 0 && this.props.activeList !== 0;
    if (emptyListBool || this.state.addingTask) {
      tasks.push(<TaskForm createTask={this.createTask}
                        task={newTask}
                        taskAdded={this.taskAdded}
                        key={newTask._id}/>
      );
      addTaskButton = (<li></li>);
    }
    return (
      <div className="task-list">
        <div className="task-filters">
          <input onClick={this.setFilter} name="1"
                type="button" value="Show Complete"/>
          <input onClick={this.setFilter} name="0"
                type="button" value="Show Incomplete"/>
          <input onClick={this.setFilter} name="2"
                type="button" value="Show All"/>
        </div>
        <ul className="task-list" id="taskList">
          {tasks}
          {addTaskButton}
        </ul>
      </div>
    );
  }
}

export default TaskList
