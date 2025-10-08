<script setup>
import { authService } from '@/services/authService';
import { ref } from 'vue';

const username = ref("");
const password = ref("");
const error = ref(null);

const login = async () => {
  error.value = null;
  try {
    await authService.login(username.value, password.value);
    window.location.href = "/dashboard"; 
  } catch (e) {
    error.value = "Correo o contrasena incorrectos.";
  }
}

</script>

<template>
  <div class="login-page">
    <div class="login-container">
      <div class="card login-card">
        <h1>Iniciar Sesión</h1>
        <p class="login-subtitle">Accede al sistema de IKernell Soluciones</p>
        
        <form @submit.prevent="login">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="username" type="email" class="form-input" placeholder="tu@email.com"required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Contraseña</label>
            <input v-model="password" type="password" class="form-input" placeholder="••••••••"required>
          </div>

          <div v-if="error" class="alert alert-error">
            {{ error }}
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-container {
  width: 100%;
  max-width: 450px;
  padding: 20px;
}

.login-card {
  box-shadow: var(--shadow-lg);
}

h1 {
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 8px;
}

.login-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 32px;
}
</style>
