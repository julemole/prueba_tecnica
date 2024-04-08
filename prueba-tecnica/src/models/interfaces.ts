export interface Person {
    id?:               number;
    primer_nombre:    string;
    segundo_nombre:   string;
    primer_apellido:  string;
    segundo_apellido: string;
    tipo_documento:   string;
    numero_documento: string;
    correo?:           string;
    telefono?:         string;
    pais_nacimiento:  string;
    genero:           string;
    estado_civil:     string;
    fecha_nacimiento: string;
}
