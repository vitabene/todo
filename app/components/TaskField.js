import React, { PropTypes } from 'react'

class TaskField extends React.Component {
  constructor(){
    super();
    this.state = {
      value: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
      this.props.addTask(this.state.value);
      this.setState({
          value: ''
      });
  }
  handleChange(e) {
      this.setState({
          value: e.target.value
      });
  }
  render () {
    return (
      <div className="task-field-box">
        <input id="taskField" className="task-field" 
          placeholder='What is your task?'
          value={this.state.value}
          onChange={this.handleChange}/>
        <button className="taskSubmitButton" onClick={this.handleClick}></button>
      </div>
    );
  }
}

export default TaskField
