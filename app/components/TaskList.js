import React, { PropTypes } from 'react'
import Task from './Task'

const defaultTask = {
  title : "Untitled Task",
  desc: "Default Untitled Task"
};

class TaskList extends React.Component {
  // tasks
  render () {
    let tasks = [];
    if (typeof this.props.tasks != "undefined") {
      for (let i = this.props.tasks.length - 1; i >= 0; i--) {
          tasks.push(<Task update={this.props.updateTask}
                            task={this.props.tasks[i]}
                            key={this.props.tasks[i].created}/>);
      };
    }
    // default untitled task
    if (tasks.length === 0) {
      tasks.push(<Task update={this.props.updateTask}
                        task={defaultTask}/>);
    }
    return (
      <ul className="task-list" id="taskList">
        {tasks}
        <li className="task add" id="addTask">+</li>
      </ul>
    );
  }
}

export default TaskList
