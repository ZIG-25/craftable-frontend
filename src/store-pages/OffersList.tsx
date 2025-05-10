import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Slider,
  FormControl,
  Box,
  Paper,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Chip,
  SelectChangeEvent,
} from '@mui/material';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { Footer } from '../footers/Footer';
import { StoreItem } from '../models/Store';
import { useLocation, useNavigate } from 'react-router-dom';

const items: StoreItem[] = [
  {
    id: 1,
    price: 320,
    title: 'First item',
    description: 'First description',
    images: [
      'https://picsum.photos/200/150?random=1',
      'https://picsum.photos/200/150?random=2',
    ],
    artist: {
      name: 'First name',
      lastname: 'First lastname',
      bio: '',
      portfolioItems: [],
      login: '',
      email: '',
      storeItems: [],
      phone: '',
      professions: ['Jewellery', 'Painting'],
    },
  },
  {
    id: 2,
    price: 120,
    title: 'Second item',
    description: 'Second description',
    images: [
      'https://picsum.photos/200/150?random=3',
      'https://picsum.photos/200/150?random=4',
    ],
    artist: {
      name: 'Second name',
      bio: '',
      lastname: 'Second lastname',
      login: '',
      phone: '',
      portfolioItems: [],
      email: '',
      storeItems: [],
      professions: ['Photographer', 'Ceramic'],
    },
  },
  {
    id: 4,
    price: 13,
    title: 'Thirs item',
    description: 'Thirs description',
    images: [
      'https://picsum.photos/200/150?random=5',
      'https://picsum.photos/200/150?random=2',
    ],
    artist: {
      name: 'Thirs name',
      bio: '',
      lastname: 'Thirs lastname',
      login: '',
      phone: '',
      portfolioItems: [],
      email: '',
      storeItems: [],
      professions: ['Ceramic', 'Soap'],
    },
  },
  {
    id: 5,
    price: 120938,
    title: 'Fifth item',
    description: 'Fifth description',
    images: [
      'https://picsum.photos/200/150?random=6',
      'https://picsum.photos/200/150?random=2',
    ],
    artist: {
      name: 'Fifth name',
      lastname: 'Fifth lastname',
      login: '',
      email: '',
      phone: '',
      bio: '',
      storeItems: [],
      portfolioItems: [],
      professions: ['Candle'],
    },
  },
  {
    id: 6,
    price: 4320,
    title: 'Sixth item',
    description: 'Sixth description',
    images: [
      'https://picsum.photos/200/150?random=7',
      'https://picsum.photos/200/150?random=2',
    ],
    artist: {
      portfolioItems: [],
      name: 'Sixth name',
      lastname: 'Sixth lastname',
      phone: '',
      login: '',
      bio: '',
      email: '',
      storeItems: [],
      professions: ['Soap', 'Candle'],
    },
  },
  {
    id: 7,
    price: 320,
    title: 'First item',
    description: 'First description',
    images: [
      'https://picsum.photos/200/150?random=1',
      'https://picsum.photos/200/150?random=2',
    ],
    artist: {
      name: 'First name',
      bio: '',
      lastname: 'First lastname',
      portfolioItems: [],
      phone: '',
      login: '',
      email: '',
      storeItems: [],
      professions: ['Jewellery', 'Painting'],
    },
  },
  {
    id: 8,
    price: 120,
    title: 'Second item',
    description: 'Second description',
    images: [
      'https://picsum.photos/200/150?random=3',
      'https://picsum.photos/200/150?random=15',
      'https://picsum.photos/200/150?random=14',
      'https://picsum.photos/200/150?random=10',
      'https://picsum.photos/200/150?random=7',
      'https://picsum.photos/200/150?random=6',
    ],
    artist: {
      name: 'Second name',
      lastname: 'Second lastname',
      login: '',
      phone: '',
      portfolioItems: [],
      email: '',
      bio: '',
      storeItems: [],
      professions: ['Photographer', 'Ceramic'],
    },
  },
  {
    id: 9,
    price: 13,
    title: 'Thirs item',
    description: 'Thirs description',
    images: [
      'https://picsum.photos/200/150?random=5',
      'https://picsum.photos/200/150?random=2',
    ],
    artist: {
      name: 'Thirs name',
      portfolioItems: [],
      lastname: 'Thirs lastname',
      bio: '',
      login: '',
      phone: '',
      email: '',
      storeItems: [],
      professions: ['Ceramic', 'Soap'],
    },
  },
  {
    id: 10,
    price: 120938,
    title: 'Fifth item',
    description: 'Fifth description',
    images: [
      'https://picsum.photos/200/150?random=6',
      'https://picsum.photos/200/150?random=2',
    ],
    artist: {
      name: 'Fifth name',
      lastname: 'Fifth lastname',
      bio: '',
      portfolioItems: [],

      phone: '',
      login: '',
      email: '',
      storeItems: [],
      professions: ['Candle'],
    },
  },
  {
    id: 11,
    price: 4320,
    title: 'Sixth item',
    description: 'Sixth description',
    images: [
      'https://picsum.photos/200/150?random=7',
      'https://picsum.photos/200/150?random=2',
    ],
    artist: {
      name: 'Sixth name',
      lastname: 'Sixth lastname',
      bio: '',
      phone: '',
      login: '',
      email: '',
      storeItems: [],
      portfolioItems: [],
      professions: ['Soap', 'Candle'],
    },
  },
];

