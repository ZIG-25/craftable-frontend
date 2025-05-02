import React, { useRef, useState, useEffect, ReactNode } from 'react';
import { Box, IconButton } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { ImageButtonData } from '../../models/ImageButtonData';

const ImageCarousel = ({ images }: { images: ReactNode[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1); // -1 for rounding errors
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      return () =>
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Width of one image
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', maxWidth: '100%', p: 2 }}>
      <IconButton
        onClick={() => scroll('left')}
        disabled={!canScrollLeft}
        sx={{ mr: 1 }}
      >
        <ArrowBackIos />
      </IconButton>

      <Box
        ref={scrollRef}
        sx={{
          display: 'flex',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
          gap: 2
        }}
      >
        {images.map((element) => (
          <Box>
            {element}
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={() => scroll('right')}
        disabled={!canScrollRight}
        sx={{ ml: 1 }}
      >
        <ArrowForwardIos />
      </IconButton>
    </Box>
  );
};

export default ImageCarousel;
