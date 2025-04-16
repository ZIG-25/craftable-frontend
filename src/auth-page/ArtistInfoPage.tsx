import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Chip,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import './AuthPage.css';
import './ArtistInfoPage.css';
import { AdditionalArtistData, CreatorRegistrationData } from '../models/AuthModels';
import { useApi } from '../api/ApiProvider';

function ArtistInfoPage() {
  const navigate = useNavigate();
  const clientApi = useApi();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    lastName: Yup.string().required('Last name is required'),
    bio: Yup.string().max(500, 'Bio must be under 500 characters'),
    phoneNumber: Yup.string().max(400, 'Phone number is required'),
    professions: Yup.array(),
  });

  const onFormSubmit = async (artistData: AdditionalArtistData) => {
    console.log(artistData);
    const basicData = JSON.parse(localStorage.getItem('registerData') || '{}');
    const fullData = new CreatorRegistrationData(basicData, artistData);
    // TODO: Not yet defined on backend side
    // fullData.professions = fullData.professions
    //   .filter((it: {professionName: string, active: boolean}) => it.active)
    //   .map((it: {professionName: string, active: boolean}) => it.professionName);

    localStorage.removeItem('registerData');
    const registrationResult = await clientApi.registerCreator(fullData);

    if (!registrationResult.success) {
      alert(registrationResult.data);
      navigate('/register');
      return;
    }

    navigate('/login');
  };

  return (
    <div className="auth-page">
      <Box className="artist-auth-form-container">
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
          initialValues={new AdditionalArtistData()}
          validationSchema={validationSchema}
          onSubmit={onFormSubmit}
        >
          {(formik: any) => (
            <form className="auth-form" onSubmit={formik.handleSubmit}>
              <Box className="auth-form-inputs">
                <Box className="personal-info-inputs">
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
                    label="Lastname"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                    slotProps={{
                      input: {
                        style: {
                          borderRadius: '28px',
                        },
                      },
                    }}
                  />
                  <TextField
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone number"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber &&
                      Boolean(formik.errors.phoneNumber)
                    }
                    helperText={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    slotProps={{
                      input: {
                        style: {
                          borderRadius: '28px',
                        },
                      },
                    }}
                  />

                </Box>
                <Divider orientation="vertical" flexItem></Divider>
                <Box className="professional-info-inputs">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ textAlign: 'left' }}
                  >
                    Profession
                  </Typography>
                  <Box className="profession-chips-box">
                    {formik.values.professions.map(
                      (
                        it: { professionName: string; active: boolean },
                        index: number,
                      ) => {
                        return (
                          <Chip
                            label={it.professionName}
                            key={it.professionName}
                            sx={{ margin: '0.1rem', color: 'black' }}
                            color="primary"
                            variant={it.active ? 'filled' : 'outlined'}
                            onClick={() => {
                              const updatedProfessions = [
                                ...formik.values.professions,
                              ];
                              updatedProfessions[index].active =
                                !updatedProfessions[index].active;
                              formik.setFieldValue(
                                'professions',
                                updatedProfessions,
                              );
                            }}
                          />
                        );
                      },
                    )}
                  </Box>

                  <TextField
                    id="bio"
                    name="bio"
                    label="Bio"
                    variant="outlined"
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
                </Box>
              </Box>
              <Button
                variant="contained"
                size="large"
                sx={{ borderRadius: '28px', color: 'white' }}
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Register
              </Button>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
}

export default ArtistInfoPage;
