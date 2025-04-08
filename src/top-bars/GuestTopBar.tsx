import './GuestTopBar.css';
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  SxProps,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import { DEFAULT_CONFIG } from '../shared/constants';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function GuestTopBar() {
  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };
  const navigate = useNavigate();

  const actions: {
    text: string;
    variant: 'text' | 'contained' | 'outlined' | undefined;
    action: () => void;
    sx: SxProps<Theme> | undefined;
  }[] = [
    {
      text: 'FAQ',
      variant: 'text',
      action: () => console.log('FAQ!'),
      sx: { fontSize: '.9rem', color: DEFAULT_CONFIG.colors.grayText },
    },
    {
      text: 'Login',
      variant: 'outlined',
      action: () => navigate('/login'),
      sx: {
        fontSize: '1.1rem',
        color: DEFAULT_CONFIG.colors.black,
        borderColor: DEFAULT_CONFIG.colors.black,
        borderRadius: '3rem',
        paddingInline: '3rem',
      },
    },
    {
      text: 'Sign Up',
      variant: 'contained',
      action: () => navigate('/register'),
      sx: {
        fontSize: '1.1rem',
        color: DEFAULT_CONFIG.colors.white,
        borderRadius: '3rem',
        paddingInline: '3rem',
      },
    },
  ];

  return (
    <>
      <AppBar sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <Toolbar variant="regular" className="guest-tool-bar">
            <Typography variant="h1" component="div" className="title-desktop">
              Craftable
            </Typography>
            <Box className="guest-tool-bar-actions-desktop">
              {actions.map((action) => (
                <Button
                  variant={action.variant}
                  key={action.text}
                  onClick={action.action}
                  sx={action.sx}
                >
                  {action.text}
                </Button>
              ))}
            </Box>

            <Box className="drawer-toggle">
              <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={toggleDrawer}
                sx={{ p: 0 }}
              >
                <MenuIcon sx={{ fontSize: '2.2rem' }} />
              </IconButton>
            </Box>

            <Typography variant="h1" component="div" className="title-phone">
              Craftable
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={drawerOpened}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          className="drawer-mobile"
        >
          <Box onClick={toggleDrawer} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
              MUI
            </Typography>
            <Divider />
            <List>
              {actions.map((action) => (
                <ListItem key={action.text} disablePadding>
                  <ListItemButton
                    sx={{ textAlign: 'center' }}
                    onClick={action.action}
                  >
                    <ListItemText primary={action.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </nav>
      <Toolbar />
      <Toolbar />
    </>
  );
}
