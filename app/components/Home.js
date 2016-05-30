import actions from '../actions'
import TaskStore from '../stores/taskStore'
import TaskBoard from './TaskBoard'
import update from 'react-addons-update'
import React, { PropTypes } from 'react'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      // tasks: TaskStore.all()
      tasks: []
    };
  //   this.onChange = this.onChange.bind(this);
  //   this.updateTask = this.updateTask.bind(this);
  }
  saveTask(title, desc) {
  //     actions.createTask(title, desc);
  }
  updateTask(id, title, desc, completed) {
  //     actions.updateTask({id: id, title: text, description: desc, completed: completed});
  //     if (completed) {
  //       var index = -1;
  //       for (var i = 0; i < this.state.tasks.length; i++) {
  //         var q = this.state.tasks[i];
  //         if (id == q.id) index = this.state.tasks.indexOf(q)
  //       }
  //       if (index !== -1)
  //       this.setState({
  //         tasks: update(this.state.tasks, {$splice: [[index, 1]]})
  //       })
  //     }
  }
  // componentDidMount() {
  //   TaskStore.addChangeListener(this.onChange);
  // }
  // componentWillUnmount() {
  //   TaskStore.removeChangeListener(this.onChange);
  // }
  // onChange() {
  //   this.setState({
  //     tasks: TaskStore.all()
  //   });
  // }
  render() {
    return (
        <TaskBoard addTask={this.saveTask}
                    updateTask={this.updateTask}
                    tasks={this.state.tasks}/>
    );
  }
}

export default Home
