import { Box, Grid, TextField } from "@mui/material";
import { Header } from "../header/header";
import { ButtonsComponent } from "../buttons/buttons";
import { Person } from '../../models/interfaces';
import { useEffect, useState } from "react";
import { errorAlert, succesfulAlert } from "../../utils/alerts";

export function FormComponet({user, editMode}: {user: Person | undefined, editMode: boolean}){
    // const [showForm, setShowForm] = useState(true);
    // const undUser = () => setShowForm(false);

    const [primerNombre, setPrimerNombre] = useState('');
    const [primerApellido, setPrimerApellido] = useState('');
    const [segundoNombre, setSegundoNombre] = useState('');
    const [segundoApellido, setSegundoApellido] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [paisNacimiento, setPaisNacimiento] = useState('');
    const [genero, setGenero] = useState('');
    const [estadoCivil, setEstadoCivil] = useState('');

    const handleOpenAlert = () => {
        succesfulAlert();
    };

    const handleOpenErrorAlert = () => {
        errorAlert();
    };

    const handleSave = () => {
        const nuevaPersona: Person = {
            primer_nombre: primerNombre,
            segundo_nombre: segundoNombre,
            primer_apellido: primerApellido,
            segundo_apellido: segundoApellido,
            tipo_documento: tipoDocumento,
            numero_documento: numeroDocumento,
            fecha_nacimiento: new Date(fechaNacimiento).toISOString().split('T')[0],
            pais_nacimiento: paisNacimiento,
            genero: genero,
            estado_civil: estadoCivil,
        };

        const url = (editMode && user?.id) ? `http://127.0.0.1:8000/api/personas/${user?.id}/` : 'http://127.0.0.1:8000/api/personas/';
        const method = (editMode && user?.id) ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(nuevaPersona),
        })
        .then((response) => response.json())
        .then(() => {
            handleOpenAlert();
        })
        .catch((error) => {
            console.error('Error al agregar la persona:', error);
            handleOpenErrorAlert();
        });
    };

    const clean = () => {
        setPrimerNombre('');
        setSegundoNombre('');
        setPrimerApellido('');
        setSegundoApellido('');
        setTipoDocumento('');
        setNumeroDocumento('');
        setFechaNacimiento('');
        setPaisNacimiento('');
        setGenero('');
        setEstadoCivil('');
    }

    useEffect(() => {
        if (user) {
            setPrimerNombre(user.primer_nombre || '');
            setSegundoNombre(user.segundo_nombre || '');
            setPrimerApellido(user.primer_apellido || '');
            setSegundoApellido(user.segundo_apellido || '');
            setTipoDocumento(user.tipo_documento || '');
            setNumeroDocumento(user.numero_documento || '');
            setFechaNacimiento(user.fecha_nacimiento ? new Date(user.fecha_nacimiento).toISOString().split('T')[0] : '');
            setPaisNacimiento(user.pais_nacimiento || '');
            setGenero(user.genero || '');
            setEstadoCivil(user.estado_civil || '');
        } else {
            clean();
        }
    }, [user]);



    if(!user) return null;
    return (
        <>
        <Header text="Información" />
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 4, px: 1 }}>
        <Grid container rowSpacing={5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth  label="Primer nombre" sx={{height: '50%'}} value={primerNombre}
                disabled={!editMode} onChange={(e) => setPrimerNombre(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Segundo nombre" value={segundoNombre}
                disabled={!editMode} onChange={(e) => setSegundoNombre(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Primer apellido" value={primerApellido}
                disabled={!editMode} onChange={(e) => setPrimerApellido(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Segundo apellido" value={segundoApellido}
                disabled={!editMode} onChange={(e) => setSegundoApellido(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Tipo de documento" value={tipoDocumento}
                disabled={!editMode} onChange={(e) => setTipoDocumento(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Documento" value={numeroDocumento}
                disabled={!editMode} onChange={(e) => setNumeroDocumento(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Fecha de nacimiento" type="date"
                InputLabelProps={{ shrink: true }} value={fechaNacimiento}
                disabled={!editMode} onChange={(e) => setFechaNacimiento(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="País de nacimiento" value={paisNacimiento}
                disabled={!editMode} onChange={(e) => setPaisNacimiento(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Género" value={genero}
                disabled={!editMode} onChange={(e) => setGenero(e.target.value)}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Estado Civil" value={estadoCivil}
                disabled={!editMode} onChange={(e) => setEstadoCivil(e.target.value)}/>
            </Grid>
        </Grid>
        {editMode && <ButtonsComponent viewSave onCancel={() => ""} onSave={handleSave} onClean={clean}/>}

    </Box>
        </>
    )
}