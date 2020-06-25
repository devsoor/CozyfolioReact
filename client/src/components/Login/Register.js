import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react';
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
    // axios.defaults.xsrfCookieName = 'csrftoken'
    // axios.defaults.xsrfHeaderName = 'X-CSRFToken'
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
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm action="register" method="post">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="registerFormFirstName" placeholder="First Name" autoComplete="registerFormFirstName" onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="registerFormLastName" placeholder="Last Name" autoComplete="registerFormLastName" onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" name="registerFormLastName" placeholder="Email" autoComplete="registerFormLastName" onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name="registerFormPassword" placeholder="Password" autoComplete="registerFormPassword" onChange={handleChange} />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" name="registerFormConfirmPassword" placeholder="Repeat password" autoComplete="registerFormConfirmPassword" onChange={handleChange} />
                  </CInputGroup>
                  <CButton color="success" block>Create Account</CButton>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-linkedin mb-1" block><span>LinkedIn</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-github mb-1" block><span>GitHub</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
