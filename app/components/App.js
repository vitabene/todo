import React from 'react'
import NavBar from './NavBar'

class App extends React.Component {
  render () {
    return (
      <div className="wrapper">
        <NavBar />
        <div className="taskboard" id="taskboard">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App
