import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './ArtistTopBar.css';
import PaletteIcon from '@mui/icons-material/Palette';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import MenuIcon from '@mui/icons-material/Menu';

export function ArtistTopBar() {
  const navigate = useNavigate();
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [inboxEmpty, setInboxEmpty] = useState(true); // TODO: Update when there are messages

  const toggleDrawer = () => setDrawerOpened(!drawerOpened);

  const actions = [
    {
      icon: (
        <EmailIcon
          sx={{ fontSize: '2.2rem', color: inboxEmpty ? 'inherit' : '#25DAC5' }}
        />
      ),
      label: 'notifications',
      action: () => navigate('/creator-dashboard'),
    },
    {
      icon: <Person2Icon sx={{ fontSize: '2.2rem' }} />,
      label: 'profile',
      action: () => navigate('/profile-artist'),
    },
    {
      icon: <LogoutIcon sx={{ fontSize: '2.2rem' }} />,
      label: 'logout',
      action: () => {
        navigate('/');
      },
    },
  ];

  return (
    <>
      <AppBar sx={{ backgroundColor: 'white', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.21)', '&:hover': {transform: 'none'} }}>
        <Container maxWidth="xl">
          <Toolbar className="customer-tool-bar">
            <Box className="desktop-customer-tool-bar">
              <Box className="modules-left">
              <Diversity2Icon color="primary" fontSize="large" />
              </Box>
              <Box className="modules-right">
                {actions.map((action) => (
                  <IconButton key={action.label} onClick={action.action}>
                    {action.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
            <Box className="mobile-customer-tool-bar">
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ p: 0 }}
              >
                <MenuIcon sx={{ fontSize: '2.2rem' }} />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={drawerOpened}
          onClose={toggleDrawer}
          ModalProps={{ keepMounted: true }}
          className="drawer-mobile"
        >
          <Box onClick={toggleDrawer} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              Craftable
            </Typography>
            <Divider />
            <List>
              {actions.map((action) => (
                <ListItem key={action.label} disablePadding>
                  <ListItemButton
                    sx={{ textAlign: 'center' }}
                    onClick={action.action}
                  >
                    <ListItemText primary={action.label} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>

      <Toolbar />
    </>
  );
}