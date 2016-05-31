import React from 'react'
import ListStore from '../stores/listStore'
import TaskStore from '../stores/taskStore'
import {Link} from 'react-router'

class ListDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      list: {},
      tasks: []
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
      list: ListStore.get(this.props.params.id),
      tasks: TaskStore.getByListId(this.props.params.id)
    });
  }
  render () {
    let listTitle = this.state.list.title ? this.state.list.title : '';
    let listDesc = this.state.list.desc ? this.state.list.desc : '';
    let taskLinks = [];
    if (this.state.tasks.length > 0) {
      for (var i = 0; i < this.state.tasks.length; i++) {
        let task = this.state.tasks[i];
        taskLinks.push(<Link key={task._id} to={`/task/${task._id}`}>{task.title}</Link>);
      }
    }
    return (
      <div>
        <h2>{listTitle}</h2>
        <small>{listDesc}</small>
        {taskLinks}
      </div>
    );
  }
}

export default ListDetail
