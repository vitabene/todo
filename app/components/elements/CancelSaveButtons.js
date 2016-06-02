import React, { PropTypes } from 'react'
import Button from './Button'

class CancelSaveButtons extends React.Component {
  render() {
    return (
      <div className="button-box">
        <Button specialClass="save" fn={this.props.save} text="Save"/>
        <Button specialClass="cancel" fn={this.props.cancel} text="Cancel"/>
      </div>
    );
  }
}

export default CancelSaveButtons
