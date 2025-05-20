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
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AVAILABLE_TAGS = ['furniture', 'clay', 'glass', 'wood'];

export default function ArtistAddStoreItem() {
  const [images, setImages] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tags, setTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      description: '',
      price: '',
      images: [] as string[],
      tags: [] as string[],
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
      price: Yup.number()
        .typeError('Price must be a number')
        .min(1, 'Price must be at least $1')
        .required('Price is required'),
      images: Yup.array().min(1, 'At least one image is required'),
      tags: Yup.array().min(1, 'At least one tag is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages((prev) => {
          const updated = [...prev, reader.result as string];
          formik.setFieldValue('images', updated);
          return updated;
        });
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      formik.setFieldValue('images', updated);
      return updated;
    });
  };

  const handleAddTag = (tag: string) => {
    setTags((prev) => {
      const updated = [...prev, tag];
      formik.setFieldValue('tags', updated);
      return updated;
    });
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => {
      const updated = prev.filter((t) => t !== tag);
      formik.setFieldValue('tags', updated);
      return updated;
    });
  };

  return (
    <>
      <ArtistTopBar />
      <Box
        sx={{
          p: 5,
          minHeight: '100vh',
        }}
      >
        <Typography variant="h4" fontWeight="bold" padding={'1rem'}>
          Add new item to sell
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Left Column */}
            <Box sx={{ flex: 2 }}>
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
                {images.length < 5 && (
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
                )}
              </Box>
              {formik.touched.images && formik.errors.images && (
                <Alert severity="error">{formik.errors.images}</Alert>
              )}

              <Box sx={{ borderTop: '1px solid #aaa', my: 4 }} />

              <Typography variant="h6">Provide description</Typography>
              <TextField
                multiline
                fullWidth
                minRows={4}
                variant="outlined"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                sx={{ my: 2 }}
              />
              {formik.touched.description && formik.errors.description && (
                <Alert severity="error">{formik.errors.description}</Alert>
              )}
            </Box>

            {/* Right Column */}
            <Box
              sx={{
                flex: 1,
                p: 3,
                border: '1px solid #ccc',
                borderRadius: 3,
                boxShadow: 2,
                height: 'fit-content',
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
              {formik.touched.tags && formik.errors.tags && (
                <Alert severity="error">{formik.errors.tags}</Alert>
              )}

              <Typography variant="h6">Price</Typography>
              <TextField
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              {formik.touched.price && formik.errors.price && (
                <Alert severity="error">{formik.errors.price}</Alert>
              )}

              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ borderRadius: 5 }}
              >
                Sell
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
      <Footer />
    </>
  );
}
