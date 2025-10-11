<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeTab = ref('general')


// escucho los pops que me mando mi padre view
const props = defineProps({
  proyecto: {
    type: Object,
    default: () => null
  },
  loading: {
    type: Boolean,
    default: false
  },
  desarrolladores: {
    type: Array,
    default: () => []
  }
})

// aqui mnado los emits para que mi padre view los escuche y mande las peticiones ya al back
const emit = defineEmits([
  'actualizar-proyecto',
  'inhabilitar-proyecto',
  
  'asignar-desarrolladores',
  'remover-desarrollador',
  
  'crear-etapa',
  'actualizar-etapa',
  'eliminar-etapa',
  
  'crear-actividad',
  'actualizar-actividad',
  'eliminar-actividad',
  'actualizar-progreso-actividad',
  
  'crear-error',
  'actualizar-error',
  'eliminar-error',
  'resolver-error',

  'crear-interrupcion',
  'actualizar-interrupcion',
  'eliminar-interrupcion'
])

const modalEditarProyecto = ref(false)
const modalAsignarDev = ref(false)
const modalCrearEtapa = ref(false)
const modalEditarEtapa = ref(false)
const modalCrearActividad = ref(false)
const modalEditarActividad = ref(false)
const modalCrearError = ref(false)
const modalEditarError = ref(false)
const modalCrearInterrupcion = ref(false)
const modalEditarInterrupcion = ref(false)

const formProyecto = ref({
  nombre: '',
  cliente: '',
  descripcion: '',
  objetivos: '',
  fechaInicio: '',
  fechaFin: '',
  estado: '',
  prioridad: '',
  presupuesto: 0
})

const formEtapa = ref({
  idEtapa: null,
  nombre: '',
  descripcion: ''
})

const formActividad = ref({
  idActividad: null,
  nombre: '',
  descripcion: '',
  prioridad: 'MEDIA',
  estado: '0',
  idDesarrollador: null
})

const formError = ref({
  idError: null,
  tipoError: 'LOGICO',
  observacion: '',
  severidad: 'MEDIO',
  estado: 'ABIERTO',
  fechaDeteccion: '',
  idEtapa: null,
  idDesarrolladorReporta: null
})

const formInterrupcion = ref({
  idInterrupcion: null,
  observacion: '',
  duracion: '',
  fecha: '',
  tipo: 'TECNICA'
})

const desarrolladoresSeleccionados = ref([])

// Funciones para abrir modales de edición
const abrirEditarProyecto = () => {
  if (props.proyecto) {
    formProyecto.value = { ...props.proyecto }
    modalEditarProyecto.value = true
  }
}

const abrirEditarEtapa = (etapa) => {
  formEtapa.value = { ...etapa }
  modalEditarEtapa.value = true
}

const abrirEditarActividad = (actividad) => {
  formActividad.value = { ...actividad, idDesarrollador: actividad.desarrollador?.idUsuario }
  modalEditarActividad.value = true
}

const abrirEditarError = (error) => {
  formError.value = { ...error }
  modalEditarError.value = true
}

const abrirEditarInterrupcion = (interrupcion) => {
  formInterrupcion.value = { ...interrupcion }
  modalEditarInterrupcion.value = true
}

const limpiarFormEtapa = () => {
  formEtapa.value = { idEtapa: null, nombre: '', descripcion: '' }
}

const limpiarFormActividad = () => {
  formActividad.value = { idActividad: null, nombre: '', descripcion: '', prioridad: 'MEDIA', estado: '0', idDesarrollador: null }
}

const limpiarFormError = () => {
  formError.value = { idError: null, tipoError: 'LOGICO', observacion: '', severidad: 'MEDIO', estado: 'ABIERTO', fechaDeteccion: '', idEtapa: null, idDesarrolladorReporta: null }
}

const limpiarFormInterrupcion = () => {
  formInterrupcion.value = { idInterrupcion: null, observacion: '', duracion: '', fecha: '', tipo: 'TECNICA' }
}

const submitActualizarProyecto = () => {
  emit('actualizar-proyecto', formProyecto.value)
  modalEditarProyecto.value = false
}

const submitAsignarDesarrolladores = () => {
  emit('asignar-desarrolladores', desarrolladoresSeleccionados.value)
  modalAsignarDev.value = false
  desarrolladoresSeleccionados.value = []
}

const submitCrearEtapa = () => {
  emit('crear-etapa', formEtapa.value)
  modalCrearEtapa.value = false
  limpiarFormEtapa()
}

const submitActualizarEtapa = () => {
  emit('actualizar-etapa', formEtapa.value)
  modalEditarEtapa.value = false
  limpiarFormEtapa()
}

const submitCrearActividad = () => {
  emit('crear-actividad', formActividad.value)
  modalCrearActividad.value = false
  limpiarFormActividad()
}

const submitActualizarActividad = () => {
  emit('actualizar-actividad', formActividad.value)
  modalEditarActividad.value = false
  limpiarFormActividad()
}

