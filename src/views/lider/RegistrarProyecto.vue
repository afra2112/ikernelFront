<script setup>
import { authService } from '@/services/authService'
import { proyectoService } from '@/services/proyectoService'
import { usuarioService } from '@/services/usuarioService'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mensaje = ref('')
const mensajeTipo = ref('success')
const desarrolladores = ref([])
const proytectoForm = ref({
  nombre: '',
  cliente: '',
  fechaInicio: '',
  fechaEntrega: '',
  presupuesto: '',
  prioridad: 'Media',
  descripcion: '',
  objetivos: '',
  idLider: '', 
  estado: 'ACTIVO',
  desarrolladoresIds: []
})
const desarrolladoresSeleccionados = ref([])

onMounted(async () => {
  try {
    desarrolladores.value = (await usuarioService.obtenerDesarrolladores()).data;
    const { data } = await authService.currentUser();
    proytectoForm.value.idLider = Number(data.idUsuario);
  } catch (e) {
    console.warn("No autenticado");
  }
});

const registrarProyecto = async () => {
  proytectoForm.value.desarrolladoresIds = desarrolladoresSeleccionados.value.map(Number);

  try {
    await proyectoService.registrarProyecto(proytectoForm.value) 
    mensaje.value = 'Proyecto registrado exitosamente'
    mensajeTipo.value = 'success'
  } catch (error) {
    console.log(error);
  }
  
}
</script>

<template>
  <div>
    <h1>Registrar Proyecto</h1>
    <p class="subtitle">Crea un nuevo proyecto</p>

    <div class="card mt-4">
      <form @submit.prevent="registrarProyecto">
        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label">Nombre del Proyecto</label>
            <input v-model="proytectoForm.nombre" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Cliente</label>
            <input v-model="proytectoForm.cliente" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Fecha de Inicio</label>
            <input v-model="proytectoForm.fechaInicio" type="date" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Fecha de Entrega Estimada</label>
            <input v-model="proytectoForm.fechaEntrega" type="date" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Presupuesto</label>
            <input v-model="proytectoForm.presupuesto" type="number" class="form-input" step="0.01" required>
          </div>

          <div class="form-group">
            <label class="form-label">Prioridad</label>
            <select v-model="proytectoForm.prioridad" class="form-select" required>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Descripción</label>
          <textarea v-model="proytectoForm.descripcion" class="form-textarea" required></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Objetivos</label>
          <textarea v-model="proytectoForm.objetivos" class="form-textarea" required></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Tecnologías</label>
          <input v-model="proytectoForm.tecnologias" type="text" class="form-input" 
                 placeholder="Ej: Vue.js, Node.js, PostgreSQL">
        </div>

        <div class="form-group">
        <label>Desarrolladores</label>
        <select v-model="desarrolladoresSeleccionados" multiple>
          <option v-for="dev in desarrolladores" :key="dev.idUsuario" :value="Number(dev.idUsuario)">
            {{ dev.nombre }} {{ dev.apellido }}
          </option>
        </select>
      </div>

        <div v-if="mensaje" :class="['alert', mensajeTipo === 'success' ? 'alert-success' : 'alert-error']">
          {{ mensaje }}
        </div>

        <div class="flex gap-2 mt-4">
          <button type="submit" class="btn btn-primary">Registrar Proyecto</button>
          <router-link to="/dashboard/proyectos" class="btn btn-outline">Cancelar</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}
</style>
