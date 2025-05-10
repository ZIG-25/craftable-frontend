import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { Footer } from '../footers/Footer';
import { Box, Typography, Button, Paper } from '@mui/material';
import ImageCarousel from '../components/images/ImageCarousel';
import { OfferImageComponent } from '../components/ItemComponent';
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Sample image URLs (replace with your own)
const images = [
  {
    imgSrc:
      'https://www.cbdzoe.pl/img/artykuly/rzeczy-ktore-wie-twoj-pies-artykuly-cbdzoe-01.jpg',
    imgAlt: 'Alt text 1',
    onClick: () => console.log('Clicked: 1'),
  },
  {
    imgSrc:
      'https://www.cbdzoe.pl/img/artykuly/rzeczy-ktore-wie-twoj-pies-artykuly-cbdzoe-01.jpg',
    imgAlt: 'Alt text 2',
    onClick: () => console.log('Clicked: 2'),
  },
  {
    imgSrc:
      'https://www.cbdzoe.pl/img/artykuly/rzeczy-ktore-wie-twoj-pies-artykuly-cbdzoe-01.jpg',
    imgAlt: 'Alt text 3',
    onClick: () => console.log('Clicked: 3'),
  },
  {
    imgSrc:
      'https://www.cbdzoe.pl/img/artykuly/rzeczy-ktore-wie-twoj-pies-artykuly-cbdzoe-01.jpg',
    imgAlt: 'Alt text 5',
    onClick: () => console.log('Clicked: 5'),
  },
  {
    imgSrc:
      'https://www.cbdzoe.pl/img/artykuly/rzeczy-ktore-wie-twoj-pies-artykuly-cbdzoe-01.jpg',
    imgAlt: 'Alt text 6',
    onClick: () => console.log('Clicked: 6'),
  },
  {
    imgSrc:
      'https://www.cbdzoe.pl/img/artykuly/rzeczy-ktore-wie-twoj-pies-artykuly-cbdzoe-01.jpg',
    imgAlt: 'Alt text 7',
    onClick: () => console.log('Clicked: 7'),
  },
  {
    imgSrc:
      'https://www.cbdzoe.pl/img/artykuly/rzeczy-ktore-wie-twoj-pies-artykuly-cbdzoe-01.jpg',
    imgAlt: 'Alt text 8',
    onClick: () => console.log('Clicked: 8'),
  },
  {
    imgSrc:
      'https://www.cbdzoe.pl/img/artykuly/rzeczy-ktore-wie-twoj-pies-artykuly-cbdzoe-01.jpg',
    imgAlt: 'Alt text 9',
    onClick: () => console.log('Clicked: 9'),
  },
  {
    imgSrc:
      'https://www.cbdzoe.pl/img/artykuly/rzeczy-ktore-wie-twoj-pies-artykuly-cbdzoe-01.jpg',
    imgAlt: 'Alt text 10',
    onClick: () => console.log('Clicked: 10'),
  },
];

const artists = [
  {
    artistUsername: 'First',
    id: 0,
  },
  {
    artistUsername: 'Second',
    id: 0,
  },
  {
    artistUsername: 'First',
    id: 0,
  },
  {
    artistUsername: 'Second',
    id: 0,
  },
  {
    artistUsername: 'First',
    id: 0,
  },
  {
    artistUsername: 'Second',
    id: 0,
  },
  {
    artistUsername: 'First',
    id: 0,
  },
  {
    artistUsername: 'Second',
    id: 0,
  },
];

function CustomerDashboard() {
  const navigate = useNavigate();
  return (
    <>
      <CustomerTopBar />
      <Box
        sx={{
          maxWidth: 'lg',
          mx: 'auto',
          px: { xs: 2, sm: 3, lg: 4 },
          py: 4,
        }}
      >
        {/* Popular Creations Section */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            p: 3,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
                fontWeight: 'bold',
                color: '#1A202C',
              }}
            >
              Popular Creations
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: 4,
                bgcolor: '#3F51B5',
                color: '#FFFFFF',
                px: 3,
                py: 1.5,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 'medium',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, background-color 0.2s',
                '&:hover': {
                  bgcolor: '#303F9F',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
              onClick={() => navigate('/store')}
            >
              Show More
            </Button>
          </Box>
          <ImageCarousel
            images={images.map((e) =>
              OfferImageComponent({
                imageSrc: e.imgSrc,
                artistUsername: 'Test art',
                title: e.imgAlt,
                price: '98.289',
                onClick: e.onClick,
              })
            )}
          />
        </Paper>

        {/* Latest Creations Section */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            p: 3,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
                fontWeight: 'bold',
                color: '#1A202C',
              }}
            >
              Latest Creations
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: 4,
                bgcolor: '#3F51B5',
                color: '#FFFFFF',
                px: 3,
                py: 1.5,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 'medium',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, background-color 0.2s',
                '&:hover': {
                  bgcolor: '#303F9F',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
              onClick={() => navigate('/store')}
            >
              Show More
            </Button>
          </Box>
          <ImageCarousel
            images={images.map((e) =>
              OfferImageComponent({
                imageSrc: e.imgSrc,
                artistUsername: 'Test art',
                title: e.imgAlt,
                price: '98.289',
                onClick: e.onClick,
              })
            )}
          />
        </Paper>

        {/* Popular Artists Section */}
        <Paper
          elevation={3}
          sx={{
            borderRadius: 4,
            p: 3,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 2,
            }}
          >
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.25rem' },
                fontWeight: 'bold',
                color: '#1A202C',
              }}
            >
              Popular Artists
            </Typography>
            <Button
              variant="contained"
              sx={{
                borderRadius: 4,
                bgcolor: '#3F51B5',
                color: '#FFFFFF',
                px: 3,
                py: 1.5,
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 'medium',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, background-color 0.2s',
                '&:hover': {
                  bgcolor: '#303F9F',
                  transform: 'scale(1.05)',
                },
                '&:active': {
                  transform: 'scale(0.95)',
                },
              }}
              onClick={() => console.log('Show more popular artists')}
            >
              Show More
            </Button>
          </Box>
          <ImageCarousel
            images={artists.map((a) => (
              <Box
                key={a.artistUsername + a.id}
                className="offer-container"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                <Box
                  component="img"
                  src={
                    'https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
                  }
                  alt={a.artistUsername}
                  onClick={() => console.log(a.artistUsername)}
                  sx={{
                    width: 300,
                    height: 200,
                    borderRadius: 4,
                    objectFit: 'cover',
                    flexShrink: 0,
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                />
                <Typography
                  component="div"
                  variant="h6"
                  sx={{
                    mt: 2,
                    fontSize: '1.125rem',
                    fontWeight: 'medium',
                    color: '#1A202C',
                  }}
                >
                  {a.artistUsername}
                </Typography>
              </Box>
            ))}
          />
        </Paper>
      </Box>
      <Footer />
    </>
  );
}

export default CustomerDashboard;