import React, { useEffect, useState } from 'react';
import data from '../../data.json';

import {
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Pagination,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  InputLabel,
  FormControl,
} from '@mui/material';

const ITEMS_POR_PAGINA = 10;

// Mapeo de códigos de estado a nombres
const estadoNombres = {
  5: 'Publicada',
  6: 'Cerrada',
  7: 'Desierta',
  8: 'Adjudicada',
  18: 'Revocada',
  19: 'Suspendida',
};

const LicitacionesTable = () => {
  const [licitaciones, setLicitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fechaFin, setFechaFin] = useState('');
  const [estado, setEstado] = useState('Todos');
  const [codigoBuscar, setCodigoBuscar] = useState(''); // Nuevo estado para buscar por código
  const [paginaActual, setPaginaActual] = useState(1);
  const [licitacionSeleccionada, setLicitacionSeleccionada] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        setLicitaciones(data.Listado);
      } catch (error) {
        setError('Error al cargar los datos');
      } finally {
        setLoading(false);
      }
    };
    cargarDatos();
  }, []);

  const licitacionesFiltradas = licitaciones.filter((lic) => {
    const fechaCierre = new Date(lic.FechaCierre).toLocaleDateString();
    let cumpleFecha = true;
    let cumpleEstado = true;
    let cumpleCodigo = true; // Nueva variable para el filtro de código

    // Comparación de fecha fin
    if (fechaFin) {
      const fechaFinDate = new Date(fechaFin).toLocaleDateString();
      cumpleFecha = cumpleFecha && fechaCierre === fechaFinDate; // Verifica que sean iguales
    }
    if (estado !== 'Todos') {
      cumpleEstado = cumpleEstado && lic.CodigoEstado === Number(estado);
    }
    if (codigoBuscar) {
      cumpleCodigo = cumpleCodigo && lic.CodigoExterno.includes(codigoBuscar); // Filtro por código
    }

    return cumpleFecha && cumpleEstado && cumpleCodigo; // Añade filtro de código
  });

  const totalPaginas = Math.ceil(licitacionesFiltradas.length / ITEMS_POR_PAGINA);
  const inicio = (paginaActual - 1) * ITEMS_POR_PAGINA;
  const fin = inicio + ITEMS_POR_PAGINA;
  const licitacionesPaginadas = licitacionesFiltradas.slice(inicio, fin);

  if (loading) return <Typography>Cargando...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 2 }}>
      <Typography variant="h4" mb={3} align="center">
        Filtrar Licitaciones
      </Typography>

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Código Externo"
            value={codigoBuscar}
            onChange={e => setCodigoBuscar(e.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Fecha Fin"
            type="date"
            value={fechaFin}
            onChange={e => setFechaFin(e.target.value)}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel id="estado-label">Estado</InputLabel>
            <Select
              labelId="estado-label"
              label="Estado"
              value={estado}
              onChange={e => setEstado(e.target.value)}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="5">Publicada</MenuItem>
              <MenuItem value="6">Cerrada</MenuItem>
              <MenuItem value="7">Desierta</MenuItem>
              <MenuItem value="8">Adjudicada</MenuItem>
              <MenuItem value="18">Revocada</MenuItem>
              <MenuItem value="19">Suspendida</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Código Externo</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Fecha Cierre</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {licitacionesPaginadas.map((licitacion, idx) => (
            <TableRow
              key={idx}
              hover
              onClick={() => setLicitacionSeleccionada(licitacion)}
              sx={{ cursor: 'pointer' }}
              title="Click para ver detalles"
            >
              <TableCell>{licitacion.CodigoExterno}</TableCell>
              <TableCell>{licitacion.Nombre}</TableCell>
              <TableCell>{new Date(licitacion.FechaCierre).toLocaleDateString()}</TableCell>
              <TableCell>{estadoNombres[licitacion.CodigoEstado] || 'Desconocido'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={totalPaginas}
          page={paginaActual}
          onChange={(_, value) => setPaginaActual(value)}
          color="primary"
          showFirstButton
          showLastButton
        />
      </Box>

      {/* Detalle Licitación en Dialog */}
      <Dialog
        open={Boolean(licitacionSeleccionada)}
        onClose={() => setLicitacionSeleccionada(null)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Detalle Licitación</DialogTitle>
        <DialogContent dividers>
          {licitacionSeleccionada && (
            <>
              <Typography><strong>Código Externo:</strong> {licitacionSeleccionada.CodigoExterno}</Typography>
              <Typography><strong>Nombre:</strong> {licitacionSeleccionada.Nombre}</Typography>
              <Typography><strong>Fecha Cierre:</strong> {new Date(licitacionSeleccionada.FechaCierre).toLocaleString()}</Typography>
              <Typography><strong>Estado:</strong> {estadoNombres[licitacionSeleccionada.CodigoEstado] || 'Desconocido'}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLicitacionSeleccionada(null)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LicitacionesTable;