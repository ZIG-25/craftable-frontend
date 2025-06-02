import { ArtistTopBar } from '../top-bars/ArtistTopBar';
import { Footer } from '../footers/Footer';
import { Box, Button } from '@mui/material';
import './ArtistDashboardPage.css';
import { ItemComponent } from '../components/ItemComponent';
import logoImg from '../res/images/img_placeholder.jpg';
import { useNavigate } from 'react-router-dom'; // placeholder

function ArtistDashboardPage() {
  const navigate = useNavigate();
  const pendingRequests = [
    {
      imageSrc: logoImg,
      customerUsername: 'user1',
      title: 'Vase',
      price: '199$',
      state: 'Available',
    },
    {
      imageSrc: logoImg,
      customerUsername: 'user2',
      title: 'Painting',
      price: '299$',
      state: 'Pending',
    },
    {
      imageSrc: logoImg,
      customerUsername: 'user3',
      title: 'Sculpture',
      price: '399$',
      state: 'Reserved',
    },
    {
      imageSrc: logoImg,
      customerUsername: 'user4',
      title: 'Lamp',
      price: '149$',
      state: 'Available',
    },
  ];

  const ordersHistory = [
    {
      imageSrc: logoImg,
      customerUsername: 'user5',
      title: 'Mug',
      price: '49$',
      state: 'Sold',
    },
    {
      imageSrc: logoImg,
      customerUsername: 'user6',
      title: 'Bowl',
      price: '89$',
      state: 'Delivered',
    },
    {
      imageSrc: logoImg,
      customerUsername: 'user7',
      title: 'Plate',
      price: '59$',
      state: 'Sold',
    },
    {
      imageSrc: logoImg,
      customerUsername: 'user8',
      title: 'Poster',
      price: '39$',
      state: 'Delivered',
    },
    {
      imageSrc: logoImg,
      customerUsername: 'user9',
      title: 'Notebook',
      price: '19$',
      state: 'Sold',
    },
  ];

  return (
    <>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <ArtistTopBar />
        <h1 className="artist-name">Jan Kowalski</h1>
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
              <ItemComponent key={index} {...item} />
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
              <ItemComponent key={index} {...item} />
            ))}
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default ArtistDashboardPage;
