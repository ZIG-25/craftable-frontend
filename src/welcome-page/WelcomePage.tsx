import '../App.css';
import './WelcomePage.css';
import React, { useMemo } from 'react';
import logo from '../res/images/logo.png';
import { GuestTopBar } from '../top-bars/GuestTopBar';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { DEFAULT_CONFIG } from '../shared/constants';
import { PasswordField } from '../components/AuthComponents';

export function WelcomePage() {
  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        username: Yup.string().email().required('Username field is required'),
        password: Yup.string()
          .required('Password field is required')
          .min(8, 'Password must be at least 8 characters'),
      }),
    [],
  );

  const onFormSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    console.log(values);
  };
  return (
    <>
      <GuestTopBar />
      <Box className="welcome-page-box">
        <div className="welcome-page-container">
          <div className="welcome-page-left-panel">
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
              Empowering artists and artisans—sell, showcase, and thrive in a
              secure, creative space.
            </Typography>
            <Box className="welcome-page-login-box">
              <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={onFormSubmit}
                validateOnChange
                validateOnBlur
              >
                {(formik: any) => (
                  <form
                    className="login-form"
                    id="sign-form"
                    onSubmit={formik.handleSubmit}
                  >
                    <TextField
                      id="username"
                      variant="outlined"
                      color="primary"
                      name="username"
                      label="Your email"
                      slotProps={{
                        input: {
                          style: {
                            borderRadius: '28px',
                          },
                        },
                      }}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.username && !!formik.errors.username
                      }
                    />
                    <PasswordField
                      id="password"
                      name="password"
                      label="Your password"
                      handleBlur={formik.handleBlur}
                      handleChange={formik.handleChange}
                      error={
                        formik.touched.password && !!formik.errors.password
                      }
                    />
                    {formik.dirty &&
                      !!formik.errors &&
                      ((formik.errors.username && (
                        <p className="login-form-error">
                          {formik.errors.username}
                        </p>
                      )) ||
                        (formik.errors.password && (
                          <p className="login-form-error">
                            {formik.errors.password}
                          </p>
                        )))}
                    <Button
                      variant="contained"
                      size="large"
                      type="submit"
                      sx={{
                        borderRadius: '28px',
                        color: 'white',
                        fontFamily: 'Ubuntu',
                        fontSize: '1.6rem',
                      }}
                      disabled={!(formik.isValid && formik.dirty)}
                    >
                      Login
                    </Button>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        color: DEFAULT_CONFIG.colors.grayText,
                      }}
                    >
                      By signing up, you agree to the Terms of Service
                    </Typography>
                  </form>
                )}
              </Formik>
            </Box>
          </div>

          <div className="welcome-page-right-panel">
            <img src={logo} alt={'logo'} className="welcome-page-logo" />
            <Typography
              variant="h4"
              component="div"
              className="welcome-page-title2"
              sx={{
                fontWeight: '500',
                fontFamily: 'Ubuntu',
                color: DEFAULT_CONFIG.colors.grayText,
              }}
            >
              A dedicated platform connecting artisans and artists with
              customers, offering a space to sell their creations and showcase
              their work. With secure transactions and tailored advertising, it
              provides a reliable and supportive environment for creative
              professionals to thrive.
            </Typography>
          </div>
        </div>
      </Box>
    </>
  );
}
