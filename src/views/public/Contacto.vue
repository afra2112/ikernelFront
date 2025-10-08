<template>
  <div class="container">
    <div class="grid grid-2">
      <div class="card">
        <h1>Contáctanos</h1>
        <p class="mb-4">Estamos aquí para ayudarte. Envíanos un mensaje y te responderemos pronto.</p>
        
        <form @submit.prevent="enviarMensaje">
          <div class="form-group">
            <label class="form-label">Nombre Completo</label>
            <input v-model="formData.nombre" type="text" class="form-input" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="formData.email" type="email" class="form-input" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Teléfono</label>
            <input v-model="formData.telefono" type="tel" class="form-input">
          </div>
          
          <div class="form-group">
            <label class="form-label">Asunto</label>
            <input v-model="formData.asunto" type="text" class="form-input" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Mensaje</label>
            <textarea v-model="formData.mensaje" class="form-textarea" required></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
        </form>

        <div v-if="mensaje" class="alert alert-success mt-4">
          {{ mensaje }}
        </div>
      </div>

      <div>
        <div class="card">
          <h2>Información de Contacto</h2>
          
          <div class="info-item">
            <div class="info-icon">📍</div>
            <div>
              <h3>Dirección</h3>
              <p>Calle Principal #123<br>Ciudad, País</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">📞</div>
            <div>
              <h3>Teléfono</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">📧</div>
            <div>
              <h3>Email</h3>
              <p>contacto@ikernell.com</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">🕐</div>
            <div>
              <h3>Horario</h3>
              <p>Lunes a Viernes: 9:00 AM - 6:00 PM<br>Sábados: 10:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>

        <div class="card">
          <h2>Síguenos</h2>
          <div class="social-links">
            <a href="#" class="social-link">LinkedIn</a>
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">Facebook</a>
            <a href="#" class="social-link">Instagram</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: ''
})

const mensaje = ref('')

const enviarMensaje = () => {
  // Simular envío
  mensaje.value = 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.'
  
  formData.value = {
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  }

  setTimeout(() => {
    mensaje.value = ''
  }, 5000)
}
</script>

<style scoped>
h1, h2 {
  color: var(--primary-color);
  margin-bottom: 16px;
}

.info-item {
  display: flex;
  gap: 16px;
  padding: 20px 0;
  border-bottom: 1px solid var(--border-color);
}

.info-item:last-child {
  border-bottom: none;
}

.info-icon {
  font-size: 32px;
}

.info-item h3 {
  margin-bottom: 4px;
  font-size: 16px;
}

.info-item p {
  color: var(--text-secondary);
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.social-link {
  padding: 8px 16px;
  background: var(--background);
  border-radius: 6px;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s;
}

.social-link:hover {
  background: var(--primary-color);
  color: white;
}
</style>