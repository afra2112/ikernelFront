<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import DetalleProyecto from './DetalleProyecto.vue'
import { proyectoService } from '@/services/proyectoService'
import { usuarioService } from '@/services/usuarioService'


const route = useRoute()
const proyecto = ref(null)
const loading = ref(true)
const desarrolladores = ref([])

const cargarProyecto = async () => {
  loading.value = true
  try {
    const { data } = await proyectoService.obtenerDetalleProyecto(route.params.idProyecto)
    proyecto.value = data
    console.log(data.desarrolladores)
    const { data: dataDesarrolladores } = await usuarioService.obtenerDesarrolladoresQueNoEstenEnProyectoActual(data.idProyecto);
    desarrolladores.value = dataDesarrolladores
  } catch (err) {
    console.error('Error cargando proyecto:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  cargarProyecto()
})

//aca agarro los emits del hijo y los mando a la api
const actualizarProyecto = async (form) => {
  try {
    await proyectoService.actualizarProyecto(form)
    await cargarProyecto()
  } catch (e) {
    console.error('Error actualizando proyecto:', e)
  }
}

const inhabilitarProyecto = async (id) => {
  try {
    await proyectoService.inhabilitarProyecto(id)
    await cargarProyecto()
  } catch (e) {
    console.error('Error inhabilitando proyecto:', e)
  }
}

const asignarDesarrolladores = async (idsDevs) => {
  try {
    await proyectoService.asignarDesarrolladores(proyecto.value.idProyecto, idsDevs)
    await cargarProyecto()
  } catch (e) {
    console.error('Error asignando desarrollador:', e)
  }
}

const removerDesarrollador = async (idDev) => {
  try {
    await proyectoService.removerDesarrollador(proyecto.value.idProyecto, idDev)
    await cargarProyecto()
  } catch (e) {
    console.error('Error removiendo desarrollador:', e)
  }
}

const crearEtapa = async (form) => {
  try {
    await proyectoService.crearEtapa(proyecto.value.idProyecto, form)
    await cargarProyecto()
  } catch (e) {
    console.error('Error creando etapa:', e)
  }
}

const actualizarEtapa = async (form) => {
  try {
    await proyectoService.actualizarEtapa(form)
    await cargarProyecto()
  } catch (e) {
    console.error('Error actualizando etapa:', e)
  }
}

const eliminarEtapa = async (idEtapa) => {
  try {
    await proyectoService.eliminarEtapa(idEtapa)
    await cargarProyecto()
  } catch (e) {
    console.error('Error eliminando etapa:', e)
  }
}

const crearActividad = async (form) => {
  try {
    await proyectoService.crearActividad(form)
    await cargarProyecto()
  } catch (e) {
    console.error('Error creando actividad:', e)
  }
}

const actualizarActividad = async (form) => {
  try {
    await proyectoService.actualizarActividad(form)
    await cargarProyecto()
  } catch (e) {
    console.error('Error actualizando actividad:', e)
  }
}

const eliminarActividad = async (idActividad) => {
  try {
    await proyectoService.eliminarActividad(idActividad)
    await cargarProyecto()
  } catch (e) {
    console.error('Error eliminando actividad:', e)
  }
}

const actualizarProgresoActividad = async (form) => {
  try {
    await proyectoService.actualizarProgresoActividad(form)
    await cargarProyecto()
  } catch (e) {
    console.error('Error actualizando progreso:', e)
  }
}

const crearError = async (form) => {
  try {
    await proyectoService.crearError(form)
    await cargarProyecto()
  } catch (e) {
    console.error('Error creando error:', e)
  }
}

const actualizarError = async (form) => {
  try {
    await proyectoService.actualizarError(form)
    await cargarProyecto()
  } catch (e) {
    console.error('Error actualizando error:', e)
  }
}

const eliminarError = async (idError) => {
  try {
    await proyectoService.eliminarError(idError)
    await cargarProyecto()
  } catch (e) {
    console.error('Error eliminando error:', e)
  }
}

const resolverError = async (idError) => {
  try {
    await proyectoService.resolverError(idError)
    await cargarProyecto()
  } catch (e) {
    console.error('Error resolviendo error:', e)
  }
}

const crearInterrupcion = async (form) => {
  try {
    await proyectoService.crearInterrupcion(form)
    await cargarProyecto()
  } catch (e) {
    console.error('Error creando interrupción:', e)
  }
}

const actualizarInterrupcion = async (form) => {
  try {
    await proyectoService.actualizarInterrupcion(form)
    await cargarProyecto()
  } catch (e) {
    console.error('Error actualizando interrupción:', e)
  }
}

const eliminarInterrupcion = async (id) => {
  try {
    await proyectoService.eliminarInterrupcion(id)
    await cargarProyecto()
  } catch (e) {
    console.error('Error eliminando interrupción:', e)
  }
}
</script>

<template>
  <div class="view-detalle-proyecto">
    <!-- aqui paso los dos props al hijo que son proyecto y loading, y escucho los emits que el hijo me devuelve(ya tienen los valores de los form) con @nombre-del-emit -->
    <DetalleProyecto
      :proyecto="proyecto"
      :loading="loading"
      :desarrolladores="desarrolladores"
      @actualizar-proyecto="actualizarProyecto"
      @inhabilitar-proyecto="inhabilitarProyecto"
      @asignar-desarrolladores="asignarDesarrolladores"
      @remover-desarrollador="removerDesarrollador"
      @crear-etapa="crearEtapa"
      @actualizar-etapa="actualizarEtapa"
      @eliminar-etapa="eliminarEtapa"
      @crear-actividad="crearActividad"
      @actualizar-actividad="actualizarActividad"
      @eliminar-actividad="eliminarActividad"
      @actualizar-progreso-actividad="actualizarProgresoActividad"
      @crear-error="crearError"
      @actualizar-error="actualizarError"
      @eliminar-error="eliminarError"
      @resolver-error="resolverError"
      @crear-interrupcion="crearInterrupcion"
      @actualizar-interrupcion="actualizarInterrupcion"
      @eliminar-interrupcion="eliminarInterrupcion"
    />
  </div>
</template>