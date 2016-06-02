import React, { PropTypes } from 'react'
import actions from '../../actions'

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
    if(!confirm('Are you sure you want to delete this item?')) return false;
    actions.deleteList({
      _id: this.props.list._id,
      tasks: this.props.list.tasks
    });
  }
  render() {
    let a = this.props.active ? "active" : "";
    let listClass = "list-bar__item " + a;
    return (
      <li className={listClass} onClick={this.activate}>
        <span className="list-bar__item__title">{this.props.list.title}</span>
        <span className="list-bar__item__desc">{this.props.list.desc}</span>
        <button className="list-bar__item__del" onClick={this.deleteList}>X</button>
      </li>
    );
  }
}

export default List
