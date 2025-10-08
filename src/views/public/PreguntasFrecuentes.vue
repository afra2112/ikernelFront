<template>
  <div class="container">
    <div class="card">
      <h1>Preguntas Frecuentes</h1>
      
      <div class="faq-list">
        <div class="faq-item" v-for="faq in faqs" :key="faq.id">
          <h3 class="faq-question" @click="toggleFaq(faq.id)">
            <span>{{ faq.pregunta }}</span>
            <span class="faq-icon">{{ faq.abierta ? '−' : '+' }}</span>
          </h3>
          <div v-show="faq.abierta" class="faq-answer">
            {{ faq.respuesta }}
          </div>
        </div>
      </div>

      <div class="pregunta-form">
        <h2>¿Tienes otra pregunta?</h2>
        <p>Envíanos tu consulta y te responderemos a la brevedad</p>
        
        <form @submit.prevent="enviarPregunta">
          <div class="form-group">
            <label class="form-label">Nombre</label>
            <input v-model="formData.nombre" type="text" class="form-input" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Email</label>
            <input v-model="formData.email" type="email" class="form-input" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Pregunta</label>
            <textarea v-model="formData.pregunta" class="form-textarea" required></textarea>
          </div>
          
          <button type="submit" class="btn btn-primary">Enviar Pregunta</button>
        </form>

        <div v-if="mensaje" :class="['alert', mensajeTipo === 'success' ? 'alert-success' : 'alert-error']">
          {{ mensaje }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    id: 1,
    pregunta: '¿Qué tecnologías utilizan para el desarrollo?',
    respuesta: 'Utilizamos las tecnologías más modernas y demandadas del mercado, incluyendo Vue.js, React, Node.js, Python, Java, y bases de datos SQL y NoSQL. Seleccionamos la mejor tecnología según las necesidades específicas de cada proyecto.',
    abierta: false
  },
  {
    id: 2,
    pregunta: '¿Cuánto tiempo toma desarrollar un proyecto?',
    respuesta: 'El tiempo de desarrollo varía según la complejidad del proyecto. Un proyecto pequeño puede tomar de 2-4 semanas, mientras que proyectos más complejos pueden requerir varios meses. Proporcionamos estimaciones detalladas después de analizar los requisitos.',
    abierta: false
  },
  {
    id: 3,
    pregunta: '¿Ofrecen soporte post-lanzamiento?',
    respuesta: 'Sí, ofrecemos diferentes planes de soporte y mantenimiento post-lanzamiento. Esto incluye corrección de errores, actualizaciones de seguridad, y mejoras continuas según las necesidades del cliente.',
    abierta: false
  },
  {
    id: 4,
    pregunta: '¿Trabajan con metodologías ágiles?',
    respuesta: 'Sí, utilizamos metodologías ágiles como Scrum y Kanban para garantizar entregas incrementales, transparencia en el proceso y adaptabilidad a cambios. Mantenemos comunicación constante con nuestros clientes.',
    abierta: false
  },
  {
    id: 5,
    pregunta: '¿Pueden trabajar con mi equipo existente?',
    respuesta: 'Absolutamente. Podemos integrarnos con tu equipo existente, ya sea complementando capacidades específicas o liderando el desarrollo completo. Nos adaptamos a tus procesos y herramientas.',
    abierta: false
  }
])

const formData = ref({
  nombre: '',
  email: '',
  pregunta: ''
})

const mensaje = ref('')
const mensajeTipo = ref('success')

const toggleFaq = (id) => {
  const faq = faqs.value.find(f => f.id === id)
  if (faq) {
    faq.abierta = !faq.abierta
  }
}

const enviarPregunta = () => {
  storageService.savePregunta(formData.value)
  mensaje.value = 'Tu pregunta ha sido enviada correctamente. Te responderemos pronto.'
  mensajeTipo.value = 'success'
  
  formData.value = {
    nombre: '',
    email: '',
    pregunta: ''
  }

  setTimeout(() => {
    mensaje.value = ''
  }, 5000)
}
</script>

<style scoped>
h1 {
  color: var(--primary-color);
  margin-bottom: 32px;
}

.faq-list {
  margin-bottom: 48px;
}

.faq-item {
  border-bottom: 1px solid var(--border-color);
  padding: 16px 0;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: var(--text-primary);
  font-size: 18px;
  margin: 0;
  padding: 8px 0;
}

.faq-question:hover {
  color: var(--primary-color);
}

.faq-icon {
  font-size: 24px;
  color: var(--primary-color);
}

.faq-answer {
  padding: 16px 0;
  color: var(--text-secondary);
  line-height: 1.6;
}

.pregunta-form {
  margin-top: 48px;
  padding-top: 48px;
  border-top: 2px solid var(--border-color);
}

.pregunta-form h2 {
  margin-bottom: 8px;
}

.pregunta-form > p {
  color: var(--text-secondary);
  margin-bottom: 24px;
}
</style>
