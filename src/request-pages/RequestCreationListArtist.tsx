import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Grid,
  Container,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CreationRequest } from '../models/CreationRequest';
import { Footer } from '../footers/Footer';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { useNavigate } from 'react-router-dom';
import { ArtistTopBar } from '../top-bars/ArtistTopBar';


const mockRequests: CreationRequest[] = [
  {
    title: 'Portrait Painting',
    description: 'Custom oil portrait',
    price: 500,
    customer: {
      name: 'John',
      surname: 'Doe',
      login: 'John Doe',
      bio: '',
      password: '',
      email: '',
    },
    creator: {
      name: 'Jane',
      surname: 'Smith',
      login: 'Jane Smith',
      bio: '',
      password: '',
      email: '',
      professions: [],
      phoneNumber: 0,
    },
    status: 'pending',
  },
  {
    title: 'Digital Illustration',
    description: 'Fantasy character design',
    price: 300,
    customer: {
      name: 'Alice',
      surname: 'Johnson',
      login: 'Alice Johnson',
      bio: '',
      password: '',
      email: '',
    },
    creator: {
      name: 'Bob',
      surname: 'Wilson',
      login: 'Bob Wilson',
      bio: '',
      password: '',
      email: '',
      professions: [],
      phoneNumber: 0,
    },
    status: 'awaiting acceptation',
  },
  
];


const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const FilterBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.grey[100],
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
}));

const CreationRequestsListArtist: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | ''>('');
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [initialPriceRange, setInitialPriceRange] = useState<number[]>([0, 1000]);

  const navigate = useNavigate();

  useEffect(() => {
    const prices = mockRequests
      .filter((request) => request.price !== undefined)
      .map((request) => request.price!);
    const minPrice = prices.length > 0 ? Math.min(...prices) : 0;
    const maxPrice = prices.length > 0 ? Math.max(...prices) : 1000;

    setPriceRange([minPrice, maxPrice]);
    setInitialPriceRange([minPrice, maxPrice]);
  }, []);

  
  const filteredRequests = mockRequests.filter((request) => {
    const matchesSearch =
      request.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.customer?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      request.customer?.surname
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      false;

    const matchesStatus = !statusFilter || request.status === statusFilter;
    const matchesPrice =
      request.price &&
      request.price >= priceRange[0] &&
      request.price <= priceRange[1];

    return matchesSearch && matchesStatus && matchesPrice;
  });

  const handleRequestClick = (request: CreationRequest) => {
    navigate('/creation-request-artist', {state: {request: request}})
  }

  return (
    <>
      <ArtistTopBar />
      <Container maxWidth="lg" className="py-8" sx={{height: '100vh', p: 9}}>
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search by customer name or title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '12px',
                backgroundColor: 'white',
              },
            }}
          />
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <FilterBox>
              <Typography variant="h6" gutterBottom>
                Filters
              </Typography>
              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="awaiting acceptation">
                    Awaiting Acceptation
                  </MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="marked as done">Marked as Done</MenuItem>
                  <MenuItem value="cancelled">Cancelled</MenuItem>
                  <MenuItem value="done">Done</MenuItem>
                </Select>
              </FormControl>
              <Typography gutterBottom>Price Range</Typography>
              <Slider
                value={priceRange}
                onChange={(_, newValue) => setPriceRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={isNaN(initialPriceRange[0]) ? 0 : initialPriceRange[0]}
                max={isNaN(initialPriceRange[1]) ? 1000 : initialPriceRange[1]}
                sx={{ mb: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                ${priceRange[0]} - ${priceRange[1]}
              </Typography>
            </FilterBox>
          </Grid>
          {/* Request List */}
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom>
              Creation Requests
            </Typography>
            <List>
              {filteredRequests.map((request, index) => (
                <StyledCard key={index} onClick={() => handleRequestClick(request)}>
                  <CardContent>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6">
                            {request.title || 'Untitled Request'}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              Description:{' '}
                              {request.description || 'No description'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Price: ${request.price || 'N/A'}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Customer: {request.customer?.name}{' '}
                              {request.customer?.surname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Creator: {request.creator?.name}{' '}
                              {request.creator?.surname}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Status: {request.status || 'N/A'}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  </CardContent>
                </StyledCard>
              ))}
            </List>
          </Grid>

          {/* Filter Box */}

        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default CreationRequestsListArtist;
