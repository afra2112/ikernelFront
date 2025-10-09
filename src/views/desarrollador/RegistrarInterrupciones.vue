<script setup>
import { ref, computed, onMounted } from 'vue'
import { authService } from '../../services/authService'

const proyectos = ref([])
const interrupciones = ref([])
const mensaje = ref('')

const nuevaInterrupcion = ref({
  proyectoId: '',
  tipo: '',
  fase: '',
  fecha: new Date().toISOString().split('T')[0],
  duracion: '',
  descripcion: '',
  impacto: 'Medio'
})

const tiempoTotal = computed(() => {
  return interrupciones.value.reduce((total, i) => total + parseFloat(i.duracion || 0), 0)
})

const getTipoBadge = (tipo) => {
  const badges = {
    'Técnica': 'badge-danger',
    'Reunión': 'badge-warning',
    'Soporte': 'badge-info',
    'Cambio de Requisitos': 'badge-warning',
    'Dependencia Externa': 'badge-info',
    'Personal': 'badge-secondary',
    'Otra': 'badge-secondary'
  }
  return badges[tipo] || 'badge-info'
}

const getImpactoBadge = (impacto) => {
  const badges = {
    'Alto': 'badge-danger',
    'Medio': 'badge-warning',
    'Bajo': 'badge-success'
  }
  return badges[impacto] || 'badge-info'
}

const getProyectoNombre = (proyectoId) => {
  const proyecto = proyectos.value.find(p => p.id === proyectoId)
  return proyecto ? proyecto.nombre : 'N/A'
}

const formatearFecha = (fecha) => {
  if (!fecha) return 'N/A'
  return new Date(fecha).toLocaleDateString('es')
}

const registrarInterrupcion = () => {
  const interrupcionData = {
    ...nuevaInterrupcion.value,
    desarrolladorId: currentUser.value.id
  }
  
  storageService.saveInterrupcion(interrupcionData)
  mensaje.value = 'Interrupción registrada exitosamente'
  
  nuevaInterrupcion.value = {
    proyectoId: '',
    tipo: '',
    fase: '',
    fecha: new Date().toISOString().split('T')[0],
    duracion: '',
    descripcion: '',
    impacto: 'Medio'
  }
  
  cargarInterrupciones()
  setTimeout(() => mensaje.value = '', 3000)
}

const cargarInterrupciones = () => {
  const todasInterrupciones = storageService.getInterrupciones()
  interrupciones.value = todasInterrupciones.filter(i => i.desarrolladorId === currentUser.value.id)
}
</script>

<template>
  <div>
    <h1>Registrar Interrupciones</h1>
    <p class="subtitle">Reporta interrupciones que afecten el desarrollo</p>

    <div class="grid grid-2 mt-4">
      <div class="card">
        <h2>Nueva Interrupción</h2>
        <form @submit.prevent="registrarInterrupcion">
          <div class="form-group">
            <label class="form-label">Proyecto</label>
            <select v-model="nuevaInterrupcion.proyectoId" class="form-select" required>
              <option value="">Seleccionar proyecto...</option>
              <option v-for="proyecto in proyectos" :key="proyecto.id" :value="proyecto.id">
                {{ proyecto.nombre }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Tipo de Interrupción</label>
            <select v-model="nuevaInterrupcion.tipo" class="form-select" required>
              <option value="">Seleccionar tipo...</option>
              <option value="Técnica">Técnica (Problemas de sistema, red, etc.)</option>
              <option value="Reunión">Reunión no planificada</option>
              <option value="Soporte">Soporte a otro proyecto</option>
              <option value="Cambio de Requisitos">Cambio de Requisitos</option>
              <option value="Dependencia Externa">Dependencia Externa</option>
              <option value="Personal">Personal</option>
              <option value="Otra">Otra</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Fase del Proyecto</label>
            <select v-model="nuevaInterrupcion.fase" class="form-select" required>
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
            <label class="form-label">Fecha de la Interrupción</label>
            <input v-model="nuevaInterrupcion.fecha" type="date" class="form-input" required>
          </div>

          <div class="form-group">
            <label class="form-label">Duración (horas)</label>
            <input v-model="nuevaInterrupcion.duracion" type="number" class="form-input" 
                   step="0.5" min="0.5" required>
          </div>

          <div class="form-group">
            <label class="form-label">Descripción</label>
            <textarea v-model="nuevaInterrupcion.descripcion" class="form-textarea" required 
                      placeholder="Describe la interrupción y su impacto..."></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">Impacto en el Proyecto</label>
            <select v-model="nuevaInterrupcion.impacto" class="form-select" required>
              <option value="Alto">Alto</option>
              <option value="Medio">Medio</option>
              <option value="Bajo">Bajo</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary" style="width: 100%">
            Registrar Interrupción
          </button>
        </form>

        <div v-if="mensaje" class="alert alert-success mt-4">
          {{ mensaje }}
        </div>
      </div>

      <div class="card">
        <h2>Interrupciones Registradas</h2>
        
        <div class="stats-box mb-4">
          <div class="stat-item">
            <strong>Total:</strong>
            <span>{{ interrupciones.length }}</span>
          </div>
          <div class="stat-item">
            <strong>Tiempo Total:</strong>
            <span>{{ tiempoTotal }}h</span>
          </div>
        </div>

        <div class="interrupciones-list">
          <div v-for="interrupcion in interrupciones" :key="interrupcion.id" class="interrupcion-item">
            <div class="interrupcion-header">
              <span :class="['badge', getTipoBadge(interrupcion.tipo)]">
                {{ interrupcion.tipo }}
              </span>
              <span :class="['badge', getImpactoBadge(interrupcion.impacto)]">
                {{ interrupcion.impacto }} Impacto
              </span>
            </div>
            <h3>{{ getProyectoNombre(interrupcion.proyectoId) }}</h3>
            <p class="interrupcion-descripcion">{{ interrupcion.descripcion }}</p>
            <div class="interrupcion-meta">
              <small><strong>Fase:</strong> {{ interrupcion.fase }}</small>
              <small><strong>Fecha:</strong> {{ formatearFecha(interrupcion.fecha) }}</small>
              <small><strong>Duración:</strong> {{ interrupcion.duracion }}h</small>
            </div>
          </div>
        </div>

        <div v-if="interrupciones.length === 0" class="text-center" style="padding: 40px;">
          <p style="color: var(--text-secondary)">No has registrado interrupciones</p>
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

.stats-box {
  display: flex;
  gap: 24px;
  padding: 16px;
  background: var(--background);
  border-radius: 6px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stat-item strong {
  font-size: 12px;
  color: var(--text-secondary);
}

.stat-item span {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
}

.interrupciones-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.interrupcion-item {
  padding: 16px;
  background: var(--background);
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

.interrupcion-header {
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.interrupcion-item h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
  color: var(--primary-color);
}

.interrupcion-descripcion {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}

.interrupcion-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 13px;
  color: var(--text-secondary);
}
</style>
