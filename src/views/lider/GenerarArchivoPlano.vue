<template>
  <div>
    <h1>Generar Archivo Plano</h1>
    <p class="subtitle">Exportar información de proyectos para empresa brasileña</p>

    <div class="card mt-4">
      <h2>Seleccionar Proyectos</h2>
      <div class="form-group">
        <label class="form-label">Filtrar por estado</label>
        <select v-model="filtroEstado" class="form-select">
          <option value="">Todos</option>
          <option value="En Planificación">En Planificación</option>
          <option value="En Desarrollo">En Desarrollo</option>
          <option value="En Pruebas">En Pruebas</option>
          <option value="Completado">Completado</option>
        </select>
      </div>

      <div class="proyectos-seleccion">
        <div v-for="proyecto in proyectosFiltrados" :key="proyecto.id" class="proyecto-check">
          <label>
            <input type="checkbox" :value="proyecto.id" v-model="proyectosSeleccionados">
            <span>{{ proyecto.nombre }} - {{ proyecto.cliente }}</span>
            <span :class="['badge', getEstadoBadge(proyecto.estado)]">{{ proyecto.estado }}</span>
          </label>
        </div>
      </div>

      <div v-if="proyectosFiltrados.length === 0" class="text-center" style="padding: 40px;">
        <p style="color: var(--text-secondary)">No hay proyectos disponibles</p>
      </div>
    </div>

    <div class="card mt-4">
      <h2>Opciones de Exportación</h2>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="incluirActividades">
          Incluir actividades del proyecto
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="incluirDesarrolladores">
          Incluir desarrolladores asignados
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="incluirInterrupciones">
          Incluir interrupciones
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="incluirErrores">
          Incluir errores reportados
        </label>
      </div>
    </div>

    <div class="card mt-4">
      <h2>Vista Previa</h2>
      <div class="preview-box">
        <pre>{{ vistaPrevia }}</pre>
      </div>
    </div>

    <div class="flex gap-2 mt-4">
      <button @click="generarArchivo" class="btn btn-primary" :disabled="proyectosSeleccionados.length === 0">
        📄 Generar Archivo Plano
      </button>
      <button @click="generarJSON" class="btn btn-success" :disabled="proyectosSeleccionados.length === 0">
        📋 Generar JSON
      </button>
      <button @click="generarCSV" class="btn btn-secondary" :disabled="proyectosSeleccionados.length === 0">
        📊 Generar CSV
      </button>
    </div>

    <div v-if="mensaje" class="alert alert-success mt-4">
      {{ mensaje }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storageService } from '../../services/storageService'

const proyectos = ref([])
const proyectosSeleccionados = ref([])
const filtroEstado = ref('')
const incluirActividades = ref(true)
const incluirDesarrolladores = ref(true)
const incluirInterrupciones = ref(false)
const incluirErrores = ref(false)
const mensaje = ref('')

const proyectosFiltrados = computed(() => {
  if (!filtroEstado.value) return proyectos.value
  return proyectos.value.filter(p => p.estado === filtroEstado.value)
})

const vistaPrevia = computed(() => {
  if (proyectosSeleccionados.value.length === 0) {
    return 'Selecciona al menos un proyecto para ver la vista previa...'
  }

  const proyectosData = proyectos.value.filter(p => 
    proyectosSeleccionados.value.includes(p.id)
  )

  let preview = 'REPORTE DE PROYECTOS - IKERNELL SOLUCIONES\n'
  preview += '='.repeat(50) + '\n\n'

  proyectosData.forEach(proyecto => {
    preview += `PROYECTO: ${proyecto.nombre}\n`
    preview += `CLIENTE: ${proyecto.cliente}\n`
    preview += `ESTADO: ${proyecto.estado}\n`
    preview += `FECHA INICIO: ${proyecto.fechaInicio}\n`
    preview += `FECHA ENTREGA: ${proyecto.fechaEntrega}\n`
    preview += `PRESUPUESTO: $${proyecto.presupuesto}\n`
    preview += `PRIORIDAD: ${proyecto.prioridad}\n`
    
    if (incluirDesarrolladores.value && proyecto.desarrolladores) {
      preview += `DESARROLLADORES: ${proyecto.desarrolladores.length}\n`
    }
    
    if (incluirActividades.value) {
      const actividades = storageService.getActividadesByProyecto(proyecto.id)
      preview += `ACTIVIDADES: ${actividades.length}\n`
    }
    
    preview += '-'.repeat(50) + '\n\n'
  })

  return preview
})

const getEstadoBadge = (estado) => {
  const badges = {
    'En Planificación': 'badge-info',
    'En Desarrollo': 'badge-warning',
    'En Pruebas': 'badge-warning',
    'Completado': 'badge-success'
  }
  return badges[estado] || 'badge-info'
}

const generarArchivo = () => {
  const contenido = generarContenido()
  descargarArchivo(contenido, 'reporte-proyectos.txt', 'text/plain')
  mensaje.value = 'Archivo plano generado exitosamente'
  setTimeout(() => mensaje.value = '', 3000)
}

