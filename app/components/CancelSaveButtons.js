import React, { PropTypes } from 'react'

class CancelSaveButtons extends React.Component {
  render() {
    return (
      <div className="task__buttons">
        <button className="save-button"
              onClick={this.props.save}>Save</button>
        <button className="cancel-button"
              onClick={this.props.cancel}>Cancel</button>
      </div>
    );
  }
}

export default CancelSaveButtons
