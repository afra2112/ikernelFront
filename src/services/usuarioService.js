import api from "./axiosUtilizable";

export const usuarioService = {
  async obtenerDesarrolladores(){
    return api.get("/api/usuarios/desarrolladores");
  }
}