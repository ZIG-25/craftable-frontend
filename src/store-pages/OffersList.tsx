import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import CustomerTopBar from '../top-bars/customer-top-bar/CustomerTopBar';
import { Footer } from '../footers/Footer';
import { StoreItem } from '../models/Store';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApi } from '../api/ApiProvider';
import { ALL_PROFESSIONS } from '../models/Artist';

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
        image={item.itemPictureIds[0].photoUrl}
        alt={item.title}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{item.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          Seller: {item.creatorId?.name}
        </Typography>
        <Typography variant="body1" color="primary">
          ${item.price}
        </Typography>
      </CardContent>
    </Card>
  );
};
interface FiltersProps {
  maxPrice: number; // Add maxPrice prop
  onFilterChange: (filters: {
    priceRange: number[];
    itemTypes: string[];
  }) => void;
}

const Filters: React.FC<FiltersProps> = ({ maxPrice, onFilterChange }) => {
  const [priceRange, setPriceRange] = useState<number[]>([0, maxPrice]);
  const [minPriceInput, setMinPriceInput] = useState<string>('0');
  const [maxPriceInput, setMaxPriceInput] = useState<string>(`${maxPrice}`);
  const [itemTypes, setItemTypes] = useState<string[]>([]);

  // Update price range when maxPrice changes
  useEffect(() => {
    setPriceRange([0, maxPrice]);
    setMaxPriceInput(`${maxPrice}`);
    onFilterChange({ priceRange: [0, maxPrice], itemTypes });
  }, [maxPrice, onFilterChange, itemTypes]);

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
          {ALL_PROFESSIONS.map((category) => (
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
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const api = useApi();
  const navigate = useNavigate();
  const [items, setItems] = useState<StoreItem[]>([]);
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
      (item.creatorId?.professions ?? []).some((type) =>
        filters.itemTypes.includes(type),
      );
    const matchesSearch =
      item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creatorId?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creatorId?.surname
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());
    return inPriceRange && matchesType && matchesSearch;
  });

  useEffect(() => {
    api.getAllOffers().then((response) => {
      if (!response.success) {
        console.error(response);
        return;
      }
      const items = response.data.filter(it => !it.itemOrderId );
      setItems(items);
      const newMaxPrice = Math.max(...items.map((it) => it.price ?? 0), 300); // Ensure maxPrice is at least 300
      setMaxPrice(newMaxPrice);
    });
  }, [api]);

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
              <Filters maxPrice={maxPrice} onFilterChange={setFilters} />
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