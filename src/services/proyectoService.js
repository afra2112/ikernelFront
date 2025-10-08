import api from "./axiosUtilizable";

export const proyectoService = {
  async listarProyectos(){
    return api.get("/api/proyectos/");
  }
}