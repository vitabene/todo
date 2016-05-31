import React, { PropTypes } from 'react'
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
      desc: ''
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
  createList() {
    actions.createList({
      title: this.state.title,
      desc: this.state.desc
    });
    this.props.detach();
  }
  render () {
    return (
      <div className="list-form">
        <input className="list-title-field"
          placeholder={defaultList.title}
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}/>
        <input className="list-desc-field"
          placeholder={defaultList.desc}
          type="text"
          name="desc"
          value={this.state.desc}
          onChange={this.handleChange}/>
        <button className="list-create-button"
                onClick={this.createList}>Create List</button>
        <button className="list-create-button-cancel"
                onClick={this.props.detach}>Cancel</button>
      </div>
    );
  }
}

export default ListForm
