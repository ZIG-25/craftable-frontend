import React from 'react';
import { useState, useEffect } from 'react';
import { ArtistTopBar } from '../top-bars/ArtistTopBar';
import { Footer } from '../footers/Footer';
import { ArtistStoreItemComponent } from '../components/ItemComponent';
import logoImg from '../res/images/img_placeholder.jpg'; // placeholder
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
} from '@mui/material';

export default function ArtistStore() {
  const items = [
    {
      imageSrc: logoImg,
      title: 'Vase',
      price: '199$',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor, leo faucibus volutpat egestas,',
    },
    {
      imageSrc: logoImg,
      title: 'Vase',
      price: '199$',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor, leo faucibus volutpat egestas,',
    },
    {
      imageSrc: logoImg,
      title: 'Vase',
      price: '199$',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor, leo faucibus volutpat egestas,',
    },
    {
      imageSrc: logoImg,
      title: 'Vase',
      price: '199$',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor, leo faucibus volutpat egestas,',
    },
    {
      imageSrc: logoImg,
      title: 'Vase',
      price: '199$',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor, leo faucibus volutpat egestas,',
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <ArtistTopBar />
        <Typography
          variant="h3"
          fontWeight="bold"
          padding={'3.5rem'}
          paddingBottom={'0rem'}
        >
          Jan Kowalski
        </Typography>
        <Box padding={'2rem'}>
          <Box
            sx={{
              border: '1px #bbb9b9 solid',
              borderRadius: '10px',
              padding: '0 2rem',
              paddingBottom: '1.5rem',
              height: 'fit-content',
            }}
          >
            <Typography
              variant="h4"
              padding={'.5rem'}
              mb={2}
              sx={{ borderBottom: '#bbb9b9 1px solid;' }}
            >
              Items in store
            </Typography>
            <Box padding={'2rem'}>
              {items.map((item, index) => (
                <ArtistStoreItemComponent
                  key={index}
                  imageSrc={item.imageSrc}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
