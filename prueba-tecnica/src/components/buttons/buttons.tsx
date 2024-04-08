import LayersClearIcon from '@mui/icons-material/LayersClear';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { Button } from '@mui/material';

export function ButtonsComponent({viewSave, onCancel, onSave, onClean}: {viewSave: boolean, onCancel: () => void, onSave: () => void, onClean: () => void}) {
    return (
        <section className='d-flex justify-content-end gap-4 mt-5'>
          <Button variant="outlined" className='secondary-btn' onClick={onClean} endIcon={<LayersClearIcon />} aria-label="Búsqueda avanzada">
            Limpiar
          </Button>
          <Button variant="contained" className='cancel-btn' onClick={onCancel} endIcon={<CloseIcon />} aria-label="Buscar">
            Cancelar
          </Button>
          {viewSave && (
            <Button variant="contained" className='save-btn' onClick={onSave} endIcon={<SaveIcon />} aria-label="Buscar">
              Guardar
            </Button>
          )}
        </section>
    )
}