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

// Define StoreItem class (minimal, as not used in display)
class StoreItem {
  id: string | undefined;
}

// Define Artist class as provided
export class Artist {
  login: string | undefined;
  name: string | undefined;
  lastname: string | undefined;
  email: string | undefined;
  storeItems: StoreItem[] = [];
  professions: string[] = [];
}

// Mock data for artists
const mockArtists: Artist[] = [
  {
    login: 'artist1',
    name: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
    professions: ['Painter', 'Sculptor'],
    storeItems: [],
  },
  {
    login: 'artist2',
    name: 'Jane',
    lastname: 'Smith',
    email: 'jane.smith@example.com',
    professions: ['Photographer', 'Digital Artist'],
    storeItems: [],
  },
  {
    login: 'artist3',
    name: 'Alice',
    lastname: 'Johnson',
    email: 'alice.j@example.com',
    professions: ['Illustrator', 'Painter'],
    storeItems: [],
  },
  {
    login: 'artist4',
    name: 'Bob',
    lastname: 'Brown',
    email: 'bob.brown@example.com',
    professions: ['Sculptor', 'Ceramist'],
    storeItems: [],
  },
  {
    login: 'artist5',
    name: 'Emma',
    lastname: 'Davis',
    email: 'emma.davis@example.com',
    professions: ['Digital Artist', 'Animator'],
    storeItems: [],
  },
  {
    login: 'artist6',
    name: 'Michael',
    lastname: 'Wilson',
    email: 'michael.w@example.com',
    professions: ['Painter', 'Photographer'],
    storeItems: [],
  },
  {
    login: 'artist7',
    name: 'Sophia',
    lastname: 'Taylor',
    email: 'sophia.t@example.com',
    professions: ['Illustrator', 'Animator'],
    storeItems: [],
  },
  {
    login: 'artist8',
    name: 'David',
    lastname: 'Clark',
    email: 'david.clark@example.com',
    professions: ['Ceramist', 'Sculptor'],
    storeItems: [],
  },
  {
    login: 'artist9',
    name: 'Olivia',
    lastname: 'Lewis',
    email: 'olivia.lewis@example.com',
    professions: ['Photographer', 'Digital Artist'],
    storeItems: [],
  },
  {
    login: 'artist10',
    name: 'James',
    lastname: 'Walker',
    email: 'james.walker@example.com',
    professions: ['Painter', 'Illustrator'],
    storeItems: [],
  },
];

const ArtistList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfessions, setSelectedProfessions] = useState<string[]>([]);

  // Handle search input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Handle profession filter change
  const handleProfessionChange = (event: SelectChangeEvent<string[]>) => {
    setSelectedProfessions(event.target.value as string[]);
  };

  const allProfessions = Array.from(
    new Set(mockArtists.map((it) => it.professions).flat()),
  );

  // Filter artists based on search and professions
  const filteredArtists = useMemo(() => {
    return mockArtists.filter((artist) => {
      // Search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        (artist.name?.toLowerCase().includes(searchLower) ?? false) ||
        (artist.lastname?.toLowerCase().includes(searchLower) ?? false) ||
        (artist.email?.toLowerCase().includes(searchLower) ?? false) ||
        (artist.login?.toLowerCase().includes(searchLower) ?? false);

      // Profession filter
      const matchesProfessions =
        selectedProfessions.length === 0 ||
        selectedProfessions.every((prof) => artist.professions.includes(prof));

      return matchesSearch && matchesProfessions;
    });
  }, [searchTerm, selectedProfessions]);

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
                    onClick={() => console.log(artist)}
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
                        {artist.name} {artist.lastname}
                      </Typography>
                      <Typography sx={{ color: '#4B5563', mb: 1 }}>
                        Login: {artist.login ?? 'N/A'}
                      </Typography>
                      <Typography sx={{ color: '#4B5563', mb: 1 }}>
                        Email: {artist.email ?? 'N/A'}
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {artist.professions.map((profession) => (
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
