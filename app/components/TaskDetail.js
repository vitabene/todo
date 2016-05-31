import React from 'react'
import ListStore from '../stores/listStore'
import TaskStore from '../stores/taskStore'
import {Link} from 'react-router'

class TaskDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      task: {}
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.onChange();
    TaskStore.addChangeListener(this.onChange);
    ListStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    TaskStore.removeChangeListener(this.onChange);
    ListStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({
      task: TaskStore.get(this.props.params.id),
      lists: ListStore.getByIds(this.props.params.id)
    });
  }
  render () {
    let taskTitle = this.state.task.title ? this.state.task.title : '';
    let taskDesc = this.state.task.desc ? this.state.task.desc : '';
    let lists = [];
    if (typeof this.state.lists !== "undefined" && this.state.lists.length > 0) {
      for (var i = 0; i < this.state.lists.length; i++) {
        let list = this.state.lists[i];
        lists.push(<Link key={list._id} to={`/list/${list._id}`}>{list.title}</Link>);
      }
    }
    return (
      <div>
        <h2>{taskTitle}</h2>
        <small>{taskDesc}</small>
        {lists}
      </div>
    );
  }
}

export default TaskDetail
