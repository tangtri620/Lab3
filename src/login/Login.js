import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";

function Login() {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <Container>
      {!isRegistering ? (
        <>
          <h2>Login</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <p className="mt-3">
            Don't have an account?{" "}
            <Button variant="link" onClick={toggleForm}>
              Register here
            </Button>
          </p>
        </>
      ) : (
        <>
          <h2>Register</h2>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" placeholder="Confirm Password" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <p className="mt-3">
            Already have an account?{" "}
            <Button variant="link" onClick={toggleForm}>
              Login here
            </Button>
          </p>
        </>
      )}
    </Container>
  );
}

export default Login;
