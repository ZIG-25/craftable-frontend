import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ArtistTopBar } from '../top-bars/ArtistTopBar';
import { Footer } from '../footers/Footer';

export default function ArtistAddPortfolioItem() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formik = useFormik({
    initialValues: {
      description: '',
      image: '' as string,
    },
    validationSchema: Yup.object({
      description: Yup.string().required('Description is required'),
      image: Yup.string().required('Image is required'),
    }),
    onSubmit: (values) => {
      console.log('Portfolio item saved:', values);
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const imgSrc = reader.result as string;
      setImage(imgSrc);
      formik.setFieldValue('image', imgSrc);
    };
    reader.readAsDataURL(file);
    e.target.value = ''; // reset file input
  };

  const handleRemoveImage = () => {
    setImage(null);
    formik.setFieldValue('image', '');
  };

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <ArtistTopBar />
        <Box sx={{ px: 5, pt: 3, padding: '4rem' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              borderBottom: '2px solid black',
              display: 'inline-block',
              mb: 4,
            }}
          >
            Add new item to portfolio
          </Typography>

          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                gap: 5,
                mb: 5,
              }}
            >
              {/* Upload picture */}
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Upload picture
                </Typography>

                {image ? (
                  <Box sx={{ position: 'relative', width: 300, height: 300 }}>
                    <img
                      src={image}
                      alt="Uploaded"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px',
                      }}
                    />
                    <IconButton
                      size="small"
                      onClick={handleRemoveImage}
                      sx={{
                        position: 'absolute',
                        top: -10,
                        right: -10,
                        backgroundColor: 'white',
                      }}
                    >
                      <RemoveCircleIcon fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                ) : (
                  <Box
                    onClick={() => fileInputRef.current?.click()}
                    sx={{
                      width: '100%',
                      maxWidth: 300,
                      height: 300,
                      border: '2px dashed #ccc',
                      borderRadius: '12px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontSize: '3rem',
                      color: '#333',
                      backgroundColor: '#e0e0e0',
                      cursor: 'pointer',
                    }}
                  >
                    <AddIcon fontSize="inherit" />
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageUpload}
                    />
                  </Box>
                )}
                {formik.touched.image && formik.errors.image && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {formik.errors.image}
                  </Alert>
                )}
              </Box>

              {/* Description */}
              <Box sx={{ flex: 2 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Provide description
                </Typography>
                <TextField
                  multiline
                  fullWidth
                  minRows={10}
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Describe your item here..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                    },
                  }}
                />
                {formik.touched.description && formik.errors.description && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {formik.errors.description}
                  </Alert>
                )}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  backgroundColor: '#66e0d0',
                  color: 'black',
                  fontWeight: 'bold',
                  borderRadius: '24px',
                  px: 6,
                  py: 1.5,
                  fontSize: '1rem',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#4edac3',
                  },
                }}
              >
                Save
              </Button>
            </Box>
          </form>
        </Box>
        <Footer />
      </Box>
    </>
  );
}
