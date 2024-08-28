import React, { useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { createUserRequest, updateUserRequest } from "../actions/users";
import { notification } from "antd";

const EditUser = ({ visible, onCancel, onSubmit, editingUser }) => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const { user } = location.state || {};
  const isCreating = !user;

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        firstName: user.firstName,
        lastName: user.lastName,
      });
    } else {
      form.resetFields();
    }
  }, [user, form]);

  const handleFinish = (values) => {
    if (isCreating) {
      createUserRequest(values);
      notification.success({
        message: "User Created",
        description: "A new user has been successfully created.",
      });
    } else {
      const { id } = user || {};
      updateUserRequest({ id, ...values });
      notification.success({
        message: "User Updated",
        description: "The user has been successfully updated.",
      });
    }
    form.resetFields();
    console.log("User data:", { id: user?.id, ...values });
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
