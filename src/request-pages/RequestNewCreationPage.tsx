import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  TextField,
  Paper,
  InputAdornment,
  IconButton,
  Button,
  Box,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { Footer } from '../footers/Footer';

const RequestForm: React.FC = () => {
  const location = useLocation();
  const artistName = location.state?.artistName ?? 'Unknown artist';

  const [deadline, setDeadline] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  // Get current date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  // Handle price input to allow only numbers and a single decimal point
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setPrice(value);
    }
  };

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
            Request creation from {artistName}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              <TextField
                fullWidth
                label="Price"
                variant="outlined"
                margin="normal"
                value={price}
                onChange={handlePriceChange}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
              <TextField
                fullWidth
                label="Deadline"
                type="date"
                variant="outlined"
                margin="normal"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  min: today, // Restrict to dates after today
                }}
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={8}
                margin="normal"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: 3, px: 4 }}
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