import React, { PropTypes } from 'react'
import actions from '../actions'
import ListStore from '../stores/listStore'
import ListBar from './ListBar'
import ListForm from './ListForm'
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
      for (let i = 0; i < this.state.lists.length; i++) {
        let list = this.state.lists[i];
        lists.push(<li><Link key={list._id} to={`/list/${list._id}`}>{list.title}</Link></li>);
      };
    }
    return (
      <div id="listsView">
        <ListForm />
        <ul className="task-lists">
          {lists}
        </ul>
      </div>
    );
  }
}

export default Lists
