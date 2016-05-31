import React from 'react'
import ListStore from '../stores/listStore'
import TaskStore from '../stores/taskStore'
import actions from '../actions'
import {Link} from 'react-router'

class TaskDetail extends React.Component {
  constructor() {
    super();
    this.state = {
      task: {},
      title: '',
      desc: '',
      allLists: [],
      editLists: []
    };
    this.onChange = this.onChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.complete = this.complete.bind(this);
    this.edit = this.edit.bind(this);
    // this.delete = this.delete.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.completeEdit = this.completeEdit.bind(this);
  }
  edit() {
    // set
    this.setState({
      edited: true,
      title: this.state.task.title,
      desc: this.state.task.desc,
      editLists: this.state.task.lists.slice()
    });
  }
  handleChange(e) {
    if (e.target.name === "title")
      this.setState({
        title: e.target.value
      });
    else if (e.target.name === "desc") {
      this.setState({
        desc: e.target.value
      });
    }
    else if (e.target.className === "list") {
      if (e.target.checked) {
        let eL = this.state.editLists.slice();
        eL.push(e.target.id);
        console.log(eL);
        this.setState({
          editLists: eL
        });
      } else {
        let eL = this.state.editLists.slice();
        eL.splice(eL.indexOf(e.target.id),1);
        this.setState({
          editLists: eL
        });
      }
    }
  }
  // should be toggle
  complete() {
    this.props.update(this.state.id, this.state.title, this.state.desc, !this.state.task.comleted);
  }
  cancelEdit() {
    this.setState({edited: false});
  }
  updateTask(_id, title, desc, completed, lists) {
    actions.updateTask({_id: _id,
      title: title,
      desc: desc,
      completed: completed,
      lists: lists
    });
  }
  completeEdit() {
    // new task, no id
    if (this.state.id === 0) {
      this.props.update(this.state.title, this.state.desc);
      this.props.taskAdded();
    } else {
      this.updateTask(this.state.task._id,
        this.state.title,
        this.state.desc,
        0,
        this.state.editLists);
    }
    this.setState({edited: false});
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
      allLists: ListStore.all()
    });
  }
  render () {
    let checked = false;
    if (this.state.completed == 1) checked = true;
    let taskTitle = this.state.task.title ? this.state.task.title : '';
    let taskDesc = this.state.task.desc ? this.state.task.desc : '';
    var buttons = (
      <div className="task__buttons">
        <button className="task__edit-button"
              onClick={this.edit}>Edit</button>
        <button className="task__delete-button"
              onClick={this.delete}>Delete</button>
      </div>
    );

    let lists = [];
    let st = this.state;
    if (typeof st.allLists === "undefined" || st.allLists.length === 0)
      return (<span>Nothing in here!</span>);
    let srcLists = st.task.lists;
    // if edited
    if (this.state.edited) {
      taskTitle = this.state.title;
      taskDesc = this.state.desc;
      srcLists = this.state.editLists;
      buttons = (
        <div className="task__buttons">
          <button className="task__cancel-edit-button"
                  onClick={this.cancelEdit}>Cancel</button>
          <button className="task__complete-edit-button"
                  onClick={this.completeEdit}>Save</button>
        </div>
      );
    }
    for (var i = 0; i < st.allLists.length; i++) {
      let list = st.allLists[i];
      let listAssigned = srcLists.indexOf(list._id) !== -1 ? true : false;
      lists.push(
        <li key={list._id}>
          <input type="checkbox" disabled={!this.state.edited} className='list' id={list._id} checked={listAssigned}
                  onChange={this.handleChange}/>
          <span>{list.title}</span>
          <Link to={`/list/${list._id}`}>Detail</Link>
        </li>
      );
    }
    return (
      <div>
        <input className="task__checkbox"
              type="checkbox"
              checked={checked}
              onClick={this.complete}/>
        <input className="task__title"
              disabled={!this.state.edited}
              name="title"
              onChange={this.handleChange}
              value={taskTitle}/>
        <input className="task__desc"
              disabled={!this.state.edited}
              name="desc"
              onChange={this.handleChange}
              value={taskDesc}/>
        {buttons}
        <h3>Lists</h3>
        <ul>
          {lists}
        </ul>
      </div>
    );
  }
}

export default TaskDetail
