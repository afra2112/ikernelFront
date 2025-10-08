<template>
  <div>
    <h1>Correo Electrónico Corporativo</h1>
    
    <div class="grid" style="grid-template-columns: 250px 1fr;">
      <div class="card">
        <button class="btn btn-primary" style="width: 100%; margin-bottom: 16px">
          ✉️ Nuevo Correo
        </button>
        
        <nav class="mail-nav">
          <a href="#" class="mail-nav-item active">📥 Bandeja de entrada</a>
          <a href="#" class="mail-nav-item">📤 Enviados</a>
          <a href="#" class="mail-nav-item">📝 Borradores</a>
          <a href="#" class="mail-nav-item">🗑️ Papelera</a>
        </nav>
      </div>

      <div class="card">
        <h2>Bandeja de Entrada</h2>
        <div class="mail-list">
          <div v-for="mail in correos" :key="mail.id" class="mail-item">
            <div class="mail-from">{{ mail.de }}</div>
            <div class="mail-subject">{{ mail.asunto }}</div>
            <div class="mail-preview">{{ mail.preview }}</div>
            <div class="mail-date">{{ mail.fecha }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const correos = ref([
  {
    id: 1,
    de: 'Juan Pérez',
    asunto: 'Reunión de proyecto',
    preview: 'Hola equipo, necesitamos coordinar una reunión para revisar el avance...',
    fecha: 'Hoy 10:30'
  },
  {
    id: 2,
    de: 'María García',
    asunto: 'Actualización de requisitos',
    preview: 'Se han actualizado los requisitos del proyecto X, por favor revisen...',
    fecha: 'Ayer 15:20'
  },
  {
    id: 3,
    de: 'Carlos López',
    asunto: 'Reporte semanal',
    preview: 'Adjunto el reporte de actividades de esta semana...',
    fecha: '2 días'
  }
])
</script>

<style scoped>
.mail-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mail-nav-item {
  padding: 10px 12px;
  text-decoration: none;
  color: var(--text-primary);
  border-radius: 6px;
  transition: background-color 0.2s;
}

.mail-nav-item:hover {
  background: var(--background);
}

.mail-nav-item.active {
  background: var(--primary-color);
  color: white;
}

.mail-list {
  margin-top: 16px;
}

.mail-item {
  padding: 16px;
  border-bottom: 1px solid var(--border-color);
  cursor: pointer;
  transition: background-color 0.2s;
}

.mail-item:hover {
  background: var(--background);
}

.mail-from {
  font-weight: 600;
  margin-bottom: 4px;
}

.mail-subject {
  color: var(--text-primary);
  margin-bottom: 4px;
}

.mail-preview {
  color: var(--text-secondary);
  font-size: 14px;
  margin-bottom: 8px;
}

.mail-date {
  font-size: 12px;
  color: var(--text-secondary);
}
</style>
