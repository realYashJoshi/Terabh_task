// SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button,Container,Row,Col } from 'react-bootstrap';

const SignUp = () => {
  const [userData, setUserData] = useState({ email: '', password: '', type: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', userData);
      navigate('/signin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="mt-5">
    <Row className="justify-content-center">
      <Col xs={12} md={6}>
        <h2 className="mb-4 text-center">Sign Up</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" value={userData.email} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" value={userData.password} onChange={handleChange} required />
          </Form.Group>

          <Form.Group controlId="formBasicType">
            <Form.Label>User Type</Form.Label>
            <Form.Control as="select" name="type" value={userData.type} onChange={handleChange} required>
              <option value="">Select User Type</option>
              <option value="viewer">Viewer</option>
              <option value="business">Business</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>
      </Col>
    </Row>
  </Container>
  );
};

export default SignUp;
