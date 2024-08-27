import React from "react";
import { List, Button, Modal, message, Popconfirm } from "antd";

const UserList = ({ users, onDeleteUser, onEditUser }) => {
  const confirm = (userId) => {
    console.log(userId);
    onDeleteUser(userId);
    //message.success("Deleted user");
  };
  const cancel = (e) => {
    console.log(e);
    //message.error("Cancel Delete");
  };

  return (
    <List
      dataSource={users.sort((a, b) => {
        if (a.firstName > b.firstName) {
          return 1;
        } else if (a.firstName < b.firstName) {
          return -1;
        } else if (a.lastName > b.lastName) {
          return 1;
        } else if (a.lastName < b.lastName) {
          return -1;
        }
        return 0;
      })}
      renderItem={(user) => (
        <List.Item key={user.id}>
          <section style={{ display: "flex", width: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              {user.firstName} {user.lastName}
            </div>
            <div>
              <Button
                type="primary"
                style={{ marginRight: "16px" }}
                onClick={() => {
                  console.log("Edit user >>> ", user);
                  onEditUser(user);
                }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Delete User"
                description="Are you sure to delete this user?"
                onConfirm={() => confirm(user.id)}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <Button danger >Delete</Button>
              </Popconfirm>

            </div>
          </section>
        </List.Item>
      )}
    />
  );
};

export default UserList;
