import React, { useEffect, useState } from "react";
import NewUserForm from "./NewUserForm";
import UserList from "./UserList";
import { connect, useDispatch } from "react-redux";
import {
  getUsersRequest,
  createUserRequest,
  deleteUserRequest,
  updateUserRequest,
  usersError,
} from "../actions/users";
import * as api from "../api/users";
import { Alert, notification, Button } from "antd";
import EditModal from "./EditModal";
import useDisclosure from "../hook/useDisclosure";
import { useNavigate } from "react-router-dom";
import useListBase from "../api/useListBase";
import { Api } from "../api/config";

const App = () => {
  const { isOpen, openModal, closeModal } = useDisclosure();
  const [editingUser, setEditingUser] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data } = useListBase(Api.user);


  //const { data, handleSubmit } = useListBase(Api.user);
  // const users = useSelector(state => state.users); //lấy state users từ redux store

  // useEffect(() => {
  //   dispatch(getUsersRequest());

  //   fetchUsers(); // Gọi hàm để get List
  // }, [dispatch]);

    // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);

  console.log("dataa user", data);



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

    navigate(`/user/${user.id}`, { state: { user, mode: "Edit" } });
  };

  const handleCreate = () => {
    // setEditingUser(user);
    // openModal();

    //navigate(`/user/${user.id}`);

    navigate(`/user`, { state: { mode: "Create" } });
  };

  const handleCloseAlert = () => {
    usersError({ error: "" });
  };

  return (
    <div
      style={{ margin: "0 auto", padding: "20px", maxWidth: "600px", flex: "" }}
    >
      <Alert
        type="error"
        message={data.error}
        banner
        closable
        onClose={handleCloseAlert}
        style={{ marginBottom: "20px" }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button style={{width : "140px", marginTop: "10px"}} danger onClick={handleCreate}>
          Create
        </Button>
      </div>
      {/* <NewUserForm onSubmit={handleSubmit} /> */}

      <EditModal
        visible={isOpen}
        onCancel={closeModal}
        onSubmit={handleSubmit}
        editingUser={editingUser}
      />
      <UserList
        onDeleteUser={handleDeleteUserClick}
        onEditUser={handleEditUserClick}
        users={data.items}
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
