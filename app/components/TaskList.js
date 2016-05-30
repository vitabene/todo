import React, { PropTypes } from 'react'
import Task from './Task'
import actions from '../actions'

const newTask = {
  _id: 0,
  title : "New Task",
  desc: "Edit Me!"
};

class TaskList extends React.Component {
  // tasks
  constructor() {
    super();
    this.state = {
      addingTask: false
    };
    this.addTask = this.addTask.bind(this);
  }
  addTask(){
    this.setState({addingTask: true});
  }
  createTask(title, desc) {
    actions.createTask(title, desc);
  }
  deleteTask(id) {
    actions.deleteTask(id);
  }
  updateTask(id, title, desc, completed) {
    if (typeof desc === "undefined") desc = "";
    console.log("taskUpdate", id, title, desc, completed);
    actions.updateTask({id: id, title: title, description: desc, completed: completed});
  }
  render() {
    let tasks = [];
    if (typeof this.props.tasks != "undefined") {
      for (let i = this.props.tasks.length - 1; i >= 0; i--) {
          tasks.push(<Task update={this.updateTask}
                            delete={this.deleteTask}
                            task={this.props.tasks[i]}
                            key={this.props.tasks[i]._id}/>);
      };
    }
    // adding tasks
    if (tasks.length === 0 || this.state.addingTask) {
      tasks.push(<Task update={this.createTask}
                        task={newTask}
                        key={newTask._id}/>);
    }
    return (
      <ul className="task-list" id="taskList">
        {tasks}
        <li className="task add" id="addTask" onClick={this.addTask}>+</li>
      </ul>
    );
  }
}

export default TaskList
