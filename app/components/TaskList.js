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
  updateTask(id, title, desc, completed) {
    actions.updateTask({id: id,
      title: title,
      desc: desc,
      completed: completed
    });
  }
  render() {
    let tasks = [];
    if (typeof this.props.tasks != "undefined") {
      for (let i = this.props.tasks.length - 1; i >= 0; i--) {
        let task = this.props.tasks[i];
        if (task.lists.indexOf(this.props.activeList) != -1) {
          tasks.push(<Task update={this.updateTask}
                            delete={this.deleteTask}
                            task={task}
                            key={task._id}/>);
        }
      };
    }
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
      <ul className="task-list" id="taskList">
        {tasks}
        <li className="task add" id="addTask" onClick={this.addTask}>+</li>
      </ul>
    );
  }
}

export default TaskList
