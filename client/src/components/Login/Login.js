import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';

import axios from 'axios';

const Login = () => {
  const [state, setState] = useState({
    isLoading: false,
    loginFormEmail: "",
    loginFormPassword: "",
    errorMsg: null
  });

  const handleChange = (event) => {
      setState({...state, [event.target.name]: event.target.value})
  }

  const loginSubmit = (event) => {
      event.preventDefault();
      axios.defaults.xsrfCookieName = 'csrftoken'
      axios.defaults.xsrfHeaderName = 'X-CSRFToken'
      const {loginFormEmail, loginFormPassword} = state;
      axios.post('/login', {loginFormEmail, loginFormPassword})
          .then(res => {
              setState(res.data);
              setState({...state, errorMsg:null});
              return <Redirect  to="/dashboard" />
          })
          .catch(res => {
              console.log("catch err = ", res.message)
              setState({...state, errorMsg:"Invalid Login Attempt. Try again..."})
          })
      setState({isLoading: true});
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="8">
            <CardGroup>
              <Card className="p-4">
                <CardBody>
                  <Form onSubmit={loginSubmit}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>
                        <InputGroupText>
                          <i className="icon-user"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="text" name="loginFormEmail" placeholder="Email" autoComplete="loginFormEmail" onChange={handleChange} />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon>
                        <InputGroupText>
                        <i className="icon-lock"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" name="loginFormPassword" placeholder="Password" autoComplete="loginFormPassword" />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button color="primary" className="px-4">Login</Button>
                      </Col>
                      <Col xs="6" className="text-right">
                        <Button color="link" className="px-0">Forgot password?</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Need an account?</p>
                    <Link to="/register">
                      <Button color="info" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login
