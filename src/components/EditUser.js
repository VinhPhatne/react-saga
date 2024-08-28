import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { createUserRequest, updateUserRequest } from "../actions/users";
import { notification } from "antd";
import { useDispatch } from "react-redux";

const EditUser = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { state } = location;
  const { user, mode } = state || {};
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    if (mode === "Edit" && user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
      });
      setIsCreating(false);
    } else {
      form.resetFields();
      setIsCreating(true);
    }
  }, [mode, user, form]);
  //   if (mode === "Edit" && user?.id) {
  //     createUserRequest(values);
  //     notification.success({
  //       message: "User Created",
  //       description: "A new user has been successfully created.",
  //     });
  //   } else {
  //     const { id } = user || {};
  //     updateUserRequest({ id, ...values });
  //     notification.success({
  //       message: "User Updated",
  //       description: "The user has been successfully updated.",
  //     });
  //   }
  //   form.resetFields();
  //   console.log("User data:", { id: user?.id, ...values });
  //   navigate("/");
  // };

  const handleFinish = (values) => {
    if (mode === "Edit" && user?.id) {
      dispatch(updateUserRequest({ id: user.id, ...values }));
      console.log("Edited User data:", { id: user?.id, ...values });
      notification.success({
        message: "User Updated",
        description: "The user has been successfully updated.",
      });
    } else {
      dispatch(createUserRequest(values));
      console.log("Created User data:", { values });
      notification.success({
        message: "User Created",
        description: "A new user has been successfully created.",
      });
    }
    navigate("/");
  };

  return (
    <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{ textAlign: "right" }}>
          <Button onClick={() => navigate("/")} style={{ marginRight: "16px" }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {isCreating ? "Create" : "Update"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditUser;
