<template>
  <div>
    <div class="flex-between mb-4">
      <div>
        <h1>Reporte de Actividades</h1>
        <p class="subtitle">{{ proyecto?.nombre }}</p>
      </div>
      <div class="flex gap-2">
        <button @click="exportarReporte" class="btn btn-success">📊 Exportar</button>
        <router-link to="/dashboard/proyectos" class="btn btn-outline">← Volver</router-link>
      </div>
    </div>

    <div class="grid grid-3 mb-4">
      <div class="card stat-card">
        <div class="stat-icon">✓</div>
        <div class="stat-content">
          <h3>{{ actividades.length }}</h3>
          <p>Total Actividades</p>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-content">
          <h3>{{ actividadesCompletadas }}</h3>
          <p>Completadas</p>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>{{ tasaCompletado }}%</h3>
          <p>Tasa de Completado</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h2>Actividades del Proyecto</h2>
      <table class="table">
        <thead>
          <tr>
            <th>Actividad</th>
            <th>Desarrollador</th>
            <th>Etapa</th>
            <th>Estado</th>
            <th>Prioridad</th>
            <th>Progreso</th>
            <th>Fecha Límite</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="actividad in actividades" :key="actividad.id">
            <td><strong>{{ actividad.nombre }}</strong></td>
            <td>{{ getDesarrolladorNombre(actividad.desarrolladorId) }}</td>
            <td><span class="badge badge-info">{{ actividad.etapa }}</span></td>
            <td>
              <span :class="['badge', getEstadoBadge(actividad.estado)]">
                {{ actividad.estado }}
              </span>
            </td>
            <td>
              <span :class="['badge', getPrioridadBadge(actividad.prioridad)]">
                {{ actividad.prioridad }}
              </span>
            </td>
            <td>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: (actividad.progreso || 0) + '%' }"></div>
              </div>
              <small>{{ actividad.progreso || 0 }}%</small>
            </td>
            <td>{{ formatearFecha(actividad.fechaLimite) }}</td>
          </tr>
        </tbody>
      </table>

      <div v-if="actividades.length === 0" class="text-center" style="padding: 40px;">
        <p style="color: var(--text-secondary)">No hay actividades registradas</p>
      </div>
    </div>

    <div class="grid grid-2 mt-4">
      <div class="card">
        <h2>Actividades por Estado</h2>
        <div class="stats-list">
          <div v-for="(count, estado) in actividadesPorEstado" :key="estado" class="stat-item">
            <span>{{ estado }}</span>
            <strong>{{ count }}</strong>
          </div>
        </div>
      </div>

      <div class="card">
        <h2>Actividades por Desarrollador</h2>
        <div class="stats-list">
          <div v-for="(count, devId) in actividadesPorDesarrollador" :key="devId" class="stat-item">
            <span>{{ getDesarrolladorNombre(parseInt(devId)) }}</span>
            <strong>{{ count }}</strong>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { storageService } from '../../services/storageService'

const route = useRoute()
const proyecto = ref(null)
const actividades = ref([])
const desarrolladores = ref([])

const actividadesCompletadas = computed(() => 
  actividades.value.filter(a => a.estado === 'Completada').length
)

const tasaCompletado = computed(() => {
  if (actividades.value.length === 0) return 0
  return Math.round((actividadesCompletadas.value / actividades.value.length) * 100)
})

const actividadesPorEstado = computed(() => {
  const estados = {}
  actividades.value.forEach(a => {
    estados[a.estado] = (estados[a.estado] || 0) + 1
  })
  return estados
})

const actividadesPorDesarrollador = computed(() => {
  const devs = {}
  actividades.value.forEach(a => {
    devs[a.desarrolladorId] = (devs[a.desarrolladorId] || 0) + 1
  })
  return devs
})

const getEstadoBadge = (estado) => {
  const badges = {
    'Completada': 'badge-success',
    'En Progreso': 'badge-warning',
    'Pendiente': 'badge-info'
  }
  return badges[estado] || 'badge-info'
}

const getPrioridadBadge = (prioridad) => {
  const badges = {
    'Alta': 'badge-danger',
    'Media': 'badge-warning',
    'Baja': 'badge-info'
  }
  return badges[prioridad] || 'badge-info'
}

const getDesarrolladorNombre = (id) => {
  const dev = desarrolladores.value.find(d => d.id === id)
  return dev ? `${dev.nombre} ${dev.apellido}` : 'N/A'
}

const formatearFecha = (fecha) => {
  if (!fecha) return 'N/A'
  return new Date(fecha).toLocaleDateString('es')
}

const exportarReporte = () => {
  const contenido = `Reporte de Actividades - ${proyecto.value.nombre}\n\n` +
    `Total Actividades: ${actividades.value.length}\n` +
    `Completadas: ${actividadesCompletadas.value}\n` +
    `Tasa de Completado: ${tasaCompletado.value}%\n\n` +
    actividades.value.map(a => 
      `${a.nombre} | ${getDesarrolladorNombre(a.desarrolladorId)} | ${a.estado} | ${a.progreso || 0}%`
    ).join('\n')
  
  const blob = new Blob([contenido], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reporte-actividades-${proyecto.value.nombre}.txt`
  a.click()
}

onMounted(() => {
  const id = route.params.id
  proyecto.value = storageService.getProyectoById(id)
  actividades.value = storageService.getActividadesByProyecto(parseInt(id))
  desarrolladores.value = storageService.getDesarrolladores()
})
</script>

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

.progress-bar {
  height: 8px;
  background: var(--background);
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 4px;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  transition: width 0.3s;
}

.stats-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  background: var(--background);
  border-radius: 6px;
}
</style>
