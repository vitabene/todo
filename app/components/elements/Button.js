import React, { PropTypes } from 'react'

class Button extends React.Component {
  render() {
    const DEFAULT_CLASS = "button";
    let spCl = this.props.specialClass ? "__" + this.props.specialClass : "";
    let cl = DEFAULT_CLASS + spCl;
    return (
      <button className={cl} onClick={this.props.fn}>{this.props.text}</button>
    );
  }
}

export default Button
