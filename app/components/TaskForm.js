import React, { PropTypes } from 'react'
import EditDeleteButtons from './EditDeleteButtons'
import CancelSaveButtons from './CancelSaveButtons'
import CheckBox from './CheckBox'

class TaskForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      desc: '',
      id: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.delete = this.delete.bind(this);
    this.completeEdit = this.completeEdit.bind(this);
  }
  edit() {
    this.setState({edited: true});
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
  }
  completeEdit() {
    // new task, no id
    if (this.state.id === 0) {
      this.props.createTask(this.state.title, this.state.desc);
      this.props.taskAdded();
    } else {
      this.props.createTask(this.state.id, this.state.title, this.state.desc, 0);
    }
    this.setState({edited: false});
  }
  delete(){
    this.props.delete(this.state.id);
  }
  componentDidMount() {
    this.setState({
      id: this.props.task ? this.props.task._id : '',
      title: this.props.task ? this.props.task.title : '',
      desc: this.props.task ? this.props.task.description : '',
      completed: this.props.task ? this.props.task.completed : ''
    });
  }
  render () {
    var buttons = (
      <CancelSaveButtons cancel={this.props.taskAdded} save={this.completeEdit}/>
    );
    let checked = false;
    if (this.state.completed == 1) checked = true;
    return (
      <li className="task">
        <CheckBox checked={checked} click={this.complete}/>
        <input className="task__title"
              name="title"
              onChange={this.handleChange}
              value={this.state.title}/>
        <input className="task__desc"
              name="desc"
              onChange={this.handleChange}
              value={this.state.desc}/>
        {buttons}
      </li>
    );
  }
}

export default TaskForm
