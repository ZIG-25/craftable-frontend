import React, { useState } from 'react';
import { Box, Button, Grid, Paper, Typography, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { PortfolioItem } from '../models/Artist';
import { Footer } from '../footers/Footer';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';

const PortfolioItemDetails: React.FC = () => {
  const location = useLocation();
  const [item, setItem] = useState<PortfolioItem | null>(
    location.state.item ?? null,
  );

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
                  src={item?.photoUrl}
                  alt="Selected item"
                  style={{
                    width: '100%',
                    height: '400px',
                    objectFit: 'contain',
                    borderRadius: '14px',
                  }}
                />
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
                {item?.title}
              </Typography>

              <Typography variant="body1" color="text.primary" paragraph>
                {item?.description}
              </Typography>

            </Paper>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>

  );
};

export default PortfolioItemDetails;