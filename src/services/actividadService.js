import api from "./axiosUtilizable";

export const actividadService = {
  async crearActividad(formData){
    return api.post("/api/proyectos/actividades/", formData);
  },
  async actualizarActividad(formData){
    return api.put("/api/proyectos/actividades/actualizar", formData);
  },
  async eliminarActividad(idActividad){
    return api.delete(`/api/proyectos/actividades/eliminar/${idActividad}`);
  },
}