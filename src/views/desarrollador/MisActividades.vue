<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  actividades: {
    type: Array,
    default: () => []
  }
})

defineEmits(['iniciar', 'completar', 'actualizar-progreso'])

const filtroEstado = ref('')

const actividadesFiltradas = computed(() => {
  if (!filtroEstado.value) return props.actividades
  return props.actividades.filter(a => a.estado === filtroEstado.value)
})

const actividadesPendientes = computed(() => 
  props.actividades.filter(a => a.estado === 'Pendiente').length
)

const actividadesCompletadas = computed(() => 
  props.actividades.filter(a => a.estado === 'Completada').length
)

const getPrioridadBadge = (prioridad) => {
  const badges = {
    'Alta': 'badge-danger',
    'Media': 'badge-warning',
    'Baja': 'badge-info'
  }
  return badges[prioridad] || 'badge-info'
}

const getEstadoBadge = (estado) => {
  const badges = {
    'Completada': 'badge-success',
    'En Progreso': 'badge-warning',
    'Pendiente': 'badge-info'
  }
  return badges[estado] || 'badge-info'
}

const formatearFecha = (fecha) => {
  if (!fecha) return 'N/A'
  return new Date(fecha).toLocaleDateString('es')
}
</script>

<template>
  <div>
    <h1>Mis Actividades</h1>
    <p class="subtitle">Gestiona tus tareas asignadas</p>

    <div class="grid grid-3 mt-4 mb-4">
      <div class="card stat-card">
        <div class="stat-icon">📋</div>
        <div class="stat-content">
          <h3>{{ actividades.length }}</h3>
          <p>Total Actividades</p>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-content">
          <h3>{{ actividadesPendientes }}</h3>
          <p>Pendientes</p>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-content">
          <h3>{{ actividadesCompletadas }}</h3>
          <p>Completadas</p>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="flex-between mb-4">
        <h2>Actividades Asignadas</h2>
        <select v-model="filtroEstado" class="form-select" style="width: 200px;">
          <option value="">Todos los estados</option>
          <option value="Pendiente">Pendiente</option>
          <option value="En Progreso">En Progreso</option>
          <option value="Completada">Completada</option>
        </select>
      </div>

      <div class="actividades-grid">
        <div v-for="actividad in actividadesFiltradas" :key="actividad.id" class="actividad-card">
          <div class="actividad-header">
            <h3>{{ actividad.nombre }}</h3>
            <span :class="['badge', getPrioridadBadge(actividad.prioridad)]">
              {{ actividad.prioridad }}
            </span>
          </div>

          <p class="actividad-descripcion">{{ actividad.descripcion }}</p>

          <div class="actividad-meta">
            <span class="badge badge-info">{{ actividad.etapa }}</span>
            <span :class="['badge', getEstadoBadge(actividad.estado)]">
              {{ actividad.estado }}
            </span>
          </div>

          <div class="actividad-proyecto">
            <strong>Proyecto:</strong> {{ actividad.proyectoNombre }}
          </div>

          <div class="actividad-fechas">
            <div><strong>Asignada:</strong> {{ formatearFecha(actividad.fechaAsignacion) }}</div>
            <div><strong>Límite:</strong> {{ formatearFecha(actividad.fechaLimite) }}</div>
          </div>

          <div class="actividad-progreso">
            <label class="form-label">Progreso: {{ actividad.progreso || 0 }}%</label>
            <input 
              type="range" 
              min="0" 
              max="100" 
              :value="actividad.progreso"
              @input="$emit('actualizar-progreso', { id: actividad.id, progreso: $event.target.value })"
              class="progress-slider"
            >
          </div>

          <div class="actividad-actions">
            <button 
              v-if="actividad.estado === 'Pendiente'"
              @click="$emit('iniciar', actividad.id)" 
              class="btn btn-primary btn-sm">
              ▶️ Iniciar
            </button>
            <button 
              v-if="actividad.estado === 'En Progreso'"
              @click="$emit('completar', actividad.id)" 
              class="btn btn-success btn-sm">
              ✓ Completar
            </button>
            <span v-if="actividad.estado === 'Completada'" class="badge badge-success">
              ✓ Completada
            </span>
          </div>
        </div>
      </div>

      <div v-if="actividadesFiltradas.length === 0" class="text-center" style="padding: 40px;">
        <p style="color: var(--text-secondary)">No tienes actividades asignadas</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  font-size: 48px;
}

.stat-content h3 {
  font-size: 32px;
  color: var(--primary-color);
  margin-bottom: 4px;
}

.stat-content p {
  color: var(--text-secondary);
  font-size: 14px;
}

.actividades-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.actividad-card {
  background: var(--background);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.actividad-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.actividad-header h3 {
  margin: 0;
  font-size: 16px;
  color: var(--primary-color);
}

.actividad-descripcion {
  color: var(--text-secondary);
  font-size: 14px;
  margin: 0;
}

.actividad-meta {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.actividad-proyecto,
.actividad-fechas {
  font-size: 14px;
  color: var(--text-secondary);
}

.actividad-fechas {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.actividad-progreso {
  padding-top: 8px;
  border-top: 1px solid var(--border-color);
}

.progress-slider {
  width: 100%;
  margin-top: 8px;
}

.actividad-actions {
  display: flex;
  gap: 8px;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 13px;
  flex: 1;
}
</style>