const submitCrearError = () => {
  emit('crear-error', formError.value)
  modalCrearError.value = false
  limpiarFormError()
}

const submitActualizarError = () => {
  emit('actualizar-error', formError.value)
  modalEditarError.value = false
  limpiarFormError()
}

const submitCrearInterrupcion = () => {
  emit('crear-interrupcion', formInterrupcion.value)
  modalCrearInterrupcion.value = false
  limpiarFormInterrupcion()
}

const submitActualizarInterrupcion = () => {
  emit('actualizar-interrupcion', formInterrupcion.value)
  modalEditarInterrupcion.value = false
  limpiarFormInterrupcion()
}

// Computed para estadísticas
const estadisticas = computed(() => {
  if (!props.proyecto) return {}
  
  return {
    totalActividades: props.proyecto.actividades?.length || 0,
    actividadesCompletadas: props.proyecto.actividades?.filter(a => a.estado === '100').length || 0,
    totalErrores: props.proyecto.etapas?.reduce((acc, e) => acc + (e.errores?.length || 0), 0) || 0,
    erroresAbiertos: props.proyecto.etapas?.reduce((acc, e) => acc + (e.errores?.filter(err => err.estado === 'ABIERTO').length || 0), 0) || 0,
    totalInterrupciones: props.proyecto.interrupciones?.length || 0,
    totalDesarrolladores: props.proyecto.desarrolladores?.length || 0
  }
})

const progresoGeneral = computed(() => {
  if (!props.proyecto?.actividades?.length) return 0
  const suma = props.proyecto.actividades.reduce((acc, act) => acc + parseInt(act.estado || 0), 0)
  return Math.round(suma / props.proyecto.actividades.length)
})

// Funciones auxiliares
const getBadgeClass = (estado) => {
  const classes = {
    'EN_PLANIFICACION': 'badge-warning',
    'EN_DESARROLLO': 'badge-info',
    'EN_PRUEBAS': 'badge-primary',
    'COMPLETADO': 'badge-success',
    'PAUSADO': 'badge-secondary',
    'CANCELADO': 'badge-danger'
  }
  return classes[estado] || 'badge-secondary'
}

const getPrioridadClass = (prioridad) => {
  const classes = {
    'ALTA': 'badge-danger',
    'URGENTE': 'badge-danger',
    'MEDIA': 'badge-warning',
    'BAJA': 'badge-info'
  }
  return classes[prioridad] || 'badge-secondary'
}

const getSeveridadClass = (severidad) => {
  const classes = {
    'CRITICO': 'badge-danger',
    'ALTO': 'badge-warning',
    'MEDIO': 'badge-info',
    'BAJO': 'badge-secondary'
  }
  return classes[severidad] || 'badge-secondary'
}

const getEstadoErrorClass = (estado) => {
  const classes = {
    'ABIERTO': 'badge-danger',
    'EN_PROCESO': 'badge-warning',
    'RESUELTO': 'badge-success',
    'CERRADO': 'badge-secondary'
  }
  return classes[estado] || 'badge-secondary'
}

const formatFecha = (fecha) => {
  if (!fecha) return '-'
  return new Date(fecha).toLocaleDateString('es-ES')
}

const formatMoneda = (valor) => {
  if (!valor) return '$0'
  return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(valor)
}
</script>

