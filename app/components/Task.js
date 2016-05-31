import React, { PropTypes } from 'react'

class Task extends React.Component {
  constructor() {
    super();
    this.state = {
      edited: false,
      title: '',
      desc: '',
      id: ''
    };
    this.updateValue = this.updateValue.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.complete = this.complete.bind(this);
    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.completeEdit = this.completeEdit.bind(this);
  }
  edit() {
    this.setState({edited: true});
  }
  handleChange(e){
    this.setState({title: e.target.value});
  }
  updateValue(title, desc){
    this.setState({title: title, desc: desc});
  }
  // should be toggle
  complete() {
    this.props.update(this.state.id, this.state.title, this.state.desc, 1);
  }
  cancelEdit() {
    this.setState({edited: false});
  }
  completeEdit() {
    // new task, no id
    if (this.state.id === 0) {
      this.props.update(this.state.title, this.state.desc);
      this.props.taskAdded();
    } else {
      this.props.update(this.state.id, this.state.title, this.state.desc, 0);
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
      <div className="task__buttons">
        <button className="task__edit-button"
              onClick={this.edit}>Edit</button>
        <button className="task__delete-button"
              onClick={this.delete}>Delete</button>
      </div>
    );
    if (this.state.edited) {
      buttons = (
        <div className="task__buttons">
          <button className="task__cancel-edit-button"
                  onClick={this.cancelEdit}>Cancel</button>
          <button className="task__complete-edit-button"
                  onClick={this.completeEdit}>Save</button>
        </div>
      );
    }
    let checked = false;
    if (this.state.completed == 1) checked = true;
    return (
      <li className="task">
        <input className="task__checkbox"
              type="checkbox"
              checked={checked}
              onClick={this.complete}/>
        <input className="task__title"
              disabled={!this.state.edited}
              onChange={this.handleChange}
              value={this.state.title}/>
        {buttons}
      </li>
    );
  }
}

export default Task
