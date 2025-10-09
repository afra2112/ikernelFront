<template>
  <div>
    <h1>Registrar Desarrollador</h1>
    <p class="subtitle">Ingresa la información del nuevo desarrollador</p>

    <div class="card mt-4">
      <form @submit.prevent="$emit('submit', formData)">
        <div class="grid grid-2">
          <div class="form-group">
            <label class="form-label">Nombre</label>
            <input v-model="formData.nombre" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Apellido</label>
            <input v-model="formData.apellido" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Fecha de Nacimiento</label>
            <input v-model="formData.fechaNacimiento" type="date" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Identificación</label>
            <input v-model="formData.identificacion" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Dirección</label>
            <input v-model="formData.direccion" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Profesión</label>
            <input v-model="formData.profesion" type="text" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Especialidad de Desarrollo</label>
            <select v-model="formData.especialidad" class="form-select" required>
              <option value="">Seleccionar...</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Full Stack">Full Stack</option>
              <option value="Mobile">Mobile</option>
              <option value="DevOps">DevOps</option>
              <option value="QA">QA</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Tipo de Trabajador</label>
            <select v-model="formData.tipo" class="form-select" required>
              <option value="">Seleccionar...</option>
              <option value="coordinador">Coordinador</option>
              <option value="lider">Líder de Proyecto</option>
              <option value="desarrollador">Desarrollador</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="formData.email" type="email" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Teléfono</label>
            <input v-model="formData.telefono" type="tel" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Proyecto Asignado (Opcional)</label>
            <select v-model="formData.proyectoId" class="form-select">
              <option value="">Sin asignar</option>
              <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">
                {{ proyecto.nombre }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Foto (URL)</label>
            <input v-model="formData.foto" type="url" class="form-input" placeholder="https://...">
          </div>
        </div>

        <div v-if="mensaje" :class="['alert', mensajeTipo === 'success' ? 'alert-success' : 'alert-error']">
          {{ mensaje }}
        </div>

        <div class="flex gap-2 mt-4">
          <button type="submit" class="btn btn-primary">Registrar Desarrollador</button>
          <router-link to="/dashboard/desarrolladores" class="btn btn-outline">Cancelar</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineProps, defineEmits } from 'vue'

defineProps({
  proyectos: {
    type: Array,
    default: () => []
  },
  mensaje: String,
  mensajeTipo: String
})

defineEmits(['submit'])

const formData = ref({
  nombre: '',
  apellido: '',
  fechaNacimiento: '',
  identificacion: '',
  direccion: '',
  profesion: '',
  especialidad: '',
  tipo: '',
  email: '',
  telefono: '',
  proyectoId: '',
  foto: ''
})
</script>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}
</style>
