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
import ArtistProfile from './artist-page/ArtistProfile';

let theme = createTheme({
  palette: {
    primary: {
      main: '#25DAC5',
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
            <Route path='/artist-profile' element={<ArtistProfile />} />
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default App;
