import React, { useMemo } from 'react';
import './AuthPage.css';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Divider,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from '../components/AuthComponents';
import { LoginData } from '../models/AuthModels';
import { useApi } from '../api/ApiProvider';

function LoginPage() {
  const navigate = useNavigate();
  const apiClient = useApi();

  const validationSchema = useMemo(
    () =>
      Yup.object().shape({
        email: Yup.string().email().required('Email field is required'),
        password: Yup.string()
          .required('Password field is required')
          .min(8, 'Password must be at least 8 characters'),
      }),
    [],
  );

  const onFormSubmit = async (loginData: LoginData) => {
    console.log(loginData);
    const loginResult = await apiClient.login(loginData);

    if (!loginResult.success) {
      alert("Wrong username or password!");
      return;
    }

    console.log(loginResult);
    navigate(loginResult.destination);
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
            Sign in
          </Typography>
          <Formik
            initialValues={new LoginData()}
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
                  id="email"
                  variant="outlined"
                  color="primary"
                  name="email"
                  label="E-mail"
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
                <Link href={'/password-recovery'} sx={{ color: 'gray' }}>
                  Forgot password?
                </Link>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    borderRadius: '28px',
                    color: 'white',
                  }}
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Login
                </Button>
              </form>
            )}
          </Formik>
          <Divider />
          <h3>
            Don't have an account? <a href={'/register'}>Sign up</a>
          </h3>
        </Box>
      </div>
    </>
  );
}

export default LoginPage;
