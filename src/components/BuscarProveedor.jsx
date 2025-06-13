import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Proveedores } from '../../proveedores.json'; // Asegúrate de que la ruta sea correcta

const BuscarProveedor = () => {
  const [rut, setRut] = useState('');
  const [resultados, setResultados] = useState([]);

  const buscarProveedor = () => {
    const rutNormalizado = rut.replace(/[-\s]/g, ''); // Normaliza el RUT ingresado
    const resultadosFiltrados = Proveedores.filter(proveedor => 
      proveedor.Rut.replace(/[-\s]/g, '') === rutNormalizado // Normaliza el RUT del proveedor
    );
    setResultados(resultadosFiltrados);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <Typography variant="h4" align="center" mb={3}>
        Buscar Proveedor por RUT
      </Typography>
      <TextField
        label="RUT"
        value={rut}
        onChange={(e) => setRut(e.target.value)}
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={buscarProveedor} fullWidth>
        Buscar
      </Button>

      {resultados.length > 0 && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>RUT</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Giro</TableCell>
              <TableCell>Dirección</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {resultados.map((proveedor, idx) => (
              <TableRow key={idx}>
                <TableCell>{proveedor.Rut}</TableCell>
                <TableCell>{proveedor.Nombre}</TableCell>
                <TableCell>{proveedor.Giro}</TableCell>
                <TableCell>{proveedor.Direccion}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  );
};

export default BuscarProveedor;