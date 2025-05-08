import './CustomerDashboard.css';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { Footer } from '../footers/Footer';
import { Box, Typography } from '@mui/material';
import ImageCarousel from '../components/images/ImageCarousel';
import { ImageButtonData } from '../models/ImageButtonData';
import { OfferImageComponent } from '../components/ItemComponent';
import React from 'react';

// Sample image URLs (replace with your own)
const images: ImageButtonData[] = [
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
    id: 0
  },
  {
    artistUsername: 'Second',
    id: 0
  },
  {
    artistUsername: 'First',
    id: 0
  },
  {
    artistUsername: 'Second',
    id: 0
  },
  {
    artistUsername: 'First',
    id: 0
  },
  {
    artistUsername: 'Second',
    id: 0
  },
  {
    artistUsername: 'First',
    id: 0
  },
  {
    artistUsername: 'Second',
    id: 0
  },
]

function CustomerDashboard() {
  return (
    <>
      <CustomerTopBar />
      <Box sx={{ minHeight: '100vh' }} className="customer-dashboard">
        <Typography variant="h3" component="div" className="section-header">
          Popular creations
        </Typography>
        <ImageCarousel
          images={images.map((e) =>
            OfferImageComponent({
              imageSrc: e.imgSrc,
              artistUsername: 'Test art',
              title: e.imgAlt,
              price: '98.289',
              onClick: e.onClick,
            }),
          )}
        />

        <Typography variant="h3" component="div" className="section-header">
          Latest creations
        </Typography>
        <ImageCarousel
          images={images.map((e) =>
            OfferImageComponent({
              imageSrc: e.imgSrc,
              artistUsername: 'Test art',
              title: e.imgAlt,
              price: '98.289',
              onClick: e.onClick,
            }),
          )}
        />

        <Typography variant="h3" component="div" className="section-header">
          Popular artists
        </Typography>
        <ImageCarousel
          images={artists.map((a) => (
            <Box className="offer-container">
              <Box
                component="img"
                src={'https://images.pexels.com/photos/14653174/pexels-photo-14653174.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
                alt={a.artistUsername}
                onClick={() => console.log(a.artistUsername)}
                sx={{
                  width: 300,
                  height: 200,
                  border: '1px solid gray',
                  borderRadius: '14px',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <Typography component="div" variant="h6" sx={{ fontWeight: 900 }}>
                {a.artistUsername}
              </Typography>
            </Box>
          ))}
        />
      </Box>

      <Footer />
    </>
  );
}

export default CustomerDashboard;
