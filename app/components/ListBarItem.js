import React, { PropTypes } from 'react'
import actions from '../actions'

class List extends React.Component {
  constructor() {
    super();
    this.activate = this.activate.bind(this);
    this.deleteList = this.deleteList.bind(this);
  }
  activate(){
    this.props.setActive(this.props.list._id)
  }
  deleteList(){
    actions.deleteList({
      _id: this.props.list._id,
      tasks: this.props.list.tasks
    });
  }
  render() {
    return (
      <li className="list" onClick={this.activate}>
        <span className="list__title">{this.props.list.title}</span>
        <span className="list__desc">{this.props.list.desc}</span>
        <button onClick={this.deleteList}>
          Delete
        </button>
      </li>
    );
  }
}

export default List
