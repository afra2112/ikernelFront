<script setup>
import { authService } from '@/services/authService';


const logout = async () => {
    try {
        await authService.logout();
        window.location.href = "/login"; 
    } catch (e) {
        console.log(e);
    }
}

const getRoleName = (tipo) => {
  const roles = {
    coordinador: 'Coordinador',
    lider: 'Líder de Proyecto',
    desarrollador: 'Desarrollador'
  }
  return roles[tipo] || tipo
}

</script>

<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>IKernell</h2>
        <p class="user-info">{{ currentUser?.nombre }}</p>
        <span class="badge badge-info">{{ getRoleName(currentUser?.tipo) }}</span>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <h3>General</h3>
          <router-link to="/dashboard" class="nav-item">
            <span>📊</span> Dashboard
          </router-link>
          <router-link to="/dashboard/correo" class="nav-item">
            <span>📧</span> Correo
          </router-link>
          <router-link to="/dashboard/chat" class="nav-item">
            <span>💬</span> Chat
          </router-link>
          <router-link to="/dashboard/biblioteca" class="nav-item">
            <span>📚</span> Biblioteca
          </router-link>
          <router-link to="/dashboard/tutoriales" class="nav-item">
            <span>🎓</span> Tutoriales
          </router-link>
        </div>

        <div v-if="currentUser?.tipo === 'coordinador'" class="nav-section">
          <h3>Coordinador</h3>
          <router-link to="/dashboard/registrar-desarrollador" class="nav-item">
            <span>➕</span> Registrar Desarrollador
          </router-link>
          <router-link to="/dashboard/desarrolladores" class="nav-item">
            <span>👥</span> Desarrolladores
          </router-link>
        </div>

        <div v-if="['coordinador', 'lider'].includes(currentUser?.tipo)" class="nav-section">
          <h3>Proyectos</h3>
          <router-link to="/dashboard/registrar-proyecto" class="nav-item">
            <span>➕</span> Registrar Proyecto
          </router-link>
          <router-link to="/dashboard/proyectos" class="nav-item">
            <span>📁</span> Proyectos
          </router-link>
          <router-link to="/dashboard/generar-archivo-plano" class="nav-item">
            <span>📄</span> Archivo Plano
          </router-link>
        </div>

        <div class="nav-section">
          <h3>Desarrollo</h3>
          <router-link to="/dashboard/mis-actividades" class="nav-item">
            <span>✓</span> Mis Actividades
          </router-link>
          <router-link to="/dashboard/registrar-errores" class="nav-item">
            <span>🐛</span> Registrar Errores
          </router-link>
          <router-link to="/dashboard/registrar-interrupciones" class="nav-item">
            <span>⚠️</span> Interrupciones
          </router-link>
        </div>
      </nav>

      <div class="sidebar-footer">
        <form @submit="logout">
            <button type="submit" class="btn btn-outline" style="width: 100%">
                Cerrar Sesión
            </button>
        </form>
      </div>
    </aside>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 280px;
  background: var(--surface);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  overflow-y: auto;
}

.sidebar-header {
  padding: 24px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h2 {
  color: var(--primary-color);
  margin-bottom: 8px;
}

.user-info {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.sidebar-nav {
  flex: 1;
  padding: 16px;
}

.nav-section {
  margin-bottom: 24px;
}

.nav-section h3 {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 8px;
  padding: 0 12px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  color: var(--text-primary);
  text-decoration: none;
  border-radius: 6px;
  transition: background-color 0.2s;
  margin-bottom: 4px;
}

.nav-item:hover {
  background-color: var(--background);
}

.nav-item.router-link-active {
  background-color: var(--primary-color);
  color: white;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid var(--border-color);
}

.main-content {
  flex: 1;
  margin-left: 280px;
  padding: 32px;
  background: var(--background);
}
</style>