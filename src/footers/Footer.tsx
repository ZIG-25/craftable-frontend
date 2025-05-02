import React from 'react';
import {
  Box,
  Container,
  Grid,
  Link,
  Typography,
  IconButton,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Footer.css';

export function Footer() {
  return (
    <Box
      className="footer"
    >
      <Container maxWidth="lg">
        {/* Grid is deprecated but it doesn't change the functionality */}
        <Grid
          container
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={12} md={8}>
            <Box className="footer-links">
              <Link href="#" underline="none">
                About
              </Link>
              <Link href="#" underline="none">
                Features
              </Link>
              <Link href="#" underline="none">
                Pricing
              </Link>
              <Link href="#" underline="none">
                FAQ
              </Link>
              <Link href="#" underline="none">
                Terms of Service
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} className="footer-icons">
            <IconButton href="#" className="icon-btn">
              <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton href="#" className="icon-btn">
              <InstagramIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
