/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './modal.css';
import { Box, Button, IconButton, InputAdornment, Modal, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { Header } from '../header/header';
import { ButtonsComponent } from '../buttons/buttons';
import { errorAlert, succesfulAlert } from '../../utils/alerts';

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    maxHeight: '90vh',
    overflowY: 'auto',
    overflowX: 'hidden',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };


  export function ModalComponent({ openM, setOpenM, setSelectedUser }: { openM: boolean, setOpenM: (value: boolean) => void, setSelectedUser: (user: any, isEdit: boolean) => void }){
    const [page, setPage] = React.useState(1);
    const [persons, setData] = React.useState([]);
    const [documento, setDocumento] = React.useState('');

    React.useEffect(() => {
      fetch('http://127.0.0.1:8000/api/personas/')
        .then(response => response.json())
        .then(data => setData(data))
        .catch(error => console.error(error));
    }, []);

    const deletePerson = (id: string) => {
      fetch(`http://127.0.0.1:8000/api/personas/${id}/`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setData((prevPersonas) =>
              prevPersonas.filter((persona: any) => persona.id !== id)
            );
            handleOpenAlert();
          } else {
            console.error('Error al eliminar la persona');
            handleOpenErrorAlert();
          }
        })
        .catch((error) => {
          handleOpenAlert();
          console.error('Error en la solicitud:', error);
        });
    };

    const rowsPerPage = 5;

    const handleChangePage = (event: any, newPage: React.SetStateAction<number>) => {
        setPage(newPage);
    };

    const handleOpenAlert = () => {
      succesfulAlert();
    };

    const handleOpenErrorAlert = () => {
      errorAlert();
    };

    const count = Math.ceil(persons.length / rowsPerPage);

    const handleClose = () => setOpenM(false);

    const handleKeyPress = (event: any) => {
      if(event.key === 'Enter'){
        if(documento !== ''){
          buscarUsuario(documento);
        }else{
          fetch('http://127.0.0.1:8000/api/personas/')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
        }
      }
    }

    const buscarUsuario = (documento: string) => {
        fetch(`http://127.0.0.1:8000/api/personas/numero_documento/${documento}`)
            .then(response => response.json())
            .then(data => {
                setData(data);
            });
    }

    return (
        <Modal
        open={openM}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
        <Header text="Búsqueda Avanzada"/>
        <section className='table-container'>
          <Box sx={{ my: 3, ml:4 }} >
            <TextField
              sx={{ borderRadius: '4rem'}}
              variant="outlined"
              placeholder="Buscar..."
              value={documento}
              onChange={e => setDocumento(e.target.value)}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button variant="contained" className='primary-btn' sx={{ ml:4, mt: 1 }} onClick={() => {setSelectedUser({}, true); handleClose(); }}>Agregar</Button>
          </Box>
          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow sx={{backgroundColor: 'grey.500'}}>
                  <TableCell sx={{border: '1px solid #d3d3d3'}}>ID</TableCell>
                  <TableCell sx={{border: '1px solid #d3d3d3'}}>Tipo de Documento</TableCell>
                  <TableCell sx={{border: '1px solid #d3d3d3'}}>Número de Documento</TableCell>
                  <TableCell sx={{border: '1px solid #d3d3d3'}}>Primer Nombre</TableCell>
                  <TableCell sx={{border: '1px solid #d3d3d3'}}>Primer Apellido</TableCell>
                  <TableCell sx={{border: '1px solid #d3d3d3'}}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {persons
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((row: any) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id} sx={{border: '1px solid #d3d3d3'}} onClick={() => {setSelectedUser(row, false); handleClose(); }}>
                    <TableCell sx={{border: '1px solid #d3d3d3'}}>{row.id}</TableCell>
                    <TableCell sx={{border: '1px solid #d3d3d3'}}>{row.tipo_documento}</TableCell>
                    <TableCell sx={{border: '1px solid #d3d3d3'}}>{row.numero_documento}</TableCell>
                    <TableCell sx={{border: '1px solid #d3d3d3'}}>{row.primer_nombre}</TableCell>
                    <TableCell sx={{border: '1px solid #d3d3d3'}}>{row.primer_apellido}</TableCell>
                    <TableCell sx={{border: '1px solid #d3d3d3', textAlign: 'center'}}>
                      <IconButton aria-label="edit" onClick={(e) => {e.stopPropagation(); setSelectedUser(row, true);  handleClose();}}>
                        <EditIcon />
                      </IconButton>
                      <IconButton aria-label="delete" onClick={() => deletePerson(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Pagination
            color="primary"
            count={count}
            page={page}
            onChange={handleChangePage}
            sx={{
              m: 3,
              '& .Mui-selected': {
                backgroundColor: '#020024 !important',
              },
              '& .MuiPaginationItem-root': {
                borderRadius: '10%',
                '&:hover': {
                  backgroundColor: '#020024',
                  color: '#fff',
                  opacity: '.8',
                },
              }
            }}
          />
        </section>
        <ButtonsComponent viewSave={false} onCancel={handleClose} onSave={() => ""} onClean={() => ""}/>
        </Box>
      </Modal>
    )
  }