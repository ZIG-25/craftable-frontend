import React from 'react';
import { Box, Typography } from '@mui/material';
import './ItemComponent.css';

/*
This component can be used in other pages, such as 'Client request' in Figma. 
Though not in all, since item components in e.g. 'Items in store artist' use description etc.
Name of this component is to be changed later accordingly.   
*/
interface ItemProps {
  imageSrc: string;
  customerUsername: string;
  title: string;
  price: string;
  state: string;
}

interface OfferProps {
  imageSrc: string;
  artistUsername: string;
  title: string;
  price: string;
  onClick: () => void;
}

export function ItemComponent({
  imageSrc,
  customerUsername,
  title,
  price,
  state,
}: ItemProps) {
  return (
    <Box className="item-container">
      <img src={imageSrc} className="item-image" />
      <Box className="item-info">
        <Typography className="item-user">From {customerUsername}</Typography>
        <Typography className="item-title">{title}</Typography>
        <Typography className="item-price">{price}</Typography>
      </Box>
      <Typography className="item-state">{state}</Typography>
    </Box>
  );
}

export function OfferImageComponent({
  imageSrc,
  artistUsername,
  title,
  price,
  onClick,
}: OfferProps) {
  return (
    <Box className="offer-container">
      <Box
        component="img"
        src={imageSrc}
        alt={title}
        onClick={onClick}
        sx={{
          width: 300,
          height: 200,
          border: '1px solid gray',
          borderRadius: '14px',
          objectFit: 'cover',
          flexShrink: 0,
        }}
      />
      <Typography component="div" variant="h6" sx={{ fontWeight: 900}}>
        {artistUsername}
      </Typography>
      <Box className='additional-info'>
        <Typography component="div" variant="h6">
          {title}
        </Typography>
        <Typography component="div" variant="h6">
          {price}
        </Typography>
      </Box>
    </Box>
  );
}
