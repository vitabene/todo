import React, { PropTypes } from 'react'
import actions from '../../actions'
import CancelSaveButtons from '../elements/CancelSaveButtons'

const defaultList = {
  title: "Untitled List",
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
  handleChange(e) {
    if (e.target.name === "title")
      this.setState({
        title: e.target.value
      });
    else if (e.target.name === "desc") {
      this.setState({
        desc: e.target.value
      });
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
      <div className="form">
        <input className="task__title"
          placeholder={defaultList.title}
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}/>
        <input className="task__desc"
          placeholder={defaultList.desc}
          type="text"
          name="desc"
          value={this.state.desc}
          onChange={this.handleChange}/>
        <CancelSaveButtons cancel={this.props.detach} save={this.createList}/>
      </div>
    );
  }
}

export default ListForm
