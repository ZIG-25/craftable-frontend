import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Paper,
  InputAdornment,
  Button,
  Box,
  FormHelperText,
} from '@mui/material';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { Footer } from '../footers/Footer';
import { Artist } from '../models/Artist';
import { useApi } from '../api/ApiProvider';

const RequestForm: React.FC = () => {
  const location = useLocation();
  const api = useApi();
  const navigate = useNavigate();

  const [artist, setArtist] = useState<Artist>(location.state?.artist);
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [deadline, setDeadline] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [touched, setTouched] = useState({
    title: false,
    price: false,
    deadline: false,
    description: false,
  });

  
  const today = new Date().toISOString().split('T')[0];

  
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

  
  const handleTouch = (field: keyof typeof touched) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  
  const isTitleEmpty = title.trim() === '';
  const isPriceEmpty = price.trim() === '';
  const isDeadlineEmpty = deadline === '';
  const isDescriptionEmpty = description.trim() === '';
  const isDeadlineInvalid = deadline !== '' && deadline < today;

  
  const showTitleError = touched.title && isTitleEmpty;
  const showPriceError = touched.price && isPriceEmpty;
  const showDeadlineError = touched.deadline && (isDeadlineEmpty || isDeadlineInvalid);
  const showDescriptionError = touched.description && isDescriptionEmpty;

  
  const isFormInvalid = isTitleEmpty || isPriceEmpty || isDeadlineEmpty || isDescriptionEmpty || isDeadlineInvalid;

  const makeRequest = () => {
    api.createRequest({
      title: title,
      description: description,
      price: +price,
      creatorId: artist,
      deadline: new Date(deadline),
      status: 'awaiting acceptation'
    }).then(response => {
      if (!response.success) {
        console.error(response);
        return;
      }

      navigate(-1)
    })
  }

  return (
    <>
      <CustomerTopBar />
      <Container maxWidth="md" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', borderRadius: 2 }}>
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ fontWeight: 'bold', mb: 4 }}
          >
            Request creation from {artist.name + ' ' + artist.surname}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                margin="normal"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={() => handleTouch('title')}
                error={showTitleError}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              {showTitleError && (
                <FormHelperText sx={{ color: 'red' }}>Title is required</FormHelperText>
              )}
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                margin="normal"
                value={price}
                onChange={handlePriceChange}
                onBlur={() => handleTouch('price')}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                error={showPriceError}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              {showPriceError && (
                <FormHelperText sx={{ color: 'red' }}>Price is required</FormHelperText>
              )}
              <TextField
                fullWidth
                label="Deadline"
                type="date"
                variant="outlined"
                margin="normal"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                onBlur={() => handleTouch('deadline')}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: today, 
                }}
                error={showDeadlineError}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              {touched.deadline && isDeadlineEmpty && (
                <FormHelperText sx={{ color: 'red' }}>Deadline is required</FormHelperText>
              )}
              {touched.deadline && isDeadlineInvalid && !isDeadlineEmpty && (
                <FormHelperText sx={{ color: 'red' }}>Deadline must be today or later</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={8}
                margin="normal"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                onBlur={() => handleTouch('description')}
                error={showDescriptionError}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              {showDescriptionError && (
                <FormHelperText sx={{ color: 'red' }}>Description is required</FormHelperText>
              )}
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 3, px: 4 }}
              onClick={makeRequest}
              disabled={isFormInvalid}
            >
              Make Request
            </Button>
          </Box>
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default RequestForm;