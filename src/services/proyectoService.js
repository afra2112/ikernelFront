import api from "./axiosUtilizable";

export const proyectoService = {
  async listarProyectos(){
    return api.get("/api/proyectos/");
  },
  async registrarProyecto(formData){
    return api.post("/api/proyectos/nuevo", formData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  },
  async obtenerDetalleProyecto(idProyecto){
    return api.get(`/api/proyectos/${idProyecto}`);
  },
  async actualizarProyecto(formData){
    return api.put("/api/proyectos/editar", formData);
  },
  async inhabilitarProyecto(id){
    return api.patch(`/api/proyectos/inhabilitar/${id}`);
  },
  async asignarDesarrolladores(idProyecto, idsDesarrolladores){
    return api.patch(`/api/proyectos/asignar-desarrolladores/${idProyecto}`, idsDesarrolladores);
  },
  async removerDesarrollador(idProyecto, idDesarrollador){
    return api.patch(`/api/proyectos/remover-desarrollador/${idProyecto}`, idDesarrollador);
  },

  //peticiones de errores
  async crearError(formData){
    return api.post("/api/proyectos/errores/nuevo", formData);
  },
  async actualizarError(formData){
    return api.put("/api/proyectos/errores/actualizar", formData);
  },
  async eliminarError(idError){
    return api.delete(`/api/proyectos/errores/eliminar/${idError}`);
  },
  async resolverErrorError(idError){
    return api.patch(`/api/proyectos/errores/resolver/${idError}`);
  },

  //peticiones de interrupciones
  async crearInterrupcion(formData){
    return api.post("/api/proyectos/interrupciones/nueva", formData);
  },
  async actualizarInterrupcion(formData){
    return api.put("/api/proyectos/interrupciones/actualizar", formData);
  },
  async eliminarInterrupcion(idInterrupcion){
    return api.delete(`/api/proyectos/interrupciones/eliminar/${idInterrupcion}`);
  },
}