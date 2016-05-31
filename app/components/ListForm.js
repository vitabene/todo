import React, { PropTypes } from 'react'
import ListBarItem from './ListBarItem'
import actions from '../actions'

const defaultList = {
  title : "Untitled List",
  desc: "Default Untitled List"
};

class ListForm extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      desc: '',
      addingList: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.createList = this.createList.bind(this);
  }
  // lists
  handleChange(e){
    if (e.target.name === "title")
      this.setState({title: e.target.value});
    else if (e.target.name === "desc") {
      this.setState({desc: e.target.value});
    }
  }
  addList(){
    this.setState({addingList: true});
  }
  createList() {
    actions.createList({
      title: this.state.title,
      desc: this.state.desc
    });
  }
  // deleteList(id) {
  //   actions.deleteList(id);
  // }
  // updateList(id, title, desc, completed) {
  //   if (typeof desc === "undefined") desc = "";
  //   console.log("taskUpdate", id, title, desc, completed);
  //   actions.updateList({id: id, title: title, description: desc, completed: completed});
  // }
  render () {
    return (
      <div className="list-form">
        <input className="list-title-field"
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}/>
        <input className="list-desc-field"
          type="text"
          name="desc"
          value={this.state.desc}
          onChange={this.handleChange}/>
        <button className="list-create-button"
                onClick={this.createList}>Create List</button>
      </div>
    );
  }
}

export default ListForm
