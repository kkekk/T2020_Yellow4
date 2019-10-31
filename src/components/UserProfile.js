import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import "./UserProfile.css";

class UserProfile extends Component {
  render() {
    return (
      <div>
        <div className="profile">
          {this.props.firstName ? (
            <div>
              <img
                src="assets/img/portrait.png"
                alt="portrait"
                className="avatar"
              />{" "}
              <p>
                Welcome! {this.props.firstName} {this.props.lastName}
                <br />
                Last login: {this.props.lastLogin}
              </p>
            </div>
          ) : (
            <Link to="/login"><p>please login</p></Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lastName: state.user.lastName,
    firstName: state.user.firstName,
    lastLogin: state.user.lastLogin
  };
};

export default connect(mapStateToProps)(UserProfile);
