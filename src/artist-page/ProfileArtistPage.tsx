import { Footer } from '../footers/Footer';
import { ArtistTopBar } from '../top-bars/ArtistTopBar';
import React from 'react';
import { useState, useEffect } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AddIcon from '@mui/icons-material/Add';
import img from '../res/images/img_placeholder.jpg';
import RemoveIcon from '@mui/icons-material/Remove';
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

// DONE add saving description
// DONE add adding and removing profession, contact info
// DONE fix footer
// add adding items to portfolio
// DONE add images to products
// responsivity

export default function ProfileArtistPage() {
  const ALL_PROFESSIONS = [
    'Painters & Illustrators', // const so upper case
    'Ceramic artists',
    'Fiber artists',
    'Jewelery makers',
    'Leatherworkers',
    'Soap & Candle artists',
    'Woodworkers',
    'Mixed media',
    'Doll & Miniature artists',
  ];
  const [description, setDescription] = useState('Description'); // to be fetched later
  const [emailAddress, setEmailAddress] = useState('jan.kowalski@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('+48 000 000 000');
  const [selected, setSelected] = useState<string[]>([
    'Painters & Illustrators',
    'Fiber artists',
  ]); // mock for now

  const handleSave = () => {
    console.log('Saved');
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleRemove = (profession: string) => {
    setSelected((prev) => prev.filter((p) => p !== profession));
  };

  const handleAddClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (profession: string) => {
    if (!selected.includes(profession)) {
      setSelected((prev) => [...prev, profession]);
    }
    setAnchorEl(null);
  };

  const remainingOptions = ALL_PROFESSIONS.filter((p) => !selected.includes(p));

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 5,
        }}
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
              value={description}
              //onChange={(e) => setDescription(e.target.value)}
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
              onClick={handleSave}
            >
              Save
            </Button>

            {/* portfolio */}
            <Typography variant="h4" mt={4} fontWeight="bold">
              My portfolio
            </Typography>
            <Grid container spacing={2} mt={1}>
              {[1, 2, 3].map((item) => (
                <Grid item xs={6} md={3} key={item}>
                  <Card>
                    <CardMedia component="img" image={img} height="140" />
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

            {/* store */}
            <Typography variant="h4" mt={4} fontWeight="bold">
              Store
            </Typography>
            <Grid container spacing={2} mt={1}>
              {[1, 2, 3, 4].map((item) => (
                <Grid item xs={6} md={3} key={item}>
                  <Card>
                    <CardMedia component="img" image={img} height="140" />
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
            {/* professions */}
            <Typography variant="h6" fontWeight="bold">
              Profession
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {selected.map((profession) => (
                <Chip
                  key={profession}
                  label={profession}
                  onDelete={() => handleRemove(profession)}
                  deleteIcon={<RemoveIcon />}
                  sx={{ bgcolor: '#25dac5', color: 'white' }}
                />
              ))}
              <Chip
                label="Add +"
                icon={<AddIcon />}
                variant="outlined"
                onClick={handleAddClick}
              />
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {remainingOptions.map((profession) => (
                <MenuItem
                  key={profession}
                  onClick={() => handleMenuItemClick(profession)}
                >
                  {profession}
                </MenuItem>
              ))}
            </Menu>

            {/* contact */}
            <Typography variant="h6" mt={3} fontWeight="bold">
              Contact info
            </Typography>
            <TextField
              fullWidth
              margin="normal"
              value={emailAddress}
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
              value={phoneNumber}
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
              onClick={handleSave}
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
