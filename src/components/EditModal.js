import React, { useEffect } from "react";
import { Modal, Button, Form, Input } from "antd";

const EditModal = ({ visible, onCancel, onSubmit, editingUser }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingUser) {
      form.setFieldsValue({
        firstName: editingUser.firstName,
        lastName: editingUser.lastName,
      });
    } else {
      form.resetFields();
    }
  }, [editingUser, form]);

  const handleFinish = (values) => {
    const { id } = editingUser || {};
    onSubmit({ id, ...values });
    form.resetFields();
    onCancel();
  };

  return (
    <>
        <Modal
          title="Edit User"
          visible={visible}
          onCancel={onCancel}
          footer={null}
        >
          <Form form={form} onFinish={handleFinish} layout="vertical">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item style={{ textAlign: "right" }}>
              <Button onClick={onCancel} style={{ marginRight: "16px" }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    </>
  );
};

export default EditModal;
