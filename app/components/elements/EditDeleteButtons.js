import React, { PropTypes } from 'react'
import Button from './Button'

class EditDeleteButtons extends React.Component {
  render() {
    return (
      <div className="button-box">
        <Button specialClass="edit" fn={this.props.edit} text="Edit"/>
        <Button specialClass="delete" fn={this.props.delete} text="Delete"/>
      </div>
    );
  }
}
export default EditDeleteButtons
