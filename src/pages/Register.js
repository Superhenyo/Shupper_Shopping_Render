import { useState, useEffect, useContext } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Navigate, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';

export default function Register() {
  const { user } = useContext(UserContext);
  const [redirect, setRedirect] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isActive, setIsActive] = useState(false);

  function registerUser(e) {
    e.preventDefault();

    // Your registration logic here...

    // Example fetch call:
    fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {    
        console.log(data)  
      });
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    Swal.fire({
      title: "Successfully Registered!",
      icon: "success",
      text: "Welcome to Shuppe"
    });
    setRedirect(true);
  }

  useEffect(() => {
    if (
      firstName !== "" &&
      lastName !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [firstName, lastName, email, password, confirmPassword]);

  return (
    (user.id !== null) ? (
      <Navigate to='/products' />
    ) : (
      <>
        {redirect && <Navigate to="/login" />}
        <Container className="profileContainer">
          <Row className="justify-content-md-center pt-5">
            <Col xs={12} md={6}>
              <Card className="form-card bg-body-tertiary">
                <Card.Body>
                  <Form onSubmit={(e) => registerUser(e)}>
                    <h1 className="title my-5 text-center text-primary">Register</h1>
                    <Row >
                      <Col>
                        <Form.Group>
                          <Form.Label>First Name:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=""
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                      <Col>
                        <Form.Group>
                          <Form.Label>Last Name:</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder=""
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group className='mb-3'>
                      <Form.Label>Email:</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder=""
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                      <Form.Label>Confirm Password:</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder=""
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </Form.Group>
                    <div className="d-grid gap-2">
                      <Button
                        variant={isActive ? "primary" : "danger"}
                        type="submit"
                        id="submitBtn"
                        disabled={!isActive}
                        className="mx-auto submit"
                        size="lg"
                      >
                        Submit
                      </Button>
                    </div>
                    <p className="message signin text-center">
                      Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    )
  );
}
