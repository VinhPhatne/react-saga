import React, { Component } from "react";
import { Button, Form, Input } from "antd";

class NewUserForm extends Component {
  state = {
    firstName: "",
    lastName: "",
  };

  // This function is triggered when the form is submitted
  handleSubmit = (values) => {
    const { firstName, lastName } = values;

    this.props.onSubmit({
      firstName,
      lastName,
    });

    // Reset the form fields after submission
    this.setState({
      firstName: "",
      lastName: "",
    });
  };

  render() {
    return (
      <Form
        onFinish={this.handleSubmit} // Use onFinish to handle form submission
        name="wrap"
        labelAlign="left"
        labelWrap
        layout="vertical"
        colon={false}
        style={{ maxWidth: 600, marginTop: "30px" }}
        initialValues={this.state} // Set the initial values of the form fields
        requiredMark={false}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input
            value={this.state.firstName}
            onChange={(e) => this.setState({ firstName: e.target.value })}
            style={{ height: "40px" }}
          />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input
            value={this.state.lastName}
            onChange={(e) => this.setState({ lastName: e.target.value })}
            style={{ height: "40px", marginBottom: "0px" }}
          />
        </Form.Item>

        <Form.Item>
          <Button
            block
            type="primary"
            htmlType="submit"
            style={{ height: "40px" }}
          >
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default NewUserForm;
