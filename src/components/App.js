import React, { Component } from "react";
import NewUserForm from "./NewUserForm";
import UserList from "./UserList";
import { connect } from "react-redux";
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  updateUserRequest,
  usersError,
} from "../actions/users";
import { Alert, notification } from "antd";
import EditModal from "./EditModal";

class App extends Component {
  state = {
    editingUser: null,
    isModalVisible: false,
  };

  componentDidMount() {
    this.props.getUsersRequest();
  }

  handleSubmit = ({ id, firstName, lastName }) => {
    if (id) {
      this.props.updateUserRequest({ id, firstName, lastName });
      notification.success({
        message: "User Updated",
        description: "The user has been successfully updated.",
      });
    } else {
      this.props.createUserRequest({ firstName, lastName });
      notification.success({
        message: "User Created",
        description: "A new user has been successfully created.",
      });
    }
    this.setState({ editingUser: null, isModalVisible: false });
  };

  handleDeleteUserClick = (userId) => {
    this.props.deleteUserRequest(userId);
    notification.success({
      message: "User Deleted",
      description: "The user has been successfully deleted.",
    });
  };

  handleEditUserClick = (user) => {
    this.setState({ editingUser: user, isModalVisible: true });
  };

  handleCloseAlert = () => {
    this.props.usersError({ error: "" });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };

  render() {
    const { users } = this.props;
    const { isModalVisible, editingUser } = this.state;
    return (
      <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
        {this.props.users.error && (
          <Alert
            type="error"
            message={this.props.users.error}
            banner
            closable
            onClose={this.handleCloseAlert}
            style={{ marginBottom: "20px" }}
          />
        )}

        <NewUserForm onSubmit={this.handleSubmit} />

        <EditModal
          visible={isModalVisible}
          onCancel={this.handleCancel}
          onSubmit={this.handleSubmit}
          editingUser={editingUser}
        />
        <UserList
          onDeleteUser={this.handleDeleteUserClick}
          onEditUser={this.handleEditUserClick}
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
  updateUserRequest,
  usersError,
})(App);
