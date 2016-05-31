import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import ListBarItem from './ListBarItem'

const defaultList = {
  _id: 0,
  title : "Untitled List",
  desc: "Default Untitled List"
};

class ListBar extends React.Component {
  // lists
  render () {
    let lists = [],
        listActive = false;
    if (typeof this.props.lists != "undefined") {
      for (let i = 0; i < this.props.lists.length; i++) {
        let list = this.props.lists[i];
        if (this.props.activeList === i || this.props.activeList === list._id) {
          listActive = true;
        }
        lists.push(<ListBarItem update={this.props.updateList}
                          list={list}
                          active={listActive}
                          setActive={this.props.setActive}
                          key={list._id}/>);
      };
    }
    return (
      <div>
        <Link to='lists'>All Lists</Link>
        <ul className="list-bar" id="listBar">
          {lists}
          <li className="list add" id="addList">+</li>
        </ul>
      </div>
    );
  }
}

export default ListBar
