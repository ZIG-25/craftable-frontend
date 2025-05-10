import { Footer } from '../footers/Footer';
import { ArtistTopBar } from '../top-bars/ArtistTopBar';
import React from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AddIcon from '@mui/icons-material/Add';
import img from '../res/images/img_placeholder.jpg';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Chip,
  Grid,
  Card,
  CardMedia,
  CardContent,
  InputAdornment,
} from '@mui/material';

// add saving description
// add dodawanie profession i usuwanie tez
// add saving contact info
// DONE fix footer
// add adding items to portfolio
// DONE add images to products
// responsivity
// fix all indents

export default function ProfileArtistPage() {
  return (
    <>
      <Box
        sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: 5, }}
      >
        <ArtistTopBar />

        {/* main content */}
        <Box sx={{ flex: 1, p: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Box sx={{ flex: 2, minWidth: '300px' }}>
            <Typography variant="h3" fontWeight="bold">
              Jan Kowalski
            </Typography>
            <TextField
              fullWidth
              multiline
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla auctor..."
              sx={{ mt: 2, borderRadius: '12px' }}
              InputProps={{
                style: {
                  border: '1px solid black',
                  borderRadius: '12px',
                  padding: '10px',
                },
              }}
            />
            <Button
              variant="contained"
              sx={{ mt: 2, bgcolor: '#25dac5', borderRadius: '20px' }}
            >
              Save
            </Button>

            <Typography variant="h4" mt={4} fontWeight="bold">
              My portfolio
            </Typography>
            <Grid container spacing={2} mt={1}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={6} md={3} key={item}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={img}
                      height="140"
                    />
                    <CardContent>
                      <Typography variant="body2">
                        Description {item} Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
              <Grid item xs={6} md={3}>
                <Box
                  sx={{
                    height: 200,
                    border: '2px dashed #aaa',
                    borderRadius: '8px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '2rem',
                  }}
                >
                  +
                </Box>
              </Grid>
            </Grid>

            <Typography variant="h4" mt={4} fontWeight="bold">
              Store
            </Typography>
            <Grid container spacing={2} mt={1}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={6} md={3} key={item}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={img}
                      height="140"
                    />
                    <CardContent>
                      <Typography variant="body2">
                        Description {item} Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit.
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* sidebar */}
          <Box
            sx={{
              flex: 1,
              minWidth: '250px',
              border: '1px solid #ddd',
              borderRadius: '12px',
              p: 3,
              height: 'fit-content',
              boxShadow: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Profession
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              <Chip
                label="Painters & Illustrators"
                sx={{ bgcolor: '#25dac5', color: 'white' }}
              />
              <Chip
                label="Fiber artist"
                sx={{ bgcolor: '#25dac5', color: 'white' }}
              />
              <Chip label="Add +" icon={<AddIcon />} variant="outlined" />
            </Box>

            <Typography variant="h6" mt={3} fontWeight="bold">
              Contact info
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              defaultValue="jan.kowalski@gmail.com"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              defaultValue="+48 000 000 000"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, bgcolor: '#25dac5', borderRadius: '20px' }}
            >
              Save
            </Button>
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
