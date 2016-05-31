import React, { PropTypes } from 'react'
import actions from '../actions'
import TaskStore from '../stores/taskStore'
import ListStore from '../stores/listStore'
import TaskList from './TaskList'
import ListBar from './ListBar'
import ListForm from './ListForm'

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: TaskStore.all(),
      lists: ListStore.all(),
      activeList: 0
    };
    this.onChange = this.onChange.bind(this);
    this.setActive = this.setActive.bind(this);
  }
  componentDidMount() {
    TaskStore.addChangeListener(this.onChange);
    ListStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    TaskStore.removeChangeListener(this.onChange);
    ListStore.removeChangeListener(this.onChange);
  }
  setActive(id){
    this.setState({
      activeList: id
    });
  }
  onChange() {
    // first list active, or current one
    let lists = ListStore.all();
    let activeListId = lists[0] ? lists[0]._id : 0;
    if (this.state.activeList != 0) activeListId = this.state.activeList;
    this.setState({
      tasks: TaskStore.all(),
      lists: lists,
      activeList: activeListId
    });
  }
  render() {
    return (
      <div>
        <ListForm />
        <ListBar activeList={this.state.activeList}
                setActive={this.setActive}
                lists={this.state.lists}/>
        <TaskList activeList={this.state.activeList} tasks={this.state.tasks}/>
      </div>
    );
  }
}

export default Home
