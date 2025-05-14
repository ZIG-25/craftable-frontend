import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Alert,
  TextField,
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { ArtistTopBar } from '../top-bars/ArtistTopBar';
import { Footer } from '../footers/Footer';

const AVAILABLE_TAGS = ['furniture', 'clay', 'glass', 'wood'];

export default function ArtistAddStoreItem() {
  const [images, setImages] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tags, setTags] = useState<string[]>(['furniture', 'clay']);
  const [price, setPrice] = useState<string>('199');
  const [description, setDescription] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      fileArray.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          if (typeof reader.result === 'string') {
            setImages((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSell = () => {
    console.log("Item saved to the store")
  }

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) setTags((prev) => [...prev, tag]);
    setAnchorEl(null);
  };

  return (
    <>
      <ArtistTopBar />
      <Box
        sx={{
          p: 5,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" fontWeight="bold" padding={'1rem'}>
          Add new item to sell
        </Typography>

        {/* uuploading pictures */}
        <Typography variant="h6" gutterBottom>
          Upload pictures
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {images.map((src, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              <img
                src={src}
                alt={`upload-${index}`}
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemoveImage(index)}
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  backgroundColor: 'white',
                }}
              >
                <RemoveCircleIcon fontSize="small" color="error" />
              </IconButton>
            </Box>
          ))}
          {/* can only upload 5 pics at most */}
          {images.length < 5 ? (
            <Box
              onClick={() => fileInputRef.current?.click()}
              sx={{
                width: '150px',
                height: '150px',
                border: '2px dashed #aaa',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '2rem',
                backgroundColor: '#eee',
              }}
            >
              <AddIcon />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                multiple
                onChange={handleImageUpload}
              />
            </Box>
          ) : (
            ''
          )}
        </Box>

        <Box sx={{ borderTop: '1px solid #aaa', my: 4 }} />

        {/* description */}
        <Typography variant="h6">Provide description</Typography>
        <TextField
          multiline
          fullWidth
          minRows={4}
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ my: 2 }}
        />

        {/* right col */}
        <Box
          sx={{
            // alignSelf: 'flex-end',
            p: 3,
            border: '1px solid #ccc',
            borderRadius: 3,
            boxShadow: 2,
            minWidth: '250px',
          }}
        >
          <Typography variant="h6">Tags</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                onDelete={() => handleRemoveTag(tag)}
                sx={{ backgroundColor: 'turquoise', color: 'white' }}
              />
            ))}
            <Button
              variant="outlined"
              size="small"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              Add +
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              {AVAILABLE_TAGS.filter((tag) => !tags.includes(tag)).map(
                (tag) => (
                  <MenuItem key={tag} onClick={() => handleAddTag(tag)}>
                    {tag}
                  </MenuItem>
                ),
              )}
            </Menu>
          </Box>

          {/* price */}
          <Typography variant="h6">Price</Typography>
          <TextField
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            sx={{ my: 2 }}
            InputProps={{
              endAdornment: <Typography>$</Typography>,
              sx: {
                fontSize: '2rem',
                textAlign: 'center',
                px: 2,
                borderRadius: 5,
              },
            }}
          />

          <Button variant="contained" onClick={handleSell} fullWidth sx={{ borderRadius: 5 }}>
            Sell
          </Button>
        </Box>
      </Box>
      <Footer />
    </>
  );
}
