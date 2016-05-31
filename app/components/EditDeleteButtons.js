import React, { PropTypes } from 'react'

class EditDeleteButtons extends React.Component {
  render() {
    return (
      <div className="task__buttons">
        <button className="edit-button"
              onClick={this.props.edit}>Edit</button>
        <button className="delete-button"
              onClick={this.props.delete}>Delete</button>
      </div>
    );
  }
}
export default EditDeleteButtons
