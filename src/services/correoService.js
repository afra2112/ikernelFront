import api from "./axiosUtilizable";

export const correoService = {
    async enviarCorreo(formData) {
        return api.post("/api/public/enviar-pqrs", formData);
    },
    async obtenerCorreosRecibidos(email) {
        return api.get(`/api/usuarios/correo/recibidos/${email}`);
    },
    async obtenerCorreosEnviados(email) {
        return api.get(`/api/usuarios/correo/enviados/${email}`);
    },
    async obtenerCorreosPapelera(email) {
        return api.get(`/api/usuarios/correo/papelera/${email}`);
    },
    async borrar(idEmail) {
        return api.post(`/api/usuarios/correo/borrar/${idEmail}`);
    },
    async recuperar(idEmail) {
        return api.post(`/api/usuarios/correo/recuperar/${idEmail}`);
    },
    async enviarCorreoInterno(formData) {
        return api.post("/api/usuarios/correo/enviar", formData);
    }
} 