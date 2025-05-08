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
            <Route path="/creator-dashboard" element={<ArtistDashboardPage />}/>
            <Route path="/customer-dashboard" element={<CustomerDashboard />}/>
          </Routes>
        </BrowserRouter>
      </ApiProvider>
    </ThemeProvider>
  );
}

export default App;
