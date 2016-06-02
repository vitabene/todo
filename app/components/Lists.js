import React, { PropTypes } from 'react'
import ListStore from '../stores/listStore'
import ListForm from './list/ListForm'
import {Link} from 'react-router'

class Lists extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: ListStore.all()
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    ListStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    ListStore.removeChangeListener(this.onChange);
  }
  onChange() {
    this.setState({
      lists: ListStore.all()
    });
  }
  render () {
    let lists = [];
    if (typeof this.state.lists != "undefined") {
      this.state.lists.forEach(function(list) {
        lists.push(<li className="list" key={list._id}>
                  <Link to={`/list/${list._id}`}>{list.title}</Link></li>);
      });
    }
    return (
      <div className="lists" id="listsView">
        <ListForm />
        <h2>All Lists</h2>
        <ul className="task-lists">
          {lists}
        </ul>
      </div>
    );
  }
}

export default Lists
