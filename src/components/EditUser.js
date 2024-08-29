import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import useSaveBase from "../hook/useSaveBase";
import * as userApi from "../api/users";

const EditUser = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const location = useLocation();

  const { state } = location;
  const { user, mode } = state || {};
  const [isCreating, setIsCreating] = useState(false);

  const saveApi = useSaveBase(userApi.createUser, userApi.updateUser);

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

  // call handle create/update from useSaveBase
  const handleFinish = (values) => {
    saveApi(mode, user?.id, values);
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
