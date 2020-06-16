import React, { Component } from "react";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser()
    };
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div className="col-md-12">
        <div className="card card-container">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </div>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
        <strong>Name:</strong>{" "}
        {currentUser.name}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
      </div>
    );
  }
}