const ItemCard = ({ item }: { item: StoreItem }) => {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/store-item', { state: { item: item } });
  };

  return (
    <Card sx={{ display: 'flex', mb: 2 }} onClick={onClick}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 100, objectFit: 'cover' }}
        image={item.images[0]}
        alt={item.title}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Seller: {item.artist?.name}
        </Typography>
        <Typography variant="body1" color="primary">
          ${item.price}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface FiltersProps {
  onFilterChange: (filters: {
    priceRange: number[];
    itemTypes: string[];
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ onFilterChange }) => {
  const maxPrice = Math.max(...items.map((it) => (it.price ? it.price : 0)));
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
  const [minPriceInput, setMinPriceInput] = useState<string>('0');
  const [maxPriceInput, setMaxPriceInput] = useState<string>(`${maxPrice}`);
  const [itemTypes, setItemTypes] = useState<string[]>([]);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const newRange = Array.isArray(newValue) ? newValue : [newValue, newValue];
    setPriceRange(newRange);
    setMinPriceInput(newRange[0].toString());
    setMaxPriceInput(newRange[1].toString());
    onFilterChange({ priceRange: newRange, itemTypes });
  };

  const handleMinPriceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setMinPriceInput(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= priceRange[1]) {
      const newRange = [numValue, priceRange[1]];
      setPriceRange(newRange);
      onFilterChange({ priceRange: newRange, itemTypes });
    }
  };

  const handleMaxPriceInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    setMaxPriceInput(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= priceRange[0] && numValue <= maxPrice) {
      const newRange = [priceRange[0], numValue];
      setPriceRange(newRange);
      onFilterChange({ priceRange: newRange, itemTypes });
    }
  };

  const handleTypeChange = (event: SelectChangeEvent<string[]>) => {
    const newTypes = event.target.value as string[];
    setItemTypes(newTypes);
    onFilterChange({ priceRange, itemTypes: newTypes });
  };

  let categories = Array.from(
    new Set(items.map((item) => item.artist?.professions ?? []).flat()),
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Price Range</Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <TextField
            label="Min Price"
            variant="outlined"
            value={minPriceInput}
            onChange={handleMinPriceInputChange}
            type="number"
            InputProps={{ inputProps: { min: 0, max: priceRange[1] } }}
            size="small"
            sx={{ width: '120px' }}
          />
          <TextField
            label="Max Price"
            variant="outlined"
            value={maxPriceInput}
            onChange={handleMaxPriceInputChange}
            type="number"
            InputProps={{ inputProps: { min: priceRange[0], max: maxPrice } }}
            size="small"
            sx={{ width: '120px' }}
          />
        </Box>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={0}
          max={maxPrice}
          step={10}
        />
      </Box>
      <FormControl fullWidth>
        <InputLabel id="item-type-label">Item Type</InputLabel>
        <Select
          labelId="item-type-label"
          multiple
          value={itemTypes}
          onChange={handleTypeChange}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const Store = () => {
  const maxPrice = Math.max(...items.map((it) => (it.price ? it.price : 0)));
  const location = useLocation();
  const initialSearchQuery =
    (location.state as { searchQuery?: string } | null)?.searchQuery ?? '';
  const [filters, setFilters] = useState<{
    priceRange: number[];
    itemTypes: string[];
  }>({
    priceRange: [0, maxPrice],
    itemTypes: [],
  });
  const [searchQuery, setSearchQuery] = useState<string>(initialSearchQuery);

  useEffect(() => {
    const newSearchQuery =
      (location.state as { searchQuery?: string } | null)?.searchQuery ?? '';
    setSearchQuery(newSearchQuery);
  }, [location.state]);

  const filteredItems = items.filter((item) => {
    const inPriceRange = item.price
      ? item.price >= filters.priceRange[0] &&
        item.price <= filters.priceRange[1]
      : true;
    const matchesType =
      filters.itemTypes.length === 0 ||
      item.artist?.professions.some((type) => filters.itemTypes.includes(type));
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artist?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.artist?.lastname?.toLowerCase().includes(searchQuery.toLowerCase());
    return inPriceRange && matchesType && matchesSearch;
  });

  return (
    <>
      <CustomerTopBar />
      <Container maxWidth="lg" sx={{ mt: 4, minHeight: '100vh' }}>
        <Box sx={{ mb: 3 }}>
          <TextField
            fullWidth
            label="Search Items"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter item name..."
          />
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3}>
              <Filters onFilterChange={setFilters} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" gutterBottom>
              Items for Sale
            </Typography>
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default Store;
