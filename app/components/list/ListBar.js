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
        active = false,
        activeList = this.props.activeList,
        updateFn = this.props.updateList,
        setActive = this.props.setActive;
    if (typeof this.props.lists != "undefined") {
      this.props.lists.forEach(function(list){
        if (activeList === 0 || activeList === list._id) active = true;
        lists.push(<ListBarItem update={updateFn}
                          list={list}
                          active={active}
                          setActive={setActive}
                          key={list._id}/>);
        active = false;
      });
    }
    let form = this.state.showForm ? <ListForm detach={this.detachForm} /> : "";
    return (
      <div className="tabs">
        {form}
        <ul className="list-bar" id="listBar">
          {lists}
          <li className="list add" id="addList" onClick={this.attachForm}>+</li>
        </ul>
      </div>
    );
  }
}

export default ListBar
