import React, { PropTypes } from 'react'
import List from './List'

const defaultList = {
  title : "Untitled List",
  desc: "Default Untitled List"
};

class ListBar extends React.Component {
  // lists
  render () {
    let lists = [];
    if (typeof this.props.lists != "undefined") {
      for (let i = this.props.lists.length - 1; i >= 0; i--) {
          lists.push(<List update={this.props.updateTask}
                            task={this.props.lists[i]}
                            key={this.props.lists[i].created}/>);
      };
    }
    // default untitled list
    if (lists.length === 0) {
      lists.push(<List update={this.props.updateTask}
                        list={defaultList}/>);
    }
    return (
      <ul className="list-bar" id="listBar">
        {lists}
        <li className="list add" id="addList">+</li>
      </ul>
    );
  }
}

export default ListBar
