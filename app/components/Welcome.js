import React, { PropTypes } from 'react'
import {Link} from 'react-router'

class Welcome extends React.Component {
  render() {
    return (
      <div className="welcome">
        <h1 className="welcome__heading">Welcome to Konnektodo!</h1>
        <p className="welcome__text">
          Please select how do you wish to view your tasks from the menu above.
        </p>
      </div>
    );
  }
}

export default Welcome
