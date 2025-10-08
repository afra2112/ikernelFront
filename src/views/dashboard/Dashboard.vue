<script setup>
import { ref, onMounted, computed } from 'vue'
import { authService } from '../../services/authService'
import { proyectoService } from '@/services/proyectoService'
import { actividadService } from '@/services/actividadService'
import { usuarioService } from '@/services/usuarioService'

onMounted(async () => {
  try {
    const { data } = await authService.currentUser();
    console.log("Usuario autenticado:", data);
  } catch (e) {
    console.warn("No autenticado");
  }
});

const proyectos = ref([])
const desarrolladores = ref([])
const actividades = ref([])

const getRoleName = (tipo) => {
  const roles = {
    coordinador: 'Coordinador de Proyectos',
    lider: 'Líder de Proyectos',
    desarrollador: 'Desarrollador'
  }
  return roles[tipo] || tipo
}

onMounted(async () => {
    try {
        const [proyectosRes, actividadesRes, desarrolladoresRes] = await Promise.all([
            proyectoService.listarProyectos,
            actividadService.obtenerActivades,
            usuarioService.obtenerDesarrolladores
        ]);

        proyectos.value = proyectosRes.data;
        actividades.value = actividadesRes.data;
        desarrolladores.value = desarrolladoresRes.data;

    } catch (e) {
        console.log('ERROR Al obtener los datos del back: ', e);
    }
})
</script>

<template>
  <div>
    <h1>Bienvenido, {{ currentUser?.nombre }}</h1>
    <p class="subtitle">Panel de control - {{ getRoleName(currentUser?.tipo) }}</p>

    <div class="grid grid-3 mt-4">
      <div class="card stat-card">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <h3>{{ proyectos.length }}</h3>
          <p>Proyectos Activos</p>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <h3>{{ desarrolladores.length }}</h3>
          <p>Desarrolladores</p>
        </div>
      </div>

      <div class="card stat-card">
        <div class="stat-icon">✓</div>
        <div class="stat-content">
          <h3>{{ actividades.length }}</h3>
          <p>Actividades</p>
        </div>
      </div>
    </div>

    <div class="grid grid-2 mt-4">
      <div class="card">
        <h2>Accesos Rápidos</h2>
        <div class="quick-links">
          <router-link v-if="['coordinador', 'lider'].includes(currentUser?.tipo)" 
                       to="/dashboard/proyectos" class="quick-link">
            <span>📁</span> Ver Proyectos
          </router-link>
          <router-link to="/dashboard/mis-actividades" class="quick-link">
            <span>✓</span> Mis Actividades
          </router-link>
          <router-link to="/dashboard/correo" class="quick-link">
            <span>📧</span> Correo
          </router-link>
          <router-link to="/dashboard/chat" class="quick-link">
            <span>💬</span> Chat
          </router-link>
        </div>
      </div>

      <div class="card">
        <h2>Actividad Reciente</h2>
        <div class="activity-list">
          <div class="activity-item">
            <span class="activity-icon">📝</span>
            <div>
              <p><strong>Nueva actividad asignada</strong></p>
              <small>Hace 2 horas</small>
            </div>
          </div>
          <div class="activity-item">
            <span class="activity-icon">✓</span>
            <div>
              <p><strong>Actividad completada</strong></p>
              <small>Hace 5 horas</small>
            </div>
          </div>
          <div class="activity-item">
            <span class="activity-icon">👥</span>
            <div>
              <p><strong>Nuevo miembro en el equipo</strong></p>
              <small>Ayer</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtitle {
  color: var(--text-secondary);
  font-size: 16px;
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

.quick-links {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.quick-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--background);
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s;
}

.quick-link:hover {
  background: var(--primary-color);
  color: white;
}

.activity-list {
  margin-top: 16px;
}

.activity-item {
  display: flex;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
}

.activity-item:last-child {
  border-bottom: none;
}

.activity-icon {
  font-size: 24px;
}

.activity-item p {
  margin-bottom: 4px;
}

.activity-item small {
  color: var(--text-secondary);
}
</style>