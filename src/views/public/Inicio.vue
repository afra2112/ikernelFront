<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1>Soluciones de Software Innovadoras</h1>
        <p class="hero-subtitle">
          Transformamos tus ideas en realidad con tecnología de vanguardia
        </p>
        <div class="hero-actions">
          <router-link to="/portafolio" class="btn btn-primary">Ver Portafolio</router-link>
          <router-link to="/contacto" class="btn btn-outline">Contáctanos</router-link>
        </div>
      </div>
    </section>

    <section class="features">
      <div class="container">
        <h2 class="text-center mb-4">¿Por qué elegirnos?</h2>
        <div class="grid grid-3">
          <div class="feature-card">
            <div class="feature-icon">🚀</div>
            <h3>Innovación</h3>
            <p>Utilizamos las últimas tecnologías para crear soluciones modernas y eficientes</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">👥</div>
            <h3>Equipo Experto</h3>
            <p>Contamos con profesionales altamente capacitados en diversas áreas</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">⚡</div>
            <h3>Agilidad</h3>
            <p>Entregamos proyectos de calidad en tiempos óptimos</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container text-center">
        <h2>¿Listo para comenzar tu proyecto?</h2>
        <p>Contáctanos hoy y descubre cómo podemos ayudarte</p>
        <router-link to="/contacto" class="btn btn-primary">Iniciar Proyecto</router-link>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 100px 0;
  text-align: center;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 32px;
  opacity: 0.9;
}

.hero-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
}

.features {
  padding: 80px 0;
}

.feature-card {
  text-align: center;
  padding: 32px;
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.feature-card h3 {
  margin-bottom: 12px;
  color: var(--primary-color);
}

.cta {
  background: var(--background);
  padding: 80px 0;
}

.cta h2 {
  margin-bottom: 16px;
}

.cta p {
  margin-bottom: 32px;
  font-size: 18px;
  color: var(--text-secondary);
}
</style>
