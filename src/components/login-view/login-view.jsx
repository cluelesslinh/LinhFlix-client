import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './login-view.scss';
import { Link } from "react-router-dom";

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('https://myflixcl.herokuapp.com/login', {
    Username: username,
    Password: password
  })
  .then(response => {
    const data = response.data;
    console.log(data);
    props.onLoggedIn(data);
  })
  .catch(_e => {
    console.log('no such user')
  });
};

  return (
    <Form>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <h1 className="title"><center>MYFLIX LOGIN</center></h1>
        </Col>
        <Col md={8}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="current-password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <Button variant="primary mr-3" type="submit" onClick={handleSubmit}>Login</Button>
      <Link to='/register'><Button variant="primary">Register</Button></Link>
    </Col>
  </Row>
    </Form>
  );
}
