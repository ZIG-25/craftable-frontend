import { ArtistTopBar } from '../top-bars/ArtistTopBar';
import { Footer } from '../footers/Footer';
import { Box, Button } from '@mui/material';
import './ArtistDashboardPage.css';
import {
  ItemComponent,
  OrderHistoryComponent,
} from '../components/ItemComponent';
import logoImg from '../res/images/img_placeholder.jpg';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { useEffect, useState } from 'react';
import { CreationRequest } from '../models/CreationRequest';
import { StoreItem } from '../models/Store';
import { Order } from '../models/Order';
import { Artist } from '../models/Artist'; // placeholder

function ArtistDashboardPage() {
  const navigate = useNavigate();
  const api = useApi();
  const [pendingRequests, setPendingRequests] = useState<CreationRequest[]>([]);
  const [ordersHistory, setOrdersHistory] = useState<Order[]>([]);
  const [artist, setArtist] = useState<Artist>();

  useEffect(() => {
    api.getAllOrders().then((response) => {
      if (!response.success) {
        console.error(response);
        return;
      }
      setOrdersHistory(response.data);
    });

    api.getArtistSigned().then((response) => {
      if (!response.success || !response.data) {
        console.error(response);
        return;
      }
      console.log(response.data);
      setArtist(response.data);
      setPendingRequests(
        response.data.requests?.filter((it) => !['done', 'cancelled', undefined].includes(it.status)) ?? [],
      );
    });
  }, [api]);

  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <ArtistTopBar />
        <h1 className="artist-name">{artist?.name + " " + artist?.surname}</h1>
        <Box
          sx={{
            padding: 4,
            display: 'flex',
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box className="container">
            <h2>Pending requests</h2>
            {pendingRequests.map((item, index) => (
              <ItemComponent key={index} request={item} onClick={() =>  navigate('/creation-request-artist', {state: {request: item}})} />
            ))}
            <Button
              variant="text"
              fullWidth={true}
              onClick={() => navigate('/creation-request-list-artist')}
            >
              See more
            </Button>
          </Box>

          <Box className="container">
            <h2>Orders history</h2>
            {ordersHistory.map((item, index) => (
              <OrderHistoryComponent key={index} order={item} />
            ))}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default ArtistDashboardPage;
