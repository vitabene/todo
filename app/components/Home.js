import actions from '../actions'
import TaskStore from '../stores/taskStore'
import TaskBoard from './TaskBoard'
import update from 'react-addons-update'
import React, { PropTypes } from 'react'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: TaskStore.all()
    };
    this.onChange = this.onChange.bind(this);
    // this.updateTask = this.updateTask.bind(this);
  }
  componentDidMount() {
    TaskStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    TaskStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({
      tasks: TaskStore.all()
    });
  }
  render() {
    return (
        <TaskBoard tasks={this.state.tasks}/>
    );
  }
}

export default Home
