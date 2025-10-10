import api from "./axiosUtilizable";

export const usuarioService = {
  async obtenerDesarrolladores(){
    return api.get("/api/usuarios/desarrolladores");
  },
  async registrarDesarrollador(formData){
    return api.post("/api/usuarios/nuevo", formData, {
      headers: {"Content-Type": "multipart/form-data"}
    });
  },
  async obtenerUsuario(idUsuario){
    return api.get(`/api/usuarios/${idUsuario}`);
  }
}