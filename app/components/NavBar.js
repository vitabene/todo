import React, { PropTypes } from 'react'
import {Link} from 'react-router'

class NavBar extends React.Component {
  render() {
    return (
      <ul className="nav-bar">
        <li><Link to='lists'>Lists</Link></li>
        <li><Link to='tabs'>Tabs</Link></li>
      </ul>
    );
  }
}

export default NavBar
