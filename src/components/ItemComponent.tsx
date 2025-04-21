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
