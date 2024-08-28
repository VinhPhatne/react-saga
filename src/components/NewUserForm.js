import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const NewUserForm = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      firstName,
      lastName,
    });
    
    setFirstName('');
    setLastName('');
  };

  return (
    <div style={{ margin: "0 auto", padding: "20px", maxWidth: "600px" }}>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>First name</Label>
          <Input
            required
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Last name</Label>
          <Input
            required
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button block outline type="submit" color="primary">
            Create
          </Button>
        </FormGroup>
      </Form>
      <div />
    </div>
  );
};

export default NewUserForm;
