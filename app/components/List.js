import React, { PropTypes } from 'react'

class List extends React.Component {
  render() {
    return (
      <li className="list">
        <span className="list__title">{this.props.list.title}</span>
        <span className="list__desc">{this.props.list.desc}</span>
      </li>
    );
  }
}

export default List
