import { ArtistTopBar } from '../top-bars/ArtistTopBar';
import { Footer } from '../footers/Footer';
import { Box } from '@mui/material';
import './ArtistDashboardPage.css';
import { ItemComponent } from '../components/ItemComponent';
import logoImg from '../res/images/img_placeholder.jpg'; // placeholder

function ArtistDashboardPage() {
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
        <h1 className="artist-name">Jan Kowalski</h1>
        <Box
          sx={{
            padding: 4,
            display: 'flex',
            gap: 3,
            flexDirection: {
              xs: 'column', // stack containers on small screens
              md: 'row', // row layout from 900px and up
            },
          }}
        >
          <Box className="container">
            <h2>Pending requests</h2>
            {/* Below: placeholder items, later to be mapped */}
            <ItemComponent
              imageSrc={logoImg}
              customerUsername="user1"
              title="Vase"
              price="199$"
              state="Available"
            />
            <ItemComponent
              imageSrc={logoImg}
              customerUsername="user1"
              title="Vase"
              price="199$"
              state="Available"
            />
            <ItemComponent
              imageSrc={logoImg}
              customerUsername="user1"
              title="Vase"
              price="199$"
              state="Available"
            />
            <ItemComponent
              imageSrc={logoImg}
              customerUsername="user1"
              title="Vase"
              price="199$"
              state="Available"
            />
          </Box>
          <Box className="container">
            <h2>Orders history</h2>
            <ItemComponent
              imageSrc={logoImg}
              customerUsername="user1"
              title="Vase"
              price="199$"
              state="Available"
            />
            <ItemComponent
              imageSrc={logoImg}
              customerUsername="user1"
              title="Vase"
              price="199$"
              state="Available"
            />
            <ItemComponent
              imageSrc={logoImg}
              customerUsername="user1"
              title="Vase"
              price="199$"
              state="Available"
            />
            <ItemComponent
              imageSrc={logoImg}
              customerUsername="user1"
              title="Vase"
              price="199$"
              state="Available"
            />
            <ItemComponent
              imageSrc={logoImg}
              customerUsername="user1"
              title="Vase"
              price="199$"
              state="Available"
            />
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default ArtistDashboardPage;
