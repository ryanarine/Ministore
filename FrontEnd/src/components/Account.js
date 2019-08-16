import React, { Component } from 'react';

class Account extends Component {
    render() {
        if (this.props.name !== "") {
            return (<h3> Hello {this.props.name} </h3>);
        }
        return (
            <span>
                <input type="submit" value="Sign Up" />
                <input type="submit" value="Sign In" onClick={this.props.setModalTrue} />
            </span>
        );
    }
}

export default Account;