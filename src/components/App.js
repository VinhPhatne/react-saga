import React from "react";
import UserList from "./UserList";

import * as api from "../api/users";
import { Alert, notification, Button } from "antd";
import { useNavigate } from "react-router-dom";
import useListBase from "../hook/useListBase";
import { Api } from "../api/config";

const App = () => {
  const navigate = useNavigate();

  const { data } = useListBase(Api.user);

  console.log("dataa user", data);

  const handleDeleteUserClick = async (userId) => {
    await api.deleteUser(userId);
    notification.success({
      message: "User Deleted",
      description: "The user has been successfully deleted.",
    });
  };

  const handleEditUserClick = (user) => {
    navigate(`/user/${user.id}`, { state: { user, mode: "Edit" } });
  };

  const handleCreate = () => {
    navigate(`/user/create`, { state: { mode: "Create" } });
  };

  const handleCloseAlert = () => {
    //usersError({ error: "" });
  };

  return (
    <div
      style={{ margin: "0 auto", padding: "20px", maxWidth: "600px", flex: "" }}
    >
      {data.error && (
        <Alert
          type="error"
          message={data.error}
          banner
          closable
          onClose={handleCloseAlert}
          style={{ marginBottom: "20px" }}
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button
          style={{ width: "140px", marginTop: "10px" }}
          danger
          onClick={handleCreate}
        >
          Create
        </Button>
      </div>

      <UserList
        onDeleteUser={handleDeleteUserClick}
        onEditUser={handleEditUserClick}
      />
    </div>
  );
};

export default App;
