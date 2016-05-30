import TaskList from './TaskList'
import ListBar from './ListBar'
import Task from './Task'
import React, { PropTypes } from 'react'

class TaskBoard extends React.Component {
  render () {
    return (
      <div className="taskboard" id="taskboard">
        <ListBar updateTask={this.props.updateTask}/>
        <TaskList addTask={this.props.addTask}/>
      </div>
    );
  }
}

export default TaskBoard
