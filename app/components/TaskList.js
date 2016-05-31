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
      lists: [this.props.activeList],
      show: 2
    });
  }
  deleteTask(id) {
    actions.deleteTask(id);
  }
  updateTask(id, title, desc, completed) {
    actions.updateTask({id: id,
      title: title,
      desc: desc,
      completed: completed
    });
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
          tasks.push(<Task update={this.updateTask}
                            delete={this.deleteTask}
                            task={task}
                            key={task._id}/>);
        }
      }
    };
    // adding tasks
    var emptyListBool = tasks.length === 0 && this.props.activeList !== 0;
    if (emptyListBool || this.state.addingTask) {
      tasks.push(<Task update={this.createTask}
                        task={newTask}
                        taskAdded={this.taskAdded}
                        key={newTask._id}/>
      );
    }
    return (
      <div className="task-list">
        <input onClick={this.setFilter} name="1"  type="button" value="Show Complete"/>
        <input onClick={this.setFilter} name="0"  type="button" value="Show Incomplete"/>
        <input onClick={this.setFilter} name="2"  type="button" value="Show All"/>
        <ul className="task-list" id="taskList">
          {tasks}
          <li className="task add" id="addTask" onClick={this.addTask}>+</li>
        </ul>
      </div>
    );
  }
}

export default TaskList
