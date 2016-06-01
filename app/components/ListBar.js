import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import ListForm from './ListForm'
import ListBarItem from './ListBarItem'

class ListBar extends React.Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    };
    this.attachForm = this.attachForm.bind(this);
    this.detachForm = this.detachForm.bind(this);
  }
  attachForm(){
    this.setState({
      showForm: true
    });
  }
  detachForm(){
    this.setState({
      showForm: false
    });
  }
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
        listActive = false;
      };
    }
    let form = '';
    if (this.state.showForm) form = <ListForm detach={this.detachForm} />
    return (
      <div className="list-bar">
        {form}
        <ul className="list-bar-list" id="listBar">
          {lists}
          <li className="list add" id="addList" onClick={this.attachForm}>+</li>
        </ul>
      </div>
    );
  }
}

export default ListBar
