import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { useAuth } from '../Auth/Context';

const Register = () => {
  const [ resp, changeResponse ] = useState(null);
  const [ username, changeUsername ] =  useState('');
  const [ password1, changePassword1 ] =  useState('');
  const [ password2, changePassword2 ] =  useState('');
  const [ email, changeEmail ] =  useState('');
  const [ toDashboard, setToDashboard ] = useState(false);
  const { setAuthTokens } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch('/dj-rest-auth/registration/', {
      method: 'POST',
      credentials: 'omit',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body:  JSON.stringify({username, password1, password2, email})
    }).then(resp => resp.json()).then(data => {
        console.log("register: fetch: data = ", data)
        if (data.access_token) {
          setAuthTokens(data)
          // localStorage.setItem('access_token', data.access_token);
          // localStorage.setItem('refresh_token', data.refresh_token);
          setToDashboard(true)
        } else {
          changeResponse(data)
        }
    }).catch(error => console.log('error ->', error))
  }

  return (
    <div>
      {
        toDashboard && <Redirect to="/defaultlayout"/>
      }
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>
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
                        onChange={(e) => changeEmail(e.target.value)}
                        value={email}
                        type='email'
                        name='email'
                        autoComplete="email"
                        placeholder="Email"/>
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>                    
                      </InputGroupAddon>
                      <Input
                        onChange={(e) => changePassword1(e.target.value)}
                        value={password1}
                        type='password'
                        name='password1'
                        autoComplete="password1"
                        placeholder="Enter password"/>                 
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>
                        <InputGroupText>
                          <i className="icon-lock"></i>
                        </InputGroupText>                    
                      </InputGroupAddon>
                      <Input
                        onChange={(e) => changePassword2(e.target.value)}
                        value={password2}
                        type='password'
                        name='password2'
                        autoComplete="password2"
                        placeholder="Confirm password"/>                 
                    </InputGroup>
                    <Button color="success" block>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-linkedin mb-1" block><span>LinkedIn</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-github mb-1" block><span>GitHub</span></Button>
                    </Col>
                  </Row>
                  <Row className="SignUpLink m-2">
                      <span className="pr-2">Have an account?</span> <Link to={'/login'}>Log in</Link>
                  </Row>
                  <Row>
                    {resp &&
                      <div className={'response'}>
                        <code>
                          <strong>{JSON.stringify(Object.values(resp)[0][0])}</strong>
                        </code>
                      </div>
                    }
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Register
