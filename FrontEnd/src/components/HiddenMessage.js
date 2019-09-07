import React, { Component } from "react";

class HiddenMessage extends Component {
  constructor(props) {
    super(props);
    this.state = { empty: true };
    this.clear = this.clear.bind(this);
  }

  render() {
    if (this.state.empty) {
      return <React.Fragment></React.Fragment>;
    }
    let style = {
      color: "white",
      fontSize: "20px",
      margin: 0
    };
    style = { ...style, ...this.props.style };
    return <p style={style}>{this.props.msg}</p>;
  }

  clear() {
    this.setState({ empty: true });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.msg !== this.props.msg && this.props.msg !== "") {
      clearTimeout(this.clearTimeout);
      let lifetime = this.props.time * 1000 || 10000;
      this.setState({ empty: false }, () => {
        if (lifetime > 0) {
          this.clearTimeout = setTimeout(this.clear, lifetime);
        }
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.clearTimeout);
  }
}

export default HiddenMessage;
