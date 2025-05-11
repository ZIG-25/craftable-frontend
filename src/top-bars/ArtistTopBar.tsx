import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import './ArtistTopBar.css';
import {
  AppBar,
  Box,
  Container,
  IconButton,
  SxProps,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export function ArtistTopBar() {
  const navigate = useNavigate();
  const [inboxEmpty, setInboxEmpty] = useState(true); // messages inbox

  const toggleInboxIcon = () => {
    // toggle state for now, later needed to check if there any messages available
    setInboxEmpty(!inboxEmpty);
  };

  const actions: {
    icon: React.ReactElement;
    action: () => void;
    sx?: SxProps<Theme>;
  }[] = [
    {
      icon: (
        <MailOutlineIcon
          sx={{ fontSize: '2rem', color: inboxEmpty ? '' : '#25DAC5' }}
        />
      ),
      action: toggleInboxIcon, // later: navigate to '/messages'
    },
    {
      icon: <AccountCircleIcon sx={{ fontSize: '2rem' }} />,
      action: () => navigate("/profile-artist"),
    },
  ];

  return (
    <>
      <AppBar sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar className="artist-tool-bar">
            <Typography variant="h1" component="div" className="title">
              Craftable
            </Typography>
            <Box className="artist-toolbar-icons">
              {actions.map(({ icon, action }, index) => (
                <IconButton key={index} onClick={action}>
                  {icon}
                </IconButton>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar/>
    </>
  );
}
