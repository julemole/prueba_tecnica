import Swal from 'sweetalert2';

export const succesfulAlert = () => {
    return Swal.fire({
        title: '¡Acción exitosa!',
        imageUrl: 'src/assets/img1.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'check image',
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#020024'
    });
}

export const errorAlert = () => {
    Swal.fire({
        title: '¡Error!',
        imageUrl: 'src/assets/img2.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'check image',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#020024'
    });
}

export const infoAlert = () => {
    Swal.fire({
        title: '¡Información!',
        imageUrl: 'src/assets/img3.png',
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: 'check image',
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        cancelButtonColor: '#d33',
        confirmButtonColor: '#020024'
    });
}