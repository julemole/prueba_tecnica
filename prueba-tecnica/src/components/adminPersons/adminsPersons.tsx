/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material"
import { Header } from "../header/header"
import { ModalComponent } from "../modal/modal"
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { FormComponet } from "../form/form";
import { PersonFounded } from "../../models/interfaces";
import { errorAlert, succesfulAlert } from "../../utils/alerts";

export const AdminsPersons = () => {

    const [openModal, setOpenModal] = useState(false);
    const [person, setPerson] = useState<PersonFounded | null>(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    const handleUserSelect = (user: any, isEdit: boolean) => {
        setSelectedUser(user);
        setEditMode(isEdit);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
        setPerson(null)
    };

    const searchPerson = async () => {
        try {
          const tipoDocumento = (document.getElementById('tipoDocumento') as HTMLInputElement).value;
          const numeroDocumento = (document.getElementById('numeroDocumento') as HTMLInputElement).value;

          const response = await fetch(`http://127.0.0.1:8000/api/tareas/persona/${tipoDocumento}/${numeroDocumento}`);

          if (!response.ok) {
            throw new Error('Error en la solicitud');
          }
          const data = await response.json();
          (data.length === 0) ?  errorAlert() : succesfulAlert();
          setPerson(data);
        } catch (error) {
          console.error('Error al buscar la persona:', error);
        }
    };
    return (
        <section className="main-container">
        <h3>Administrador de personas</h3>
        <Header text="Información"/>
        <article className='d-flex flex-column flex-md-row align-items-md-end gap-2 gap-lg-4 mt-3 mb-4 px-2'>
            <div className="col col-lg-2">
            <label htmlFor="tipoDocumento">Tipo de documento *</label>
            <input type="text" className='form-control' id="tipoDocumento" aria-label="Tipo de documento" />
            </div>
            <div className="col col-lg-2">
            <label htmlFor="numeroDocumento">Número de documento *</label>
            <input type="number" className='form-control' id="numeroDocumento" aria-label="Número de documento" />
            </div>
            <div>
            <Button variant="contained" className='w-100 primary-btn' onClick={searchPerson} endIcon={<SearchIcon />} aria-label="Buscar">
                BUSCAR
            </Button>
            </div>
            <div>
            <Button variant="outlined" className='w-100 secondary-btn' onClick={handleOpenModal} endIcon={<SearchIcon />} aria-label="Búsqueda avanzada">
                BUSQUEDA AVANZADA
            </Button>
            </div>
        </article>
        {person && Array.isArray(person) && person.length > 0 && (
        <div>
            <h5>Filtrar tareas por persona (tipo y número de documento):</h5>
            {person.map((persona) => (
            <div key={persona.id} style={{border: '1px solid #000', borderRadius: '5px', padding: '10px'}}>
                <p><strong>ID:</strong> {persona.id}</p>
                <p><strong>Título:</strong> {persona.titulo}</p>
                <p><strong>Descripción:</strong> {persona.descripcion}</p>
                <p><strong>Fecha Límite:</strong> {persona.fecha_limite}</p>
                <p><strong>ID de la Persona:</strong> {persona.persona}</p>
            </div>
            ))}
        </div>
        )}
        {openModal && <ModalComponent openM={openModal} setOpenM={setOpenModal} setSelectedUser={handleUserSelect}/>}
        {selectedUser && !person && <FormComponet user={selectedUser} editMode={editMode}/>}
        </section>
    )
}