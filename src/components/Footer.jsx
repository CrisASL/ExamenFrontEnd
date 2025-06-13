import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 4,  // Aumenta el padding vertical
      backgroundColor: '#0a2342',
      color: 'white',
    }}
  >
    <Container maxWidth="md">
      <Typography variant="body2" align="center">
        © 2025 Buscador de Licitaciones. Todos los derechos reservados.
      </Typography>
    </Container>
  </Box>
);

export default Footer;

