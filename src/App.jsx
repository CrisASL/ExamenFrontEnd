import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import BuscarProveedor from './components/BuscarProveedor'; 
import Footer from './components/Footer';
import LicitacionesTable from './components/LicitacionesTable';
import axios from 'axios';
import { Box, CssBaseline } from '@mui/material';

function App() {
  const [licitaciones, setLicitaciones] = useState([]);

  useEffect(() => {
    const fetchLicitaciones = async () => {
      const ticket = 'TU_TICKET'; // Reemplaza con tu ticket válido
      const fecha = '30052025';
      const estado = 'revocada';

      try {
        const response = await axios.get(
          `https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=${fecha}&estado=${estado}&ticket=${ticket}`
        );
        setLicitaciones(response.data?.Listado || []);
      } catch (error) {
        console.error('Error al buscar licitaciones:', error);
      }
    };

    fetchLicitaciones();
  }, []);

  return (
    <>
      <CssBaseline />
      <Header />

      <Box
        component="main"
        sx={{
          width: '100%',
          minHeight: 'calc(100vh - 128px)', // Altura ajustada restando Header y Footer
          py: 4,
          px: { xs: 2, sm: 4, md: 6 },
          backgroundColor: '#f5f5f5',
          display: 'flex',
          flexDirection: 'column', // Cambiado a columna para apilar componentes
          alignItems: 'center', // Alinea al centro
        }}
      >
        <Box sx={{ width: '100%', maxWidth: '1200px', mb: 4 }}>
          <LicitacionesTable licitaciones={licitaciones} />
        </Box>

        <Box sx={{ width: '100%', maxWidth: '1200px' }}>
          <BuscarProveedor />
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default App;
