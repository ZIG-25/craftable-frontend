import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  Paper,
  IconButton,
} from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Artist, PortfolioItem } from '../models/Artist';
import { StoreItem } from '../models/Store';
import { Footer } from '../footers/Footer';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';

const ArtistProfileByCustomer = () => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const api = useApi();
  const location = useLocation();
  const portfolioRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const storeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(location.state);
    api.getArtist(location.state?.id ?? -1).then((response) => {
      if (!response.success) {
        return;
      }
      console.log(response.data)
      setArtist(response.data);
    });
  }, [api, location.state?.id]);

  const scroll = (
    ref: React.RefObject<HTMLDivElement>,
    direction: 'left' | 'right',
  ) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleRequestCreation = () => {
    navigate('/request-new-creation', {state: {artist: artist}});
  };

  if (!artist) {
    return (
      <Box sx={{ p: 3, bgcolor: '#f5f5f5' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <>
      <CustomerTopBar />
      <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: 3 }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3 }}>
          <Grid container spacing={3}>
            {/* Left Section - 60% */}
            <Grid item xs={12} md={7}>
              {/* Artist Name and Bio */}
              <Paper
                sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#fff' }}
                elevation={3}
              >
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: '#333' }}
                >
                  {artist.name} {artist.surname}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: '#555', lineHeight: 1.6 }}
                >
                  {artist.bio || 'No bio available.'}
                </Typography>
              </Paper>

              {/* Portfolio Items Carousel */}
              <Paper
                sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: '#fff' }}
                elevation={3}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'medium', color: '#333' }}
                >
                  Portfolio
                </Typography>
                {(artist.portfolioItems ?? []).length > 0 ? (
                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      onClick={() => {
                        // @ts-ignore
                        scroll(portfolioRef, 'left');
                      }}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                      }}
                    >
                      <ArrowBackIos />
                    </IconButton>
                    <Box
                      ref={portfolioRef}
                      sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        '&::-webkit-scrollbar': { display: 'none' },
                        gap: 2,
                        pb: 2,
                      }}
                    >
                      {(artist.portfolioItems ?? []).map(
                        (item: PortfolioItem) => (
                          <Box
                            key={item.id}
                            onClick={() => navigate('/portfolio-item-details', {state: {item: item}})}
                            sx={{
                              flex: '0 0 auto',
                              width: 300,
                              scrollSnapAlign: 'start',
                            }}
                          >
                            <Card
                              sx={{ boxShadow: 3, '&:hover': { boxShadow: 6 } }}
                            >
                              <CardMedia
                                component="img"
                                height="300"
                                image={
                                  item.photoUrl
                                }
                                alt={item.title}
                                sx={{ objectFit: 'cover' }}
                              />
                              <CardContent>
                                <Typography
                                  variant="h6"
                                  align="center"
                                  sx={{ color: '#333' }}
                                >
                                  {item.title || 'Untitled'}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Box>
                        ),
                      )}
                    </Box>
                    <IconButton
                      onClick={() => {
                        // @ts-ignore
                        scroll(portfolioRef, 'right');
                      }}
                      sx={{
                        position: 'absolute',
                        right: 0,
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                      }}
                    >
                      <ArrowForwardIos />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ color: '#777' }}>
                    No portfolio items available.
                  </Typography>
                )}
              </Paper>

              {/* Store Items Carousel */}
              <Paper
                sx={{ p: 3, borderRadius: 2, bgcolor: '#fff' }}
                elevation={3}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'medium', color: '#333' }}
                >
                  Store
                </Typography>
                {(artist.storeItems ?? []).length > 0 ? (
                  <Box sx={{ position: 'relative' }}>
                    <IconButton
                      onClick={() => {
                        // @ts-ignore
                        scroll(storeRef, 'left');
                      }}
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                      }}
                    >
                      <ArrowBackIos />
                    </IconButton>
                    <Box
                      ref={storeRef}
                      sx={{
                        display: 'flex',
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        '&::-webkit-scrollbar': { display: 'none' },
                        gap: 2,
                        pb: 2,
                      }}
                    >
                      {(artist.storeItems ?? []).filter(it => !it.itemOrderId).map((item: StoreItem) => (
                        <Box
                          key={item.id}
                          sx={{
                            flex: '0 0 auto',
                            width: 300,
                            scrollSnapAlign: 'start',
                          }}
                        >
                          <Card
                            sx={{ boxShadow: 3, '&:hover': { boxShadow: 6 } }}
                          >
                            <CardMedia
                              component="img"
                              height="300"
                              image={
                                item.itemPictureIds[0].photoUrl ||
                                'https://via.placeholder.com/300'
                              }
                              alt={item.title}
                              sx={{ objectFit: 'cover' }}
                            />
                            <CardContent>
                              <Typography
                                variant="h6"
                                align="center"
                                sx={{ color: '#333' }}
                              >
                                {item.title || 'Untitled'}
                              </Typography>
                              <Typography
                                variant="body2"
                                align="center"
                                sx={{ color: '#1976d2', fontWeight: 'bold' }}
                              >
                                ${item.price?.toFixed(2) || 'N/A'}
                              </Typography>
                            </CardContent>
                          </Card>
                        </Box>
                      ))}
                    </Box>
                    <IconButton
                      onClick={() => {
                        // @ts-ignore
                        scroll(storeRef, 'right');
                      }}
                      sx={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        backgroundColor: 'rgba(255, 255, 255, 0.6)',
                        transform: 'translateY(-50%)',
                        zIndex: 1,
                      }}
                    >
                      <ArrowForwardIos />
                    </IconButton>
                  </Box>
                ) : (
                  <Typography variant="body2" sx={{ color: '#777' }}>
                    No store items available.
                  </Typography>
                )}
              </Paper>
            </Grid>

            {/* Right Section - Artist Info Box */}
            <Grid item xs={12} md={5}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  bgcolor: '#fff',
                  height: 'fit-content',
                  position: 'sticky',
                  top: 20,
                }}
              >
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: '#333' }}
                >
                  Artist Details
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                  <strong>Email:</strong> {artist.email || 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 1, color: '#555' }}>
                  <strong>Phone:</strong> {artist.phoneNumber || 'N/A'}
                </Typography>
                <Typography variant="body1" sx={{ mb: 3, color: '#555' }}>
                  <strong>Professions:</strong>{' '}
                  {(artist.professions ?? []).length > 0
                    ? (artist.professions ?? []).join(', ')
                    : 'None listed'}
                </Typography>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handleRequestCreation}
                  sx={{
                    py: 1.5,
                    bgcolor: '#1976d2',
                    '&:hover': { bgcolor: '#1565c0' },
                    textTransform: 'none',
                    fontSize: '1rem',
                  }}
                >
                  Request Creation
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default ArtistProfileByCustomer;
