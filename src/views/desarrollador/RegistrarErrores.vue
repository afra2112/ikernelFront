<script setup>
import { ref, computed, onMounted } from 'vue'
import { authService } from '../../services/authService'

const proyectos = ref([])
const errores = ref([])
const mensaje = ref('')

const nuevoError = ref({
  proyectoId: '',
  tipo: '',
  fase: '',
  severidad: 'Media',
  descripcion: '',
  pasosReproducir: '',
  solucion: '',
  fecha: new Date().toISOString().split('T')[0]
})

const getSeveridadBadge = (severidad) => {
  const badges = {
    'Crítica': 'badge-danger',
    'Alta': 'badge-warning',
    'Media': 'badge-info',
    'Baja': 'badge-success'
  }
  return badges[severidad] || 'badge-info'
}

const getProyectoNombre = (proyectoId) => {
  const proyecto = proyectos.value.find(p => p.id === proyectoId)
  return proyecto ? proyecto.nombre : 'N/A'
}

const formatearFecha = (fecha) => {
  if (!fecha) return 'N/A'
  return new Date(fecha).toLocaleDateString('es')
}

const registrarError = () => {
  const errorData = {
    ...nuevoError.value,
    desarrolladorId: currentUser.value.id,
    fecha: new Date().toISOString()
  }
  
  storageService.saveError(errorData)
  mensaje.value = 'Error registrado exitosamente'
  
  nuevoError.value = {
    proyectoId: '',
    tipo: '',
    fase: '',
    severidad: 'Media',
    descripcion: '',
    pasosReproducir: '',
    solucion: '',
    fecha: new Date().toISOString().split('T')[0]
  }
  
  cargarErrores()
  setTimeout(() => mensaje.value = '', 3000)
}

const cargarErrores = () => {
  const todosErrores = storageService.getErrores()
  errores.value = todosErrores.filter(e => e.desarrolladorId === currentUser.value.id)
}

</script>

<template>
  <div>
    <h1>Registrar Errores</h1>
    <p class="subtitle">Reporta errores encontrados en los proyectos</p>

    <div class="grid grid-2 mt-4">
      <div class="card">
        <h2>Nuevo Error</h2>
        <form @submit.prevent="registrarError">
          <div class="form-group">
            <label class="form-label">Proyecto</label>
            <select v-model="nuevoError.proyectoId" class="form-select" required>
              <option value="">Seleccionar proyecto...</option>
              <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">
                {{ proyecto.nombre }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Tipo de Error</label>
            <select v-model="nuevoError.tipo" class="form-select" required>
              <option value="">Seleccionar tipo...</option>
              <option value="Sintaxis">Error de Sintaxis</option>
              <option value="Lógica">Error de Lógica</option>
              <option value="Runtime">Error de Ejecución</option>
              <option value="Integración">Error de Integración</option>
              <option value="Base de Datos">Error de Base de Datos</option>
              <option value="UI/UX">Error de Interfaz</option>
              <option value="Rendimiento">Error de Rendimiento</option>
              <option value="Seguridad">Error de Seguridad</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Fase del Proyecto</label>
            <select v-model="nuevoError.fase" class="form-select" required>
              <option value="">Seleccionar fase...</option>
              <option value="Análisis">Análisis</option>
              <option value="Diseño">Diseño</option>
              <option value="Desarrollo">Desarrollo</option>
              <option value="Pruebas">Pruebas</option>
              <option value="Despliegue">Despliegue</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Severidad</label>
            <select v-model="nuevoError.severidad" class="form-select" required>
              <option value="Crítica">Crítica</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Descripción del Error</label>
            <textarea v-model="nuevoError.descripcion" class="form-textarea" required 
                      placeholder="Describe el error encontrado..."></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Pasos para Reproducir</label>
            <textarea v-model="nuevoError.pasosReproducir" class="form-textarea" 
                      placeholder="1. Paso uno&#10;2. Paso dos&#10;3. ..."></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Solución Propuesta (Opcional)</label>
            <textarea v-model="nuevoError.solucion" class="form-textarea" 
                      placeholder="Describe una posible solución..."></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%">
            Registrar Error
          </button>
        </form>

        <div v-if="mensaje" class="alert alert-success mt-4">
          {{ mensaje }}
        </div>
      </div>

      <div class="card">
        <h2>Errores Registrados</h2>
        <div class="errores-list">
          <div v-for="error in errores" :key="error.id" class="error-item">
            <div class="error-header">
              <span :class="['badge', getSeveridadBadge(error.severidad)]">
                {{ error.severidad }}
              </span>
              <span class="badge badge-info">{{ error.tipo }}</span>
            </div>
            <h3>{{ getProyectoNombre(error.proyectoId) }}</h3>
            <p class="error-descripcion">{{ error.descripcion }}</p>
            <div class="error-meta">
              <small><strong>Fase:</strong> {{ error.fase }}</small>
              <small><strong>Fecha:</strong> {{ formatearFecha(error.fecha) }}</small>
            </div>
          </div>
        </div>

        <div v-if="errores.length === 0" class="text-center" style="padding: 40px;">
          <p style="color: var(--text-secondary)">No has registrado errores</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}

.errores-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
}

.error-item {
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.error-header {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
}

.error-item h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: var(--primary-color);
}

.error-descripcion {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}

.error-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--text-secondary);
}
</style>
