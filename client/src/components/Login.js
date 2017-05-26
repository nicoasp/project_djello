import React from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

const loginAlert = (error) => {
  if (!error) return null;
  return (
    <Alert color="danger">
      {error}
    </Alert>
  )
}

export default class Example extends React.Component {
  render() {
    return (
      <div>
        <h1>Login</h1>
        {loginAlert(this.props.error)}
        <Form onSubmit={this.props.onSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email" />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="Password" />
          </FormGroup>
          <Button>Log In</Button>
        </Form>
      </div>
    );
  }
}