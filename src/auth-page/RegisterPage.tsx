import React, { useMemo } from 'react';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import './AuthPage.css';
import { Formik } from 'formik';
import { PasswordField } from '../components/AuthComponents';
import {
    Box,
    Button,
    Divider,
    Link,
    TextField,
    Typography,
  } from '@mui/material';

function RegisterPage () {
    const navigate = useNavigate();
    const validationSchema = useMemo(
        () =>
        Yup.object().shape({
          username: Yup.string().required('Username is required'),
          email: Yup.string().email('Invalid email').required('Email is required'),
          password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
          repeatPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Repeat your password'),
        }),
      []
    );

    const onFormSubmit = async (values: {
    username: string;
    email: string,
    password: string;
    repeatPassword: string;
    }) => {
    console.log(values);
    localStorage.setItem('registerData', JSON.stringify(values)) // keeping register data from the 1st step
    navigate('/register_customer_info');
    };

    return (
        <>
          <div className="auth-page">
            <Box className="auth-form-container">
              <Typography
                variant="h2"
                component="div"
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  fontWeight: '100',
                  fontFamily: 'Caveat',
                  fontSize: '3rem',
                }}
              >
                Create an account
              </Typography>
              <Formik
                initialValues={{ username: '', email: '', password: '', repeatPassword:'' }}
                validationSchema={validationSchema}
                onSubmit={onFormSubmit}
                validateOnChange
                validateOnBlur
              >
                {(formik: any) => (
                  <form
                    className="auth-form"
                    id="sign-form"
                    onSubmit={formik.handleSubmit}
                  >
                    <TextField
                      id="username"
                      variant="outlined"
                      color="primary"
                      name="username"
                      label="Username"
                      slotProps={{
                        input: {
                          style: {
                            borderRadius: '28px',
                          },
                        },
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.username && !!formik.errors.username}
                      helperText={formik.touched.username && formik.errors.username}
                    />
                    <TextField 
                        id="email"
                        name="email"
                        label="Email"
                        variant="outlined"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email} 
                        slotProps={{
                            input: {
                              style: {
                                borderRadius: '28px',
                              },
                            },
                          }}
                    />
                    <PasswordField
                      id="password"
                      name="password"
                      label="Password"
                      handleBlur={formik.handleBlur}
                      handleChange={formik.handleChange}
                      error={formik.touched.password && !!formik.errors.password}
                    />
                    {formik.dirty &&
                      !!formik.errors &&
                      ((formik.errors.username && (
                        <p className="auth-form-error">{formik.errors.username}</p>
                      )) ||
                        (formik.errors.password && (
                          <p className="auth-form-error">
                            {formik.errors.password}
                          </p>
                        )))}
                    <PasswordField
                        id="repeatPassword"
                        name="repeatPassword"
                        label="Repeat Password"
                        handleBlur={formik.handleBlur}
                        handleChange={formik.handleChange}
                        error={formik.touched.repeatPassword && !!formik.errors.repeatPassword}
                    />
                    {formik.touched.repeatPassword && formik.errors.repeatPassword && (
                        <p className="auth-form-error">{formik.errors.repeatPassword}</p>
                    )}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem'}}>
                        <Button
                        variant="contained"
                        sx={{ borderRadius: '28px', color: 'white'}}
                        type="submit"
                        disabled={!(formik.isValid && formik.dirty)}>
                            Continue
                        </Button>
                        <Button
                        variant="outlined"
                        sx={{ borderRadius: '28px', flex: 1 }}
                        /* to be finished */
                        onClick={() => alert('Registering as artist...')}> 
                            Continue as an Artist
                        </Button>
                    </Box>
                  </form>
                )}
              </Formik>
              <Divider />
              <h3>
                Already have an account? <a href="/login">Login</a>
              </h3>
            </Box>
          </div>
        </>
      );
}

export default RegisterPage;