const generarJSON = () => {
  const proyectosData = proyectos.value.filter(p => 
    proyectosSeleccionados.value.includes(p.id)
  ).map(proyecto => {
    const data = { ...proyecto }
    
    if (incluirActividades.value) {
      data.actividades = storageService.getActividadesByProyecto(proyecto.id)
    }
    
    if (incluirInterrupciones.value) {
      data.interrupciones = storageService.getInterrupcionesByProyecto(proyecto.id)
    }
    
    return data
  })

  const contenido = JSON.stringify(proyectosData, null, 2)
  descargarArchivo(contenido, 'reporte-proyectos.json', 'application/json')
  mensaje.value = 'Archivo JSON generado exitosamente'
  setTimeout(() => mensaje.value = '', 3000)
}

const generarCSV = () => {
  let csv = 'Proyecto,Cliente,Estado,Fecha Inicio,Fecha Entrega,Presupuesto,Prioridad\n'
  
  const proyectosData = proyectos.value.filter(p => 
    proyectosSeleccionados.value.includes(p.id)
  )

  proyectosData.forEach(p => {
    csv += `"${p.nombre}","${p.cliente}","${p.estado}","${p.fechaInicio}","${p.fechaEntrega}","${p.presupuesto}","${p.prioridad}"\n`
  })

  descargarArchivo(csv, 'reporte-proyectos.csv', 'text/csv')
  mensaje.value = 'Archivo CSV generado exitosamente'
  setTimeout(() => mensaje.value = '', 3000)
}

const generarContenido = () => {
  const proyectosData = proyectos.value.filter(p => 
    proyectosSeleccionados.value.includes(p.id)
  )

  let contenido = 'REPORTE DE PROYECTOS - IKERNELL SOLUCIONES\n'
  contenido += 'EXPORTACION PARA EMPRESA BRASILEÑA\n'
  contenido += '='.repeat(70) + '\n\n'
  contenido += `FECHA DE GENERACION: ${new Date().toLocaleString('es')}\n`
  contenido += `TOTAL PROYECTOS: ${proyectosData.length}\n\n`

  proyectosData.forEach((proyecto, index) => {
    contenido += `\n${'='.repeat(70)}\n`
    contenido += `PROYECTO ${index + 1}\n`
    contenido += `${'='.repeat(70)}\n\n`
    contenido += `NOMBRE: ${proyecto.nombre}\n`
    contenido += `CLIENTE: ${proyecto.cliente}\n`
    contenido += `ESTADO: ${proyecto.estado}\n`
    contenido += `DESCRIPCION: ${proyecto.descripcion}\n`
    contenido += `OBJETIVOS: ${proyecto.objetivos}\n`
    contenido += `FECHA INICIO: ${proyecto.fechaInicio}\n`
    contenido += `FECHA ENTREGA: ${proyecto.fechaEntrega}\n`
    contenido += `PRESUPUESTO: $${proyecto.presupuesto}\n`
    contenido += `PRIORIDAD: ${proyecto.prioridad}\n`
    contenido += `TECNOLOGIAS: ${proyecto.tecnologias || 'N/A'}\n`

    if (incluirDesarrolladores.value && proyecto.desarrolladores) {
      contenido += `\nDESARROLLADORES ASIGNADOS: ${proyecto.desarrolladores.length}\n`
      proyecto.desarrolladores.forEach(devId => {
        const dev = storageService.getDesarrolladorById(devId)
        if (dev) {
          contenido += `  - ${dev.nombre} ${dev.apellido} (${dev.especialidad})\n`
        }
      })
    }

    if (incluirActividades.value) {
      const actividades = storageService.getActividadesByProyecto(proyecto.id)
      contenido += `\nACTIVIDADES: ${actividades.length}\n`
      actividades.forEach(act => {
        contenido += `  - ${act.nombre} | Estado: ${act.estado} | Progreso: ${act.progreso || 0}%\n`
      })
    }

    if (incluirInterrupciones.value) {
      const interrupciones = storageService.getInterrupcionesByProyecto(proyecto.id)
      contenido += `\nINTERRUPCIONES: ${interrupciones.length}\n`
      interrupciones.forEach(int => {
        contenido += `  - ${int.tipo} | Fase: ${int.fase} | Duracion: ${int.duracion}h\n`
      })
    }

    contenido += '\n'
  })

  contenido += `\n${'='.repeat(70)}\n`
  contenido += 'FIN DEL REPORTE\n'
  contenido += `${'='.repeat(70)}\n`

  return contenido
}

const descargarArchivo = (contenido, nombre, tipo) => {
  const blob = new Blob([contenido], { type: tipo })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = nombre
  a.click()
  URL.revokeObjectURL(url)
}

onMounted(() => {
  proyectos.value = storageService.getProyectos().filter(p => p.activo)
})
</script>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  margin-top: 8px;
}

.proyectos-seleccion {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
}

.proyecto-check label {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--background);
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.proyecto-check label:hover {
  background: var(--border-color);
}

.proyecto-check input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.preview-box {
  background: var(--background);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 16px;
  max-height: 400px;
  overflow-y: auto;
  margin-top: 16px;
}

.preview-box pre {
  margin: 0;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
