import React from 'react'
import ListStore from '../stores/listStore'
import TaskStore from '../stores/taskStore'

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
    console.log(this.state.list);
    console.log(this.state.tasks);
    return (
      <div>
        {this.state.list.toString()}
      </div>
    );
  }
}

export default ListDetail
