import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import PropTypes from 'prop-types';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [usernameError, setUsernameError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [confirmPasswordError, setconfirmPasswordError] = useState({});
  const [birthdateError, setBirthdateError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let setisValid = formValidation();
    if (setisValid) {
      axios.post('https://myflixcl.herokuapp.com/users', {
        Username: username,
        Password: password,
        ConfirmPassword: confirmPassword,
        Email: email,
        Birthdate: birthdate
      })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
          alert("You have sucessfully registered.");
        })
        .catch(error => {
          if (error.response && error.response.status === 400) {
            setUsernameError({ usernameDuplicated: 'Username already exists.' })
          } else {
            alert('The value you entered is not valid.')
          }
        });
      console.log(username, password, email, birthdate);
    };
  }

  const formValidation = () => {
    const usernameError = {};
    const emailError = {};
    const passwordError = {};
    const confirmPasswordError = {};
    const birhdateError = {};
    let isValid = true;
    if (username.trim().length < 5) {
      usernameError.usernameShort = "Must be alphanumeric and contains at least 5 characters";
      isValid = false;
    }
    else if (password.trim().length < 4) {
      passwordError.passwordMissing = "You must enter a password.(minimum 4 characters) ";
      isValid = false;
    }
    else if (password !== confirmPassword) {
      confirmPasswordError.passwordMismatch = "Your passwords do not match.";
      isValid = false;
    }
    else if (!email.includes(".") || !email.includes("@")) {
      emailError.emailNotEmail = "A valid email address is required.";
      isValid = false;
    }
    else if (birthdate === '') {
      birhdateError.noBirthdate = "Please enter a birthdate";
      isValid = false;
    }
    setUsernameError(usernameError);
    setEmailError(emailError);
    setPasswordError(passwordError);
    setconfirmPasswordError(confirmPasswordError);
    setBirthdateError(birhdateError);
    return isValid;
  };

  return (
    <Row className="justify-content-center">
      <Col md={6}>
        <Form>
          <h1><center>Sign Up</center></h1>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" value={username} placeholder='Enter Username' onChange={e => setUsername(e.target.value)} />
            {Object.keys(usernameError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {usernameError[key]}
                </div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" value={password} placeholder='Enter Password' onChange={e => setPassword(e.target.value)} />
            {Object.keys(confirmPasswordError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {confirmPasswordError[key]}
                </div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="confirmformPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control type="password" value={confirmPassword} placeholder='Enter Password' onChange={e => setConfirmPassword(e.target.value)} />
            {Object.keys(passwordError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {passwordError[key]}
                </div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" value={email} placeholder='Enter your Email' onChange={e => setEmail(e.target.value)} />
            {Object.keys(emailError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {emailError[key]}
                </div>
              );
            })}
          </Form.Group>

          <Form.Group controlId="formBirthdate">
            <Form.Label>Birthdate:</Form.Label>
            <Form.Control type="date" placeholder='MM/DD/YYYY' onChange={e => setBirthdate(e.target.value)} />
            {Object.keys(birthdateError).map((key) => {
              return (
                <div key={key} style={{ color: "red" }}>
                  {birthdateError[key]}
                </div>
              );
            })}
          </Form.Group>
          <Button type='submit' onClick={handleSubmit} block>Submit</Button>
        </Form>
      </Col>
    </Row >
  )
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthdate: PropTypes.string.isRequired
  }),
};
