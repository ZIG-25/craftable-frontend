import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { ArtistTopBar } from '../top-bars/ArtistTopBar';
import { Footer } from '../footers/Footer';

export default function ArtistAddPortfolioItem() {
  const handleSavePortfolioItem = () => {
    console.log('Portfolio item saved');
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ArtistTopBar />
        <Box sx={{ px: 5, pt: 3, padding: '4rem' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              borderBottom: '2px solid black',
              display: 'inline-block',
              mb: 4,
            }}
          >
            Add new item to portfolio
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              gap: 5,
              mb: 5,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Upload picture
              </Typography>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 300,
                  height: 300,
                  border: '2px dashed #ccc',
                  borderRadius: '12px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '3rem',
                  color: '#333',
                  backgroundColor: '#e0e0e0',
                  cursor: 'pointer',
                }}
              >
                +
              </Box>
            </Box>

            <Box sx={{ flex: 2 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Provide description
              </Typography>
              <TextField
                multiline
                fullWidth
                minRows={10}
                placeholder="Describe your item here..."
                defaultValue={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor, leo faucibus volutpat egestas, tellus risus fringilla neque, ut dictum elit felis sed nisi. Cras semper augue a sem tristique pharetra finibus nec nisl.`}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                  },
                }}
              />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button
              variant="contained"
              onClick={handleSavePortfolioItem}
              sx={{
                backgroundColor: '#66e0d0',
                color: 'black',
                fontWeight: 'bold',
                borderRadius: '24px',
                px: 6,
                py: 1.5,
                fontSize: '1rem',
                textTransform: 'none',
                '&:hover': {
                  backgroundColor: '#4edac3',
                },
              }}
            >
              Save
            </Button>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
