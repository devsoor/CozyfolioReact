import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import axios from 'axios';

const Register = () => {
  const [state, setState] = useState({
    isLoading: false,
    registerFormFirstName: "",
    registerFormLastName: "",
    registerFormEmail: "",
    registerFormPassword: "",
    registerFormConfirmPassword: "",
    error: null
  });

  const [errors, setErrors] = useState([]); 

  const handleChange = (event) => {
      setState({...state, [event.target.name]: event.target.value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    const {registerFormFirstName, registerFormLastName, registerFormEmail, registerFormPassword, registerFormConfirmPassword} = state;
    console.log(registerFormFirstName, registerFormLastName, registerFormEmail, registerFormPassword, registerFormConfirmPassword)
    axios.post('/register', {registerFormFirstName, registerFormLastName, registerFormEmail, registerFormPassword, registerFormConfirmPassword})
        .then(res => {
            setState(res.data);
            return  <Redirect  to="/dashboard" />
        })
        .catch(err => {
            const errorResponse = err.response.data.errors;
            const errorArr = [];
            for (const key of Object.keys(errorResponse)) {
                errorArr.push(errorResponse[key].message)
            }
            setErrors(errorArr);
        })    
}

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col md="9" lg="7" xl="6">
            <Card className="mx-4">
              <CardBody className="p-4">
                <Form action="register" method="post">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="registerFormFirstName" placeholder="First Name" autoComplete="registerFormFirstName" onChange={handleChange} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>
                      <InputGroupText>
                        <i className="icon-user"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="registerFormLastName" placeholder="Last Name" autoComplete="registerFormLastName" onChange={handleChange} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>
                      <InputGroupText>@</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name="registerFormLastName" placeholder="Email" autoComplete="registerFormLastName" onChange={handleChange} />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" name="registerFormPassword" placeholder="Password" autoComplete="registerFormPassword" onChange={handleChange} />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon>
                      <InputGroupText>
                        <i className="icon-lock"></i>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" name="registerFormConfirmPassword" placeholder="Repeat password" autoComplete="registerFormConfirmPassword" onChange={handleChange} />
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
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Register
