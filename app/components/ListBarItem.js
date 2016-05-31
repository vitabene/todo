import React, { PropTypes } from 'react'

class List extends React.Component {
  constructor() {
    super();
    this.activate = this.activate.bind(this);
  }
  activate(){
    this.props.setActive(this.props.list._id)
  }
  render() {
    return (
      <li className="list" onClick={this.activate}>
        <span className="list__title">{this.props.list.title}</span>
        <span className="list__desc">{this.props.list.desc}</span>
      </li>
    );
  }
}

export default List
