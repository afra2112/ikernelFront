import api from "./axiosUtilizable";

export const usuarioService = {
  async obtenerDesarrolladores(){
    return api.get("/api/usuarios/desarrolladores/todos");
  },
  async obtenerDesarrolladoresHabilitados(){
    return api.get("/api/usuarios/desarrolladores");
  },
  async obtenerDesarrolladoresQueNoEstenEnProyectoActual(idProyecto){
    return api.get(`/api/usuarios/desarrolladores-disponibles/${idProyecto}`, );
  },
  async registrarDesarrollador(formData){
    return api.post("/api/usuarios/nuevo", formData, {
      headers: {"Content-Type": "multipart/form-data"}
    });
  },
  async obtenerUsuario(idUsuario){
    return api.get(`/api/usuarios/${idUsuario}`);
  },
  async habilitarDesarrollador(idDesarrollador, habilitar){
    return api.patch(`/api/usuarios/desarrolladores/habilitar/${idDesarrollador}?habilitar=${habilitar}`);
  }
}