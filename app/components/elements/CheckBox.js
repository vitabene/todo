import React, { PropTypes } from 'react'

class CheckBox extends React.Component {
  render() {
    return (
      <input className="checkbox"
          type="checkbox"
          checked={this.props.checked}
          onChange={this.props.click}/>
    );
  }
}

export default CheckBox
