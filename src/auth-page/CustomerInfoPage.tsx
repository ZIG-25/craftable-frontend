import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import './AuthPage.css';
import {
  AddionalCustomerData,
  CustomerRegistrationData,
} from '../models/AuthModels';
import { useApi } from '../api/ApiProvider';

function CustomerInfoPage() {
  const navigate = useNavigate();
  const clientApi = useApi();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last name is required'),
    bio: Yup.string().max(500, 'Bio must be under 500 characters'),
  });

  const onFormSubmit = async (customerData: AddionalCustomerData) => {
    const basicData = JSON.parse(localStorage.getItem('registerData') || '{}'); // joining data from the 1st sign-up form
    const fullData = new CustomerRegistrationData(basicData, customerData);
    localStorage.removeItem('registerData'); // deleting data from storage

    const registrationResult = await clientApi.registerCustomer(fullData);
    if (!registrationResult.success) {
      alert(registrationResult.data);
      navigate('/register');
      return;
    }

    navigate('/login');
  };

  return (
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
          Tell us more about yourself
        </Typography>

        <Formik
          initialValues={new AddionalCustomerData()}
          validationSchema={validationSchema}
          onSubmit={onFormSubmit}
        >
          {(formik: any) => (
            <form className="auth-form" onSubmit={formik.handleSubmit}>
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                slotProps={{
                  input: {
                    style: {
                      borderRadius: '28px',
                    },
                  },
                }}
              />

              <TextField
                id="lastName"
                name="lastName"
                label="Last Name"
                variant="outlined"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                slotProps={{
                  input: {
                    style: {
                      borderRadius: '28px',
                    },
                  },
                }}
              />

              <TextField
                id="bio"
                name="bio"
                label="Bio"
                variant="outlined"
                multiline
                rows={4}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
                slotProps={{
                  input: {
                    style: {
                      borderRadius: '28px',
                    },
                  },
                }}
              />

              <Button
                variant="contained"
                size="large"
                sx={{ borderRadius: '28px', color: 'white' }}
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Sign up
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default CustomerInfoPage;
