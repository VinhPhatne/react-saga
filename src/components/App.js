import React, { useEffect, useState } from "react";
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
// import { useDisclosure } from "@chakra-ui/react";
import EditModal from "./EditModal";
import useDisclosure from "../hook/useDisclosure";
import { useNavigate } from "react-router-dom";

const App = ({
  users,
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  updateUserRequest,
  usersError,
}) => {
  const { isOpen, openModal, closeModal } = useDisclosure();
  const [editingUser, setEditingUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    getUsersRequest();
  }, [getUsersRequest]);

  const handleSubmit = (values) => {
    const { id } = editingUser || {};
    if (id) {
      updateUserRequest({ id, ...values });
      notification.success({
        message: "User Updated",
        description: "The user has been successfully updated.",
      });
    } else {
      createUserRequest(values);
      notification.success({
        message: "User Created",
        description: "A new user has been successfully created.",
      });
    }
    setEditingUser(null);
    closeModal();
  };

  const handleDeleteUserClick = (userId) => {
    deleteUserRequest(userId);
    notification.success({
      message: "User Deleted",
      description: "The user has been successfully deleted.",
    });
  };

  const handleEditUserClick = (user) => {
    // setEditingUser(user);
    // openModal();
    
    //navigate(`/user/${user.id}`);
  
    navigate(`/user/${user.id}`, { state: { user } })
  };

  const handleCloseAlert = () => {
    usersError({ error: "" });
  };

  return (
    <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
      {users.error && (
        <Alert
          type="error"
          message={users.error}
          banner
          closable
          onClose={handleCloseAlert}
          style={{ marginBottom: "20px" }}
        />
      )}

      <NewUserForm onSubmit={handleSubmit} />

      <EditModal
        visible={isOpen}
        onCancel={closeModal}
        onSubmit={handleSubmit}
        editingUser={editingUser}
      />
      <UserList
        onDeleteUser={handleDeleteUserClick}
        onEditUser={handleEditUserClick}
        users={users.items}
      />
    </div>
  );
};

export default connect(({ users }) => ({ users }), {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  updateUserRequest,
  usersError,
})(App);
