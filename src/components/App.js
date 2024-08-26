import React, { Component } from "react";
import NewUserForm from "./NewUserForm";
import UserList from "./UserList";
import { connect } from "react-redux";
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError,
} from "../actions/users";
import { Alert } from "antd";

class App extends Component {
  constructor(props) {
    super(props);

    this.props.getUsersRequest();
  }

  handleSubmit = ({ firstName, lastName }) => {
    this.props.createUserRequest({
      firstName,
      lastName,
    });
  };

  handleDeleteUserClick = (userId) => {
    this.props.deleteUserRequest(userId);
  };

  handleCloseAlert = () => {
    this.props.usersError({
      error: "",
    });
  };

  render() {
    const users = this.props.users;
    return (
      <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
        <Alert
          type="error"
          message={this.props.users.error}
          banner
          closable
          onClose={this.handleCloseAlert}
          style={{ marginBottom: "20px" }}
        />
        <NewUserForm onSubmit={this.handleSubmit} />
        <UserList
          onDeleteUser={this.handleDeleteUserClick}
          users={users.items}
        />
      </div>
    );
  }
}

export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  usersError,
})(App);
