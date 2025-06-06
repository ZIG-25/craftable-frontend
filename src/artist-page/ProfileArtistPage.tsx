import { Footer } from '../footers/Footer';
import { ArtistTopBar } from '../top-bars/ArtistTopBar';
import React, { useEffect, useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AddIcon from '@mui/icons-material/Add';
import img from '../res/images/img_placeholder.jpg';
import RemoveIcon from '@mui/icons-material/Remove';
import {
  Box,
  Typography,
  TextField,
  Button,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
  InputAdornment,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ALL_PROFESSIONS, Artist } from '../models/Artist';
import { useApi } from '../api/ApiProvider';
import { EmailOutlined, Label } from '@mui/icons-material';

export default function ProfileArtistPage() {
  const api = useApi();
  const [artist, setArtist] = useState<Artist | null>(null);

  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  // regex expression for validating phone number
  const phoneRegExp = /^\d{3}\d{3}\d{3}/;

  useEffect(() => {

    api.getArtistSigned().then((response) => {
      if (!response.success) {
        console.error(response);
        navigate('/login');
        return;
      }
      setArtist(response.data);
      setSelected(response.data?.professions ?? []);

    });
  }, [api]);

  const formik = useFormik({
    initialValues: {
      description: artist?.bio ?? '',
      phoneNumber: artist?.phoneNumber ?? '',
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
      phoneNumber: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required(),
    }),
    onSubmit: (values) => {
      console.log('Saved', values);
      if (!artist) { return; }
      artist.bio = values.description;
      artist.professions = selected;
      artist.phoneNumber = parseInt(values.phoneNumber.toString());
      console.log(artist)
      api.updateArtist(artist).then((response) => {
        if (!response.success) {
          console.error(response);
          return;
        }
        setArtist(response.data)
        setAlertMessage('Changes saved successfully!');
        setAlertOpen(true);
      })
    },
  });

  const handleRemove = (profession: string) => {
    setSelected((prev) => prev.filter((p) => p !== profession));
  };

  const handleAddClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (profession: string) => {
    if (!selected.includes(profession)) {
      setSelected((prev) => [...prev, profession]);
    }
    setAnchorEl(null);
  };

  useEffect(() => {
    if (artist) {
      formik.setValues({
        description: artist.bio ?? '',
        phoneNumber: artist.phoneNumber ?? '',
      });
    }
  }, [artist]);

  const handleAddPortfolioItem = () => {
    navigate('/add-portfolio-item');
  };

  const handleAddStoreItem = () => {
    navigate('/add-store-item', {state: {id: artist?.id ?? -1}});
  };

  const remainingOptions = ALL_PROFESSIONS.filter((p) => !selected.includes(p));

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 5,
        }}
      >
        <ArtistTopBar />

        <Box
          sx={{
            flex: 1,
            p: 4,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              width: { xs: '100%', md: '35%' },
              minWidth: '300px',
              order: 1,
            }}
          >
            <Box component="form" onSubmit={formik.handleSubmit}>
              <Typography variant="h3" fontWeight="bold">
                {artist?.name + ' ' + artist?.surname}
              </Typography>
              <TextField
                fullWidth
                multiline
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                sx={{ mt: 2, borderRadius: '12px' }}
                InputProps={{
                  style: {
                    border: '1px solid black',
                    borderRadius: '12px',
                    padding: '10px',
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{ mt: 2, bgcolor: '#25dac5', borderRadius: '20px' }}
                type="submit"
              >
                Save
              </Button>
            </Box>
            <Box
              sx={{
                border: '1px solid #ddd',
                borderRadius: '12px',
                p: 3,
                height: 'fit-content',
                boxShadow: 1,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Profession
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {selected.map((profession) => (
                  <Chip
                    key={profession}
                    label={profession}
                    onDelete={() => handleRemove(profession)}
                    deleteIcon={<RemoveIcon />}
                    sx={{ bgcolor: '#25dac5', color: 'white' }}
                  />
                ))}
                <Chip
                  label="Add +"
                  icon={<AddIcon />}
                  variant="outlined"
                  onClick={handleAddClick}
                />
              </Box>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                {remainingOptions.map((profession) => (
                  <MenuItem
                    key={profession}
                    onClick={() => handleMenuItemClick(profession)}
                  >
                    {profession}
                  </MenuItem>
                ))}
              </Menu>

              <Typography variant="h6" mt={3} fontWeight="bold">
                Contact info
              </Typography>

              <Typography fontSize={24} textAlign="start" align={'center'} justifyContent={'center'}>
                <EmailIcon sx={{mr: 1}} fontSize={'inherit'}/>
                {artist?.email}
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, bgcolor: '#25dac5', borderRadius: '20px' }}
                onClick={() => formik.handleSubmit()}
              >
                Save
              </Button>
            </Box>
          </Box>

          <Box
            sx={{
              width: { xs: '100%', md: '60%' },
              minWidth: '300px',
              order: 2,
            }}
          >
            <Typography variant="h4" mt={4} fontWeight="bold">
              My portfolio
            </Typography>
            <Grid container spacing={2} mt={1}>
              {(artist?.portfolioItems ?? []).map((item) => (
                <Grid item xs={6} md={6} key={item.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={item.photoUrl}
                      height="140"
                    />
                    <CardContent>
                      <Typography variant="body2">
                        {item?.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={6} md={6}>
                <Box
                  onClick={handleAddPortfolioItem}
                  sx={{
                    height: 200,
                    border: '2px dashed #aaa',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2rem',
                    cursor: 'pointer',
                  }}
                >
                  +
                </Box>
              </Grid>
            </Grid>

            <Typography variant="h4" mt={4} fontWeight="bold">
              Store
            </Typography>
            <Grid container spacing={2} mt={1}>
              {(artist?.storeItems ?? []).filter(it => !it.itemOrderId ).map((item) => (
                <Grid item xs={6} md={6} key={item.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={(item?.itemPictureIds ?? []).length === 0 ? '' : item?.itemPictureIds[0]?.photoUrl ?? ''}
                      height="140"
                    />
                    <CardContent>
                      <Typography variant="body2">
                        {item?.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={6} md={6}>
                <Box
                  onClick={handleAddStoreItem}
                  sx={{
                    height: 200,
                    border: '2px dashed #aaa',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2rem',
                    cursor: 'pointer',
                  }}
                >
                  +
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Footer />

        <Snackbar
          open={alertOpen}
          autoHideDuration={4000}
          onClose={() => setAlertOpen(false)}
        >
          <Alert
            severity="success"
            onClose={() => setAlertOpen(false)}
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