<template>
  <div class="detalle-proyecto">
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Cargando proyecto...</p>
    </div>
    <div v-else-if="!proyecto" class="empty-state">
      <h2>Proyecto no encontrado</h2>
      <p>El proyecto que buscas no existe o no tienes permisos para verlo.</p>
      <router-link to="/dashboard/lider/proyectos" class="btn btn-primary">
        Volver a proyectos
      </router-link>
    </div>

  
    <div v-else class="proyecto-content">

      <div class="proyecto-header">
        <div class="header-content">
          <div class="header-info">
            <h1>{{ proyecto.nombre }}</h1>
            <div class="header-meta">
              <span class="badge" :class="getBadgeClass(proyecto.estado)">
                {{ proyecto.estado }}
              </span>
              <span class="badge" :class="getPrioridadClass(proyecto.prioridad)">
                Prioridad: {{ proyecto.prioridad }}
              </span>
              <span class="cliente">Cliente: {{ proyecto.cliente }}</span>
            </div>
          </div>
          <div class="header-actions">
            <button @click="abrirEditarProyecto" class="btn btn-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Editar
            </button>
            <button @click="emit('inhabilitar-proyecto', proyecto.idProyecto)" class="btn btn-danger">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
              </svg>
              Inhabilitar
            </button>
          </div>
        </div>

        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon bg-blue">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Desarrolladores</p>
              <p class="stat-value">{{ estadisticas.totalDesarrolladores }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-green">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="9 11 12 14 22 4"></polyline>
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Actividades</p>
              <p class="stat-value">{{ estadisticas.actividadesCompletadas }}/{{ estadisticas.totalActividades }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-red">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Errores Abiertos</p>
              <p class="stat-value">{{ estadisticas.erroresAbiertos }}/{{ estadisticas.totalErrores }}</p>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-orange">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div class="stat-info">
              <p class="stat-label">Interrupciones</p>
              <p class="stat-value">{{ estadisticas.totalInterrupciones }}</p>
            </div>
          </div>
        </div>

        <div class="progress-section">
          <div class="progress-header">
            <span>Progreso General del Proyecto</span>
            <span class="progress-percentage">{{ progresoGeneral }}%</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progresoGeneral + '%' }"></div>
          </div>
        </div>
      </div>

      <div class="tabs">
        <button 
          @click="activeTab = 'general'" 
          :class="{ active: activeTab === 'general' }"
          class="tab-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          General
        </button>
        <button 
          @click="activeTab = 'desarrolladores'" 
          :class="{ active: activeTab === 'desarrolladores' }"
          class="tab-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Desarrolladores ({{ estadisticas.totalDesarrolladores }})
        </button>
        <button 
          @click="activeTab = 'etapas'" 
          :class="{ active: activeTab === 'etapas' }"
          class="tab-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
          Etapas ({{ proyecto.etapas?.length || 0 }})
        </button>
        <button 
          @click="activeTab = 'actividades'" 
          :class="{ active: activeTab === 'actividades' }"
          class="tab-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          Actividades ({{ estadisticas.totalActividades }})
        </button>
        <button 
          @click="activeTab = 'errores'" 
          :class="{ active: activeTab === 'errores' }"
          class="tab-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Errores ({{ estadisticas.totalErrores }})
        </button>
        <button 
          @click="activeTab = 'interrupciones'" 
          :class="{ active: activeTab === 'interrupciones' }"
          class="tab-button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <polyline points="12 6 12 12 16 14"></polyline>
          </svg>
          Interrupciones ({{ estadisticas.totalInterrupciones }})
        </button>
      </div>

      <div class="tab-content">
        <div v-show="activeTab === 'general'" class="tab-pane">
          <div class="info-grid">
            <div class="info-card">
              <h3>Información del Proyecto</h3>
              <div class="info-row">
                <span class="info-label">Descripción:</span>
                <span class="info-value">{{ proyecto.descripcion || 'Sin descripción' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Objetivos:</span>
                <span class="info-value">{{ proyecto.objetivos || 'Sin objetivos definidos' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Fecha Inicio:</span>
                <span class="info-value">{{ formatFecha(proyecto.fechaInicio) }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Fecha Fin:</span>
                <span class="info-value">{{ formatFecha(proyecto.fechaFin) }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Presupuesto:</span>
                <span class="info-value">{{ formatMoneda(proyecto.presupuesto) }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Líder:</span>
                <span class="info-value">
                  {{ proyecto.lider ? `${proyecto.lider.nombre} ${proyecto.lider.apellido}` : 'Sin asignar' }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'desarrolladores'" class="tab-pane">
          <div class="section-header">
            <h3>Desarrolladores Asignados</h3>
            <button @click="modalAsignarDev = true" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Asignar Desarrollador
            </button>
          </div>

          <div v-if="!proyecto.desarrolladores || proyecto.desarrolladores.length === 0" class="empty-state-small">
            <p>No hay desarrolladores asignados a este proyecto</p>
          </div>

          <div v-else class="developers-grid">
            <div v-for="dev in proyecto.desarrolladores" :key="dev.idUsuario" class="developer-card">
              <div class="developer-avatar">
                <img v-if="dev.foto" :src="dev.foto" :alt="dev.nombre" />
                <div v-else class="avatar-placeholder">
                  {{ dev.nombre.charAt(0) }}{{ dev.apellido.charAt(0) }}
                </div>
              </div>
              <div class="developer-info">
                <h4>{{ dev.nombre }} {{ dev.apellido }}</h4>
                <p class="developer-role">{{ dev.especialidad || dev.profesion }}</p>
                <p class="developer-email">{{ dev.email }}</p>
              </div>
              <button 
                @click="emit('remover-desarrollador', { idProyecto: proyecto.idProyecto, idUsuario: dev.idUsuario })" 
                class="btn-icon btn-danger-icon"
                title="Remover del proyecto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'etapas'" class="tab-pane">
          <div class="section-header">
            <h3>Etapas del Proyecto</h3>
            <button @click="modalCrearEtapa = true" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Nueva Etapa
            </button>
          </div>

          <div v-if="!proyecto.etapas || proyecto.etapas.length === 0" class="empty-state-small">
            <p>No hay etapas definidas para este proyecto</p>
          </div>

          <div v-else class="etapas-list">
            <div v-for="(etapa, index) in proyecto.etapas" :key="etapa.idEtapa" class="etapa-card">
              <div class="etapa-header">
                <div class="etapa-number">{{ index + 1 }}</div>
                <div class="etapa-info">
                  <h4>{{ etapa.nombre }}</h4>
                  <p>{{ etapa.descripcion }}</p>
                </div>
                <div class="etapa-actions">
                  <button @click="abrirEditarEtapa(etapa)" class="btn-icon" title="Editar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </button>
                  <button @click="emit('eliminar-etapa', etapa.idEtapa)" class="btn-icon btn-danger-icon" title="Eliminar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div v-if="etapa.errores && etapa.errores.length > 0" class="etapa-errores">
                <p class="errores-count">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  {{ etapa.errores.length }} error(es) en esta etapa
                </p>
              </div>
            </div>
          </div>
        </div>

        <div v-show="activeTab === 'actividades'" class="tab-pane">
          <div class="section-header">
            <h3>Actividades del Proyecto</h3>
            <button @click="modalCrearActividad = true" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Nueva Actividad
            </button>
          </div>

          <div v-if="!proyecto.actividades || proyecto.actividades.length === 0" class="empty-state-small">
            <p>No hay actividades registradas para este proyecto</p>
          </div>

          <div v-else class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Actividad</th>
                  <th>Descripción</th>
                  <th>Desarrollador</th>
                  <th>Prioridad</th>
                  <th>Progreso</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="actividad in proyecto.actividades" :key="actividad.idActividad">
                  <td>
                    <strong>{{ actividad.nombre }}</strong>
                  </td>
                  <td>{{ actividad.descripcion }}</td>
                  <td>
                    <span v-if="actividad.desarrollador">
                      {{ actividad.desarrollador.nombre }} {{ actividad.desarrollador.apellido }}
                    </span>
                    <span v-else class="text-muted">Sin asignar</span>
                  </td>
                  <td>
                    <span class="badge" :class="getPrioridadClass(actividad.prioridad)">
                      {{ actividad.prioridad }}
                    </span>
                  </td>
                  <td>
                    <div class="progress-inline">
                      <div class="progress-bar-small">
                        <div class="progress-fill-small" :style="{ width: actividad.estado + '%' }"></div>
                      </div>
                      <span class="progress-text">{{ actividad.estado }}%</span>
                    </div>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button @click="abrirEditarActividad(actividad)" class="btn-icon" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button @click="emit('eliminar-actividad', actividad.idActividad)" class="btn-icon btn-danger-icon" title="Eliminar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div v-show="activeTab === 'errores'" class="tab-pane">
          <div class="section-header">
            <h3>Errores del Proyecto</h3>
            <button @click="modalCrearError = true" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Registrar Error
            </button>
          </div>

          <div v-if="!proyecto.etapas || proyecto.etapas.every(e => !e.errores || e.errores.length === 0)" class="empty-state-small">
            <p>No hay errores registrados en este proyecto</p>
          </div>

          <div v-else class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Tipo</th>
                  <th>Observación</th>
                  <th>Severidad</th>
                  <th>Estado</th>
                  <th>Etapa</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="etapa in proyecto.etapas" :key="etapa.idEtapa">
                  <tr v-for="error in etapa.errores" :key="error.idError">
                    <td>
                      <span class="badge badge-secondary">{{ error.tipoError }}</span>
                    </td>
                    <td>{{ error.observacion }}</td>
                    <td>
                      <span class="badge" :class="getSeveridadClass(error.severidad)">
                        {{ error.severidad }}
                      </span>
                    </td>
                    <td>
                      <span class="badge" :class="getEstadoErrorClass(error.estado)">
                        {{ error.estado }}
                      </span>
                    </td>
                    <td>{{ etapa.nombre }}</td>
                    <td>{{ formatFecha(error.fechaDeteccion) }}</td>
                    <td>
                      <div class="action-buttons">
                        <button @click="abrirEditarError(error)" class="btn-icon" title="Editar">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button 
                          v-if="error.estado !== 'RESUELTO'" 
                          @click="emit('resolver-error', error.idError)" 
                          class="btn-icon btn-success-icon" 
                          title="Marcar como resuelto"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </button>
                        <button @click="emit('eliminar-error', error.idError)" class="btn-icon btn-danger-icon" title="Eliminar">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>

        <div v-show="activeTab === 'interrupciones'" class="tab-pane">
          <div class="section-header">
            <h3>Interrupciones del Proyecto</h3>
            <button @click="modalCrearInterrupcion = true" class="btn btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Registrar Interrupción
            </button>
          </div>

          <div v-if="!proyecto.interrupciones || proyecto.interrupciones.length === 0" class="empty-state-small">
            <p>No hay interrupciones registradas para este proyecto</p>
          </div>

          <div v-else class="table-container">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Observación</th>
                  <th>Duración</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="interrupcion in proyecto.interrupciones" :key="interrupcion.idInterrupcion">
                  <td>{{ formatFecha(interrupcion.fecha) }}</td>
                  <td>
                    <span class="badge badge-warning">{{ interrupcion.tipo }}</span>
                  </td>
                  <td>{{ interrupcion.observacion }}</td>
                  <td>{{ interrupcion.duracion }}</td>
                  <td>
                    <div class="action-buttons">
                      <button @click="abrirEditarInterrupcion(interrupcion)" class="btn-icon" title="Editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button @click="emit('eliminar-interrupcion', interrupcion.idInterrupcion)" class="btn-icon btn-danger-icon" title="Eliminar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div v-if="modalEditarProyecto" class="modal-overlay" @click.self="modalEditarProyecto = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Editar Proyecto</h3>
          <button @click="modalEditarProyecto = false" class="btn-close">×</button>
        </div>
        <form @submit.prevent="submitActualizarProyecto" class="modal-body">
          <div class="form-group">
            <label>Nombre del Proyecto *</label>
            <input v-model="formProyecto.nombre" type="text" required class="form-control" />
          </div>
          <div class="form-group">
            <label>Cliente *</label>
            <input v-model="formProyecto.cliente" type="text" required class="form-control" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Fecha Inicio *</label>
              <input v-model="formProyecto.fechaInicio" type="date" required class="form-control" />
            </div>
            <div class="form-group">
              <label>Fecha Fin *</label>
              <input v-model="formProyecto.fechaFin" type="date" required class="form-control" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Estado *</label>
              <select v-model="formProyecto.estado" required class="form-control">
                <option value="EN_PLANIFICACION">En Planificación</option>
                <option value="EN_DESARROLLO">En Desarrollo</option>
                <option value="EN_PRUEBAS">En Pruebas</option>
                <option value="COMPLETADO">Completado</option>
                <option value="PAUSADO">Pausado</option>
                <option value="CANCELADO">Cancelado</option>
              </select>
            </div>
            <div class="form-group">
              <label>Prioridad *</label>
              <select v-model="formProyecto.prioridad" required class="form-control">
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Presupuesto</label>
            <input v-model.number="formProyecto.presupuesto" type="number" class="form-control" />
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="formProyecto.descripcion" rows="3" class="form-control"></textarea>
          </div>
          <div class="form-group">
            <label>Objetivos</label>
            <textarea v-model="formProyecto.objetivos" rows="3" class="form-control"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="modalEditarProyecto = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalAsignarDev" class="modal-overlay" @click.self="modalAsignarDev = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Asignar Desarrollador</h3>
          <button @click="modalAsignarDev = false" class="btn-close">×</button>
        </div>
        <form @submit.prevent="submitAsignarDesarrolladores" class="modal-body">
          <div class="form-group">
            <label>Seleccionar Desarrollador *</label>
            <select v-model="desarrolladoresSeleccionados" required class="form-control" multiple>
              <option v-if="desarrolladores.length === 0" value="" disabled>No hay desarrolladores disponibles.</option>
              <option v-for="desarrollador in props.desarrolladores" :key="desarrollador.idUsuario" :value="Number(desarrollador.idUsuario)">{{ desarrollador.nombre }} - {{ desarrollador.rol }}</option>
            </select>
          </div>
          <div class="modal-footer">
            <button type="button" @click="modalAsignarDev = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Asignar</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalCrearEtapa" class="modal-overlay" @click.self="modalCrearEtapa = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Nueva Etapa</h3>
          <button @click="modalCrearEtapa = false" class="btn-close">×</button>
        </div>
        <form @submit.prevent="submitCrearEtapa" class="modal-body">
          <div class="form-group">
            <label>Nombre de la Etapa *</label>
            <input v-model="formEtapa.nombre" type="text" required class="form-control" placeholder="Ej: Análisis de Requisitos" />
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="formEtapa.descripcion" rows="3" class="form-control" placeholder="Describe los objetivos de esta etapa"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="modalCrearEtapa = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Crear Etapa</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalEditarEtapa" class="modal-overlay" @click.self="modalEditarEtapa = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Editar Etapa</h3>
          <button @click="modalEditarEtapa = false" class="btn-close">×</button>
        </div>
        <form @submit.prevent="submitActualizarEtapa" class="modal-body">
          <div class="form-group">
            <label>Nombre de la Etapa *</label>
            <input v-model="formEtapa.nombre" type="text" required class="form-control" />
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="formEtapa.descripcion" rows="3" class="form-control"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="modalEditarEtapa = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalCrearActividad" class="modal-overlay" @click.self="modalCrearActividad = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Nueva Actividad</h3>
          <button @click="modalCrearActividad = false" class="btn-close">×</button>
        </div>
        <form @submit.prevent="submitCrearActividad" class="modal-body">
          <div class="form-group">
            <label>Nombre de la Actividad *</label>
            <input v-model="formActividad.nombre" type="text" required class="form-control" placeholder="Ej: Diseñar base de datos" />
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="formActividad.descripcion" rows="3" class="form-control"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Prioridad *</label>
              <select v-model="formActividad.prioridad" required class="form-control">
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </div>
            <div class="form-group">
              <label>Desarrollador Asignado</label>
              <select v-model="formActividad.idDesarrollador" class="form-control">
                <option :value="null">Sin asignar</option>
                <option v-for="dev in proyecto.desarrolladores" :key="dev.idUsuario" :value="dev.idUsuario">
                  {{ dev.nombre }} {{ dev.apellido }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Progreso Inicial (%)</label>
            <input v-model.number="formActividad.estado" type="number" min="0" max="100" class="form-control" />
          </div>
          <div class="modal-footer">
            <button type="button" @click="modalCrearActividad = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Crear Actividad</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalEditarActividad" class="modal-overlay" @click.self="modalEditarActividad = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Editar Actividad</h3>
          <button @click="modalEditarActividad = false" class="btn-close">×</button>
        </div>
        <form @submit.prevent="submitActualizarActividad" class="modal-body">
          <div class="form-group">
            <label>Nombre de la Actividad *</label>
            <input v-model="formActividad.nombre" type="text" required class="form-control" />
          </div>
          <div class="form-group">
            <label>Descripción</label>
            <textarea v-model="formActividad.descripcion" rows="3" class="form-control"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Prioridad *</label>
              <select v-model="formActividad.prioridad" required class="form-control">
                <option value="BAJA">Baja</option>
                <option value="MEDIA">Media</option>
                <option value="ALTA">Alta</option>
                <option value="URGENTE">Urgente</option>
              </select>
            </div>
            <div class="form-group">
              <label>Desarrollador Asignado</label>
              <select v-model="formActividad.idDesarrollador" class="form-control">
                <option :value="null">Sin asignar</option>
                <option v-for="dev in proyecto.desarrolladores" :key="dev.idUsuario" :value="dev.idUsuario">
                  {{ dev.nombre }} {{ dev.apellido }}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label>Progreso (%)</label>
            <input v-model.number="formActividad.estado" type="number" min="0" max="100" class="form-control" />
            <div class="progress-bar-small" style="margin-top: 8px;">
              <div class="progress-fill-small" :style="{ width: formActividad.estado + '%' }"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" @click="modalEditarActividad = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalCrearError" class="modal-overlay" @click.self="modalCrearError = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Registrar Error</h3>
          <button @click="modalCrearError = false" class="btn-close">×</button>
        </div>
        <form @submit.prevent="submitCrearError" class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Tipo de Error *</label>
              <select v-model="formError.tipoError" required class="form-control">
                <option value="LOGICO">Lógico</option>
                <option value="SINTAXIS">Sintaxis</option>
                <option value="RUNTIME">Runtime</option>
                <option value="COMPILACION">Compilación</option>
                <option value="INTEGRACION">Integración</option>
                <option value="PERFORMANCE">Performance</option>
                <option value="SEGURIDAD">Seguridad</option>
                <option value="UI_UX">UI/UX</option>
              </select>
            </div>
            <div class="form-group">
              <label>Severidad *</label>
              <select v-model="formError.severidad" required class="form-control">
                <option value="BAJO">Bajo</option>
                <option value="MEDIO">Medio</option>
                <option value="ALTO">Alto</option>
                <option value="CRITICO">Crítico</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Estado *</label>
              <select v-model="formError.estado" required class="form-control">
                <option value="ABIERTO">Abierto</option>
                <option value="EN_PROCESO">En Proceso</option>
                <option value="RESUELTO">Resuelto</option>
                <option value="CERRADO">Cerrado</option>
              </select>
            </div>
            <div class="form-group">
              <label>Fecha Detección *</label>
              <input v-model="formError.fechaDeteccion" type="date" required class="form-control" />
            </div>
          </div>
          <div class="form-group">
            <label>Etapa donde se encontró *</label>
            <select v-model="formError.idEtapa" required class="form-control">
              <option :value="null">-- Seleccione una etapa --</option>
              <option v-for="etapa in proyecto.etapas" :key="etapa.idEtapa" :value="etapa.idEtapa">
                {{ etapa.nombre }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Desarrollador que reporta</label>
            <select v-model="formError.idDesarrolladorReporta" class="form-control">
              <option :value="null">-- Seleccione desarrollador --</option>
              <option v-for="dev in proyecto.desarrolladores" :key="dev.idUsuario" :value="dev.idUsuario">
                {{ dev.nombre }} {{ dev.apellido }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>Observación *</label>
            <textarea v-model="formError.observacion" rows="4" required class="form-control" placeholder="Describe el error encontrado..."></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="modalCrearError = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Registrar Error</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalEditarError" class="modal-overlay" @click.self="modalEditarError = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Editar Error</h3>
          <button @click="modalEditarError = false" class="btn-close">×</button>
        </div>
        <form @submit.prevent="submitActualizarError" class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Tipo de Error *</label>
              <select v-model="formError.tipoError" required class="form-control">
                <option value="LOGICO">Lógico</option>
                <option value="SINTAXIS">Sintaxis</option>
                <option value="RUNTIME">Runtime</option>
                <option value="COMPILACION">Compilación</option>
                <option value="INTEGRACION">Integración</option>
                <option value="PERFORMANCE">Performance</option>
                <option value="SEGURIDAD">Seguridad</option>
                <option value="UI_UX">UI/UX</option>
              </select>
            </div>
            <div class="form-group">
              <label>Severidad *</label>
              <select v-model="formError.severidad" required class="form-control">
                <option value="BAJO">Bajo</option>
                <option value="MEDIO">Medio</option>
                <option value="ALTO">Alto</option>
                <option value="CRITICO">Crítico</option>
              </select>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Estado *</label>
              <select v-model="formError.estado" required class="form-control">
                <option value="ABIERTO">Abierto</option>
                <option value="EN_PROCESO">En Proceso</option>
                <option value="RESUELTO">Resuelto</option>
                <option value="CERRADO">Cerrado</option>
              </select>
            </div>
            <div class="form-group">
              <label>Fecha Detección *</label>
              <input v-model="formError.fechaDeteccion" type="date" required class="form-control" />
            </div>
          </div>
          <div class="form-group">
            <label>Observación *</label>
            <textarea v-model="formError.observacion" rows="4" required class="form-control"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="modalEditarError = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalCrearInterrupcion" class="modal-overlay" @click.self="modalCrearInterrupcion = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Registrar Interrupción</h3>
          <button @click="modalCrearInterrupcion = false" class="btn-close">×</button>
        </div>
        <form @submit.prevent="submitCrearInterrupcion" class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Fecha *</label>
              <input v-model="formInterrupcion.fecha" type="date" required class="form-control" />
            </div>
            <div class="form-group">
              <label>Duración *</label>
              <input v-model="formInterrupcion.duracion" type="text" required class="form-control" placeholder="Ej: 2 horas, 1 día" />
            </div>
          </div>
          <div class="form-group">
            <label>Tipo de Interrupción *</label>
            <select v-model="formInterrupcion.tipo" required class="form-control">
              <option value="TECNICA">Técnica</option>
              <option value="RECURSOS">Recursos</option>
              <option value="CLIENTE">Cliente</option>
              <option value="PERSONAL">Personal</option>
              <option value="EXTERNA">Externa</option>
              <option value="PLANIFICACION">Planificación</option>
            </select>
          </div>
          <div class="form-group">
            <label>Observación *</label>
            <textarea v-model="formInterrupcion.observacion" rows="4" required class="form-control" placeholder="Describe la interrupción y su impacto..."></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="modalCrearInterrupcion = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Registrar Interrupción</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="modalEditarInterrupcion" class="modal-overlay" @click.self="modalEditarInterrupcion = false">
      <div class="modal">
        <div class="modal-header">
          <h3>Editar Interrupción</h3>
          <button @click="modalEditarInterrupcion = false" class="btn-close">×</button>
        </div>
        <form @submit.prevent="submitActualizarInterrupcion" class="modal-body">
          <div class="form-row">
            <div class="form-group">
              <label>Fecha *</label>
              <input v-model="formInterrupcion.fecha" type="date" required class="form-control" />
            </div>
            <div class="form-group">
              <label>Duración *</label>
              <input v-model="formInterrupcion.duracion" type="text" required class="form-control" />
            </div>
          </div>
          <div class="form-group">
            <label>Tipo de Interrupción *</label>
            <select v-model="formInterrupcion.tipo" required class="form-control">
              <option value="TECNICA">Técnica</option>
              <option value="RECURSOS">Recursos</option>
              <option value="CLIENTE">Cliente</option>
              <option value="PERSONAL">Personal</option>
              <option value="EXTERNA">Externa</option>
              <option value="PLANIFICACION">Planificación</option>
            </select>
          </div>
          <div class="form-group">
            <label>Observación *</label>
            <textarea v-model="formInterrupcion.observacion" rows="4" required class="form-control"></textarea>
          </div>
          <div class="modal-footer">
            <button type="button" @click="modalEditarInterrupcion = false" class="btn btn-secondary">Cancelar</button>
            <button type="submit" class="btn btn-primary">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detalle-proyecto {
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 16px;
}

.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #e5e7eb;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  text-align: center;
  padding: 64px 24px;
}

.empty-state h2 {
  font-size: 24px;
  margin-bottom: 8px;
  color: #1f2937;
}

.empty-state p {
  color: #6b7280;
  margin-bottom: 24px;
}

.empty-state-small {
  text-align: center;
  padding: 48px 24px;
  color: #6b7280;
}

/* Header del proyecto */
.proyecto-header {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
}

.header-info h1 {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 12px;
}

.header-meta {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.cliente {
  color: #6b7280;
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* Estadísticas */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.stat-icon.bg-blue { background: #3b82f6; }
.stat-icon.bg-green { background: #10b981; }
.stat-icon.bg-red { background: #ef4444; }
.stat-icon.bg-orange { background: #f59e0b; }

.stat-info {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
}

/* Progreso */
.progress-section {
  margin-top: 24px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #6b7280;
}

.progress-percentage {
  font-weight: 600;
  color: #1f2937;
}

.progress-bar {
  height: 12px;
  background: #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #2563eb);
  transition: width 0.3s ease;
}

.progress-bar-small {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  flex: 1;
}

.progress-fill-small {
  height: 100%;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.progress-inline {
  display: flex;
  align-items: center;
  gap: 8px;
}

.progress-text {
  font-size: 13px;
  font-weight: 600;
  color: #6b7280;
  min-width: 40px;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 8px;
  border-bottom: 2px solid #e5e7eb;
  margin-bottom: 24px;
  overflow-x: auto;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
  margin-bottom: -2px;
}

.tab-button:hover {
  color: #3b82f6;
}

.tab-button.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.tab-button svg {
  flex-shrink: 0;
}

/* Tab content */
.tab-content {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.section-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

/* Info grid */
.info-grid {
  display: grid;
  gap: 24px;
}

.info-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.info-card h3 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.info-row {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.info-row:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 500;
  color: #6b7280;
  font-size: 14px;
}

.info-value {
  color: #1f2937;
  font-size: 14px;
}

/* Developers grid */
.developers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.developer-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  transition: all 0.2s;
}

.developer-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.developer-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
}

.developer-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: #3b82f6;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
}

.developer-info {
  flex: 1;
}

.developer-info h4 {
  font-size: 16px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.developer-role {
  font-size: 13px;
  color: #6b7280;
  margin-bottom: 2px;
}

.developer-email {
  font-size: 12px;
  color: #9ca3af;
}

/* Etapas */
.etapas-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.etapa-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 20px;
}

.etapa-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.etapa-number {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 18px;
  flex-shrink: 0;
}

.etapa-info {
  flex: 1;
}

.etapa-info h4 {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 8px;
}

.etapa-info p {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
}

.etapa-actions {
  display: flex;
  gap: 8px;
}

.etapa-errores {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.errores-count {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #ef4444;
  font-weight: 500;
}

/*Tabla */
.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.data-table thead {
  background: #f9fafb;
}

.data-table th {
  padding: 12px 16px;
  text-align: left;
  font-weight: 600;
  color: #6b7280;
  border-bottom: 2px solid #e5e7eb;
  white-space: nowrap;
}

.data-table td {
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
  color: #1f2937;
}

.data-table tbody tr:hover {
  background: #f9fafb;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.text-muted {
  color: #9ca3af;
  font-style: italic;
}

/* Badges */
.badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.badge-primary { background: #dbeafe; color: #1e40af; }
.badge-success { background: #d1fae5; color: #065f46; }
.badge-warning { background: #fef3c7; color: #92400e; }
.badge-danger { background: #fee2e2; color: #991b1b; }
.badge-info { background: #e0e7ff; color: #3730a3; }
.badge-secondary { background: #f3f4f6; color: #4b5563; }

/* Botones */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover {
  background: #2563eb;
}

.btn-secondary {
  background: #f3f4f6;
  color: #4b5563;
}

.btn-secondary:hover {
  background: #e5e7eb;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.btn-icon {
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #e5e7eb;
  color: #1f2937;
}

.btn-danger-icon {
  background: #fee2e2;
  color: #dc2626;
}

.btn-danger-icon:hover {
  background: #fecaca;
}

.btn-success-icon {
  background: #d1fae5;
  color: #059669;
}

.btn-success-icon:hover {
  background: #a7f3d0;
}

/* Modales */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 24px;
  animation: fadeIn 0.2s ease;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid #e5e7eb;
}

.modal-header h3 {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
}

.btn-close {
  width: 32px;
  height: 32px;
  border: none;
  background: #f3f4f6;
  color: #6b7280;
  border-radius: 6px;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-close:hover {
  background: #e5e7eb;
  color: #1f2937;
}

.modal-body {
  padding: 24px;
  overflow-y: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 20px;
  margin-top: 20px;
  border-top: 1px solid #e5e7eb;
}

/* Formularios */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  transition: all 0.2s;
}

.form-control:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.form-text {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #6b7280;
}

textarea.form-control {
  resize: vertical;
  min-height: 80px;
}

/* Responsive */
@media (max-width: 768px) {
  .detalle-proyecto {
    padding: 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 16px;
  }

  .header-actions {
    width: 100%;
  }

  .header-actions .btn {
    flex: 1;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .tabs {
    gap: 4px;
  }

  .tab-button {
    padding: 10px 12px;
    font-size: 13px;
  }

  .developers-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .table-container {
    overflow-x: scroll;
  }

  .data-table {
    min-width: 800px;
  }
}
</style>
