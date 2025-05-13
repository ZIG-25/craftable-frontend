import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Paper } from '@mui/material';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { Footer } from '../footers/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { StoreItem } from '../models/Store';


const StoreItemDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const initialItem = (location.state as { item?: StoreItem } | null)?.item ?? null;
  if (!initialItem) {
    navigate('/store');
  }
  const [item, setItem] = useState(initialItem);

  const [selectedImage, setSelectedImage] = useState(item?.images[0] ?? '');
  useEffect(() => {
    const item = (location.state as { item?: StoreItem } | null)?.item ?? null;
    if (!initialItem) {
      navigate('/store');
    }
    setItem(item);
    setSelectedImage(item?.images[0] ?? '');
  }, [initialItem, location.state, navigate]);

  return (
    <>
      <CustomerTopBar />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'grey.100',
          p: 4,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Grid container spacing={3} maxWidth="lg">
          {/* Left Column: Image Carousel */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: 'grey.50',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Box sx={{ mb: 2 }}>
                <img
                  src={selectedImage}
                  alt="Selected item"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'cover',
                    borderRadius: '14px',
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', overflowX: 'auto', gap: 1 }}>
                {item?.images.map((image, index) => (
                  <Box
                    key={index}
                    component="img"
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    sx={{
                      width: 100,
                      height: 100,
                      objectFit: 'cover',
                      borderRadius: 1,
                      cursor: 'pointer',
                      border:
                        selectedImage === image ? '2px solid blue' : 'none',
                    }}
                    onClick={() => setSelectedImage(image)}
                  />
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Right Column: Item Details */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: 'grey.50',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h4" fontWeight="bold" gutterBottom>
                {item?.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                Artist: {item?.artist?.name} {item?.artist?.lastname}
              </Typography>
              <Typography variant="h6" color="primary" gutterBottom>
                ${item?.price?.toFixed(2) ?? '---'}
              </Typography>
              <Typography variant="body1" color="text.primary" paragraph>
                {item?.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 2 }}
              >
                Buy
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default StoreItemDetails;
