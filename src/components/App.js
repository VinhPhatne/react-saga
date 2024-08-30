import React from "react";
import UserList from "./UserList";
import { Alert, notification, Button } from "antd";
import { useNavigate } from "react-router-dom";
import useListBase from "../hook/useListBase";
import { Api } from "../api/config";
import useFetch from "../hook/useFetch";

const App = () => {
  const navigate = useNavigate();

  const { data } = useListBase(Api.user);

  const { fetchData } = useFetch(Api.user);

  console.log("dataa user", data);

  const handleDeleteUserClick = async (userId) => {
    try {
      const response = await fetchData("delete", { id: userId });
      if (response) {
        console.log("delete user", userId);
        notification.success({
          message: "User Deleted",
          description: "The user has been successfully deleted.",
        });
      } else {
        throw new Error("Failed to delete the user. No response from the server.");
      }
    } catch (error) {
      console.error("Error while deleting user:", error);
      notification.error({
        message: "Error",
        description: "Failed to delete the user.",
      });
    }
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
