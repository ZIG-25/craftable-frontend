import React from 'react';
import { Box, Typography } from '@mui/material';
import './ItemComponent.css';
import { Order } from '../models/Order';
import { CreationRequest } from '../models/CreationRequest';

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

interface OrderHistoryItemProps {
  imageSrc: string;
  date: string;
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

interface ArtistStoreItemProps {
  imageSrc: string;
  title: string;
  price: string;
  description: string;
}

export function ItemComponent({request}: {request: CreationRequest}) {
  return (
    <Box className="item-container">

      <Box className="item-info">
        <Typography className="item-user">From {request.customerId?.name}</Typography>
        <Typography className="item-title">{request.title}</Typography>
        <Typography className="item-price">{request.price}</Typography>
      </Box>
      <Typography className="item-state">{request.status}</Typography>
    </Box>
  );
}

export function OrderHistoryComponent({ order }: { order: Order }) {
  return (
    <Box className="item-container">
      <img
        src={order.itemForSaleId?.itemPictureIds[0]?.photoUrl}
        className="item-image"
      />
      <Box className="item-info">
        <Typography className="item-title">
          {order.itemForSaleId?.title}
        </Typography>
        <Typography className="item-user">
          Bought: {order.date?.toString()}
        </Typography>
        <Typography className="item-price">
          {order.itemForSaleId?.price}
        </Typography>
      </Box>
      <Typography className="item-state">{order.status}</Typography>
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
      <Typography component="div" variant="h6" sx={{ fontWeight: 900 }}>
        {artistUsername}
      </Typography>
      <Box className="additional-info">
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

export function ArtistStoreItemComponent({
  imageSrc,
  title,
  price,
  description,
}: ArtistStoreItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        mb: 4,
        alignItems: 'flex-start',
      }}
    >
      <Box
        component="img"
        src={imageSrc}
        alt={title}
        sx={{
          width: 150,
          height: 150,
          borderRadius: 2,
          objectFit: 'cover',
        }}
      />

      <Box sx={{ minWidth: 100 }}>
        <Typography variant="subtitle1" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2">{price}</Typography>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );
}
