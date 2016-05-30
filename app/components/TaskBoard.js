import actions from '../actions'
import TaskList from './TaskList'
import ListBar from './ListBar'
import Task from './Task'
import React, { PropTypes } from 'react'

class TaskBoard extends React.Component {

  updateList(id, title, desc, completed) {
    console.log("update list called");
  }

  render () {
    return (
      <div className="taskboard" id="taskboard">
        <ListBar updateTask={this.props.updateList}/>
        <TaskList tasks={this.props.tasks}/>
      </div>
    );
  }
}

export default TaskBoard
