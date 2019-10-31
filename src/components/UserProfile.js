import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import "./UserProfile.css"

class UserProfile extends Component {
  render() {
    return (
      <div>
        <div className="profile">
          <img
            src="assets/img/portrait.png"
            alt="portrait"
            className="avatar"
          />
          <p>Welcome! {this.props.firstName} {this.props.lastName}<br/>Last login: {this.props.lastLogin}</p>
          
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return{
        lastName: state.user.lastName,
        firstName: state.user.firstName,
        lastLogin: state.user.lastLogin,
    }
}

export default connect(mapStateToProps)(UserProfile);
