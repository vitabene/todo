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
  complete() {
    this.props.update(this.state.id, this.state.value, 1);
  }
  cancelEdit() {
    this.setState({edited: false});
  }
  completeEdit() {
    this.props.update(this.state.id, this.state.value, 0)
    this.setState({
      edited: false
    });
  }
  componentDidMount() {
    this.setState({
      id: this.props.task ? this.props.task.id : '',
      title: this.props.task ? this.props.task.title : '',
      desc: this.props.task ? this.props.task.desc : ''
    });
  }
  render () {
    var buttons = (
      <div className="task__buttons">
        <img className="task__edit-button"
              src={"./build/assets/quill-s.png"}
              onClick={this.edit}/>
      </div>
    );
    if (this.state.edited) {
      buttons = (
        <div className="task__buttons">
          <img className="task__cancel-edit-button"
                src={"./build/assets/quill-s-cancel.png"}
                onClick={this.cancelEdit}/>
          <img className="task__complete-edit-button"
                src={"./build/assets/quill-s-complete.png"}
                onClick={this.completeEdit} />
        </div>
      );
    }
    return (
      <li className="task">
        <input className="task__checkbox"
              type="checkbox"
              onClick={this.complete}/>
        <input className="task__title"
              disabled={!this.state.edited}
              onChange={this.handleChange}
              value={this.state.value}/>
        {buttons}
      </li>
    );
  }
}
export default Task
