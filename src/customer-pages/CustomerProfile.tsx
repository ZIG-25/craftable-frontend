import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Footer } from '../footers/Footer';
import { ArtistTopBar } from '../top-bars/ArtistTopBar';

export default function CustomerProfile() {
  const [alertOpen, setAlertOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      username: 'Username',
      name: 'Name',
      lastName: 'LastName',
      email: 'E-mail',
      bio: 'Some bio',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      name: Yup.string().required('Name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      bio: Yup.string().required('Bio is required'),
    }),
    onSubmit: () => {
      setAlertOpen(true);
    },
  });

  return (
    <>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <ArtistTopBar />

        <Box sx={{ flex: 1, p: "5rem", display: 'flex', justifyContent: 'center' }}>
          <Box
            component="form"
            onSubmit={formik.handleSubmit}
            sx={{
              width: '100%',
              maxWidth: 900,
              display: 'flex',
              gap: 4,
              flexDirection: { xs: 'column', md: 'row' },
              border: '1px solid #e0f2f1',
              borderRadius: 4,
              p: 4,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h5" fontWeight="bold" mb={2}>
                Your profile
              </Typography>

              <Typography variant="caption" fontWeight="bold" color="primary">
                USERNAME
              </Typography>
              <TextField
                fullWidth
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                sx={{ mb: 2, borderRadius: 4 }}
              />

              <Typography variant="caption" fontWeight="bold" color="primary">
                NAME
              </Typography>
              <TextField
                fullWidth
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                sx={{ mb: 2, borderRadius: 4 }}
              />

              <Typography variant="caption" fontWeight="bold" color="primary">
                LAST NAME
              </Typography>
              <TextField
                fullWidth
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                sx={{ mb: 2, borderRadius: 4 }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" fontWeight="bold" color="primary">
                E-MAIL
              </Typography>
              <TextField
                fullWidth
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                sx={{ mb: 2 }}
              />

              <Typography variant="caption" fontWeight="bold" color="primary">
                BIO
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                name="bio"
                value={formik.values.bio}
                onChange={formik.handleChange}
                sx={{ mb: 2 }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: '#25dac5',
                      borderRadius: '24px',
                      textTransform: 'none',
                    }}
                  >
                    Update bio
                  </Button>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{
                      borderRadius: '24px',
                      textTransform: 'none',
                      // not important yet to change the password 
                    }}
                  >
                    Change password
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>

        <Footer />
      </Box>
    </>
  );
}