import React from 'react';
import { Box, Button, Paper, Typography, styled } from '@mui/material';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { Footer } from '../footers/Footer';
import { useLocation } from 'react-router-dom';
import { CreationRequest } from '../models/CreationRequest';


const DetailRow = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: '6px',
  backgroundColor: theme.palette.background.paper,
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: '#f1f5f9',
  },
}));

const RequestCreationCustomer: React.FC = () => {
  const location = useLocation();

  const data: CreationRequest | null = location.state?.request?? null;
  const title = data?.title ?? 'Unknown';
  const description = data?.description ?? 'Unknown';
  const artistName = data?.creatorId?.login ?? 'Unknown';
  const customerName = data?.customerId?.login ?? 'Unknown';
  const price = data?.price ?? 0;
  const status = data?.status ?? 'unknown';

  const handleButtonClick = () => {
    if (status === 'awaiting acceptation') {
      console.log('Cancel action triggered');
    } else if (status === 'pending') {
      console.log('Accept action triggered');
    }
  };

  const renderButton = () => {
    switch (status) {
      case 'awaiting acceptation':
        return (
          <Button
            variant="contained"
            color="error"
            fullWidth
            onClick={handleButtonClick}
            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
          >
            Cancel
          </Button>
        );
      case 'marked as done':
        return (
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handleButtonClick}
            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
          >
            Accept
          </Button>
        );
      default:
        return (
          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled
            sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}
          >
            Cancel
          </Button>
        );
    }
  };

  return (
    <>
      <CustomerTopBar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          minHeight: 'calc(100vh - 64px)',
          p: { xs: 2, sm: 3, md: 4 },
          gap: { xs: 3, md: 4 },
          maxWidth: { xs: '100%', md: 'max(65%, 1200px)' },
          mx: 'auto',
        }}
      >
        <Box sx={{ flex: 1, maxWidth: { md: '50%' } }}>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              lineHeight: 1.3,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              fontSize: { xs: '0.95rem', sm: '1rem' },
              lineHeight: 1.6,
              maxWidth: '600px',
            }}
          >
            {description}
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: { xs: 'center', md: 'flex-end' },
            alignItems: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Paper
            elevation={3}
            sx={{
              p: { xs: 2, sm: 3 },
              width: '100%',
              maxWidth: { xs: '100%', sm: 400 },
              borderRadius: '12px',
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: '1.2rem', sm: '1.25rem' } }}
            >
              Commission Details
            </Typography>
            <DetailRow>
              <Typography variant="subtitle2">Artist Name</Typography>
              <Typography variant="body1">{artistName}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography variant="subtitle2">Customer Name</Typography>
              <Typography variant="body1">{customerName}</Typography>
            </DetailRow>
            <DetailRow>
              <Typography variant="subtitle2">Price</Typography>
              <Typography variant="body1">${price.toFixed(2)}</Typography>
            </DetailRow>
            <DetailRow sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Status</Typography>
              <Typography variant="body1">{status.toUpperCase()}</Typography>
            </DetailRow>
            {renderButton()}
          </Paper>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default RequestCreationCustomer;