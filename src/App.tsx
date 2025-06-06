import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { WelcomePage } from './welcome-page/WelcomePage';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material';
import LoginPage from './auth-page/LoginPage';
import RegisterPage from './auth-page/RegisterPage';
import CustomerInfoPage from './auth-page/CustomerInfoPage';
import ArtistInfoPage from './auth-page/ArtistInfoPage';
import ArtistDashboardPage from './artist-page/ArtistDashboardPage';
import ApiProvider from './api/ApiProvider';
import CustomerDashboard from './customer-pages/CustomerDashboard';
import Store from './store-pages/OffersList';
import StoreItemDetails from './store-pages/ItemStorePage';
import ArtistList from './store-pages/ArtistList';
import ArtistProfileByCustomer from './customer-pages/ArtistProfileByCustomer';
import ProfileArtistPage from './artist-page/ProfileArtistPage';
import ArtistAddPortfolioItem from './artist-page/ArtistAddPortfolioItem';
import ArtistAddStoreItem from './artist-page/ArtistAddStoreItem';
import CustomerProfile from './customer-pages/CustomerProfile';
import CustomerNewRequest from './request-pages/RequestNewCreationPage';
import CreationRequestPageCustomer from './request-pages/RequestCreationCustomer';
import CreationRequestPageArtist from './request-pages/RequestCreationArtist';
import CreationRequestsListCustomer from './request-pages/RequestCreationListCustomer';
import CreationRequestsListArtist from './request-pages/RequestCreationListArtist';
import PortfolioItemDetails from './artist-page/PortfolioItemDetails';


// let theme = createTheme({
//   palette: {
//     primary: {
//       main: '#25DAC5',
//     },
//   },
// });


// TODO: Chat suggested this theme Custom theme for modern look
let theme = createTheme({
  palette: {
    primary: { main: '#25DAC5' },
    error: { main: '#d32f2f' },
    success: { main: '#2e7d32' },
    background: { default: '#f8fafc', paper: '#ffffff' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    subtitle2: { fontWeight: 500, color: '#64748b' },
    body1: { fontWeight: 400 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '12px 24px',
          fontSize: '1rem',
          fontWeight: 500,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.21)',
          },
        },
      },
    },
  },
});
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApiProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/register-customer-info"
              element={<CustomerInfoPage />}
            />
            <Route path="/register-artist-info" element={<ArtistInfoPage />} />
            <Route
              path="/creator-dashboard"
              element={<ArtistDashboardPage />}
            />
            <Route path="/customer-dashboard" element={<CustomerDashboard />} />
            <Route path="/store" element={<Store />} />
            <Route path="/artists" element={<ArtistList />} />
            <Route path="/store-item" element={<StoreItemDetails />} />
            <Route path='/artist-profile-details' element={<ArtistProfileByCustomer />} />
            <Route path='/portfolio-item-details' element={<PortfolioItemDetails />} />
            <Route path="/profile-artist" element={<ProfileArtistPage />}/>
            <Route path="/add-store-item" element={<ArtistAddStoreItem />}/>
            <Route path="/add-portfolio-item" element={<ArtistAddPortfolioItem />}/>
            <Route path="/profile" element={<CustomerProfile />}/>
            <Route path='/request-new-creation' element={<CustomerNewRequest/>}/>
            <Route path='/creation-request-customer' element={<CreationRequestPageCustomer />}/>
            <Route path='/creation-request-artist' element={<CreationRequestPageArtist />}/>
            <Route path='/creation-request-list-customer' element={<CreationRequestsListCustomer />}/>
            <Route path='/creation-request-list-artist' element={<CreationRequestsListArtist />}/>
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default App;
