import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  SelectChangeEvent,
} from '@mui/material';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { Footer } from '../footers/Footer';
import { Artist } from '../models/Artist';
import { useLocation, useNavigate } from 'react-router-dom';

const ArtistList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);
  const location = useLocation();
  const [artists, setArtists] = useState<Artist[]>(
    location.state?.artists ?? [],
  );
  const navigate = useNavigate();

  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle profession filter change
  const handleProfessionChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedProfessions(event.target.value as string[]);
  };

  const allProfessions = Array.from(
    new Set(artists.map((it) => it.professions ?? []).flat()),
  );

  // Filter artists based on search and professions
  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        (artist.name?.toLowerCase().includes(searchLower) ?? false) ||
        (artist.surname?.toLowerCase().includes(searchLower) ?? false) ||
        (artist.email?.toLowerCase().includes(searchLower) ?? false) ||
        (artist.login?.toLowerCase().includes(searchLower) ?? false);

      // Profession filter
      const matchesProfessions =
        selectedProfessions.length === 0 ||
        selectedProfessions.every((prof) => artist.professions?.includes(prof) ?? false);

      return matchesSearch && matchesProfessions;
    });
  }, [artists, searchTerm, selectedProfessions]);

  return (
    <>
      <CustomerTopBar />
      <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5F5', p: { xs: 2, sm: 4 } }}>
        {/* Search Bar */}
        <Box sx={{ maxWidth: 'lg', mx: 'auto', mb: 4 }}>
          <TextField
            fullWidth
            label="Search by name, lastname, email, or login"
            value={searchTerm}
            onChange={handleSearchChange}
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                bgcolor: '#FFFFFF',
              },
            }}
          />
        </Box>

        {/* Two-Column Layout */}
        <Grid container spacing={4} sx={{}}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                bgcolor: '#FFFFFF',
              }}
            >
              <Typography
                variant="h6"
                sx={{ mb: 2, fontWeight: 'bold', color: '#1A202C' }}
              >
                Filter by Profession
              </Typography>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Professions</InputLabel>
                <Select
                  multiple
                  value={selectedProfessions}
                  onChange={handleProfessionChange}
                  label="Professions"
                  renderValue={(selected) => (selected as string[]).join(', ')}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                >
                  {allProfessions.map((profession) => (
                    <MenuItem key={profession} value={profession}>
                      {profession}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ maxWidth: 'lg', mx: 'auto' }}>
              {filteredArtists.length === 0 ? (
                <Typography sx={{ color: '#1A202C' }}>
                  No artists found
                </Typography>
              ) : (
                filteredArtists.map((artist) => (
                  <Card
                    key={artist.login}
                    onClick={() =>
                      navigate('/artist-profile-details', {
                        state: { id: artist.id },
                      })
                    }
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'scale(1.02)',
                      },
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 'bold', color: '#1A202C' }}
                      >
                        {artist.name} {artist.surname}
                      </Typography>
                      <Typography sx={{ color: '#4B5563', mb: 1 }}>
                        Email: {artist.email ?? 'N/A'}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {(artist?.professions ?? []).map((profession) => (
                          <Chip
                            key={profession}
                            label={profession}
                            size="small"
                            sx={{
                              bgcolor: '#E8EAF6',
                              color: '#3F51B5',
                              fontWeight: 'medium',
                            }}
                          />
                        ))}
                      </Box>
                    </CardContent>
                  </Card>
                ))
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default ArtistList;
