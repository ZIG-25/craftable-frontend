import {
  AppBar,
  Box,
  Container,
  Divider,
  Drawer,
  Icon,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import './CustomerTopBar.css';
import Diversity2Icon from '@mui/icons-material/Diversity2';
import SearchIcon from '@mui/icons-material/Search';
import EmailIcon from '@mui/icons-material/Email';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';

import { ChangeEvent, useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import PaletteIcon from '@mui/icons-material/Palette';

function CustomerTopBar() {
  // Nawigation Drawer
  const [drawerOpened, setDrawerOpened] = useState(false);
  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  const navigate = useNavigate();

  // User actions, such as logout, profile and so on.
  const actions = [
    {
      icon: <PaletteIcon sx={{ fontSize: '2.2rem' }} />,
      label: 'notifications',
      action: () => {
        navigate('/creation-request-list-customer');
      },
      sx: {},
    },
    {
      icon: <Person2Icon sx={{ fontSize: '2.2rem' }} />,
      label: 'profile',
      action: () => {
        navigate('/profile');
      },
      sx: {},
    },
    {
      icon: <LogoutIcon sx={{ fontSize: '2.2rem' }} />,
      label: 'logout',
      action: () => {
        navigate('/');
      },
      sx: {},
    },
  ];

  // Search for items (and artists)
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = () => {
    console.log('Search query:', searchQuery);
    navigate('/store', { state: { searchQuery: searchQuery } });
    setSearchQuery('');
  };

  return (
    <>
      <AppBar sx={{ backgroundColor: 'white', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.21)', '&:hover': {transform: 'none'} }}>
        <Container maxWidth="xl">
          <Toolbar variant="regular" className="customer-tool-bar">
            <Box className="desktop-customer-tool-bar">
              <Box className="modules-left">
                <Diversity2Icon
                  color="primary"
                  fontSize="large"
                  onClick={() => navigate('/customer-dashboard')}
                />
                <InputBase
                  placeholder="Search…"
                  className="search-field"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  endAdornment={
                    <IconButton onClick={handleSearch}>
                      <SearchIcon sx={{ fontSize: '1.2rem' }} />
                    </IconButton>
                  }
                />
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
              <InputBase
                placeholder="Search…"
                className="search-field"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                endAdornment={
                  <IconButton onClick={handleSearch}>
                    <SearchIcon sx={{ fontSize: '1.2rem' }} />
                  </IconButton>
                }
              />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={drawerOpened}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
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

export default CustomerTopBar;
