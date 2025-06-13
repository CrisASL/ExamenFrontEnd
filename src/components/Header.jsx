import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const Header = () => (
  <Box
    component="header"
    sx={{
      py: 3,
      backgroundColor: '#0a2342', // Azul fijo
      color: 'white',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    }}
  >
    <Container maxWidth="lg">
      <Typography
        variant="h5"
        component="h1"
        align="center"
        sx={{
          fontWeight: 'bold',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        Buscador de Licitaciones
      </Typography>
    </Container>
  </Box>
);

export default Header;






