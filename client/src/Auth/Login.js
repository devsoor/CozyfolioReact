import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';
import { useAuth } from "../Auth/Context";

const Login = (props) => {
  const [ resp, changeResponse ] = useState(null);
  const [ username, changeUsername ] =  useState('');
  const [ password, changePassword ] =  useState('');
  const [ toDashboard, setToDashboard ] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const { setAuthTokens } = useAuth();

  const loginSubmit = (event) => {
      event.preventDefault();
      return fetch('/dj-rest-auth/login/', {
        method: 'POST',
        credentials: 'omit',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body:  JSON.stringify({username, password})
      }).then(resp => resp.json()).then(data => {
          if (data.access_token) {
            setAuthTokens(data)
            setToDashboard(true)
        } else {
          changeResponse(data)
        }
      }).catch(error => console.log('error ->', error))
  }

  // if (isLoggedIn) {
  //   return <Redirect to={"/"} />;
  // }

  return (
    <div>
      {
        toDashboard && <Redirect to="/dashboard"/>
      }
      <div className="app flex-row align-items-center">
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
                        <Input
                        onChange={(e) => changeUsername(e.target.value)}
                        value={username}
                        type='input'
                        name='username'
                        autoComplete="username"
                        placeholder="Username"/>  
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon>
                          <InputGroupText>
                          <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          onChange={(e) => changePassword(e.target.value)}
                          value={password}
                          type='password'
                          name='password'
                          autoComplete="password"
                          placeholder="Enter password"/>   
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4">Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                      <Row className="p-2">
                        {resp &&
                          <div className={'response'}>
                            <code>
                              <strong>{JSON.stringify(Object.values(resp)[0][0])}</strong>
                            </code>
                          </div>
                        }
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
    </div>
  )
}

export default Login
