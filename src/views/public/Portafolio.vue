<template>
  <div class="container">
    <h1 class="text-center mb-4">Portafolio de Servicios</h1>
    
    <div class="grid grid-2">
      <div class="card service-card">
        <div class="service-icon">💻</div>
        <h3>Desarrollo Web</h3>
        <p>Aplicaciones web modernas y responsivas utilizando las últimas tecnologías</p>
        <ul class="tech-list">
          <li>Vue.js, React, Angular</li>
          <li>Node.js, Python, Java</li>
          <li>Bases de datos SQL y NoSQL</li>
        </ul>
      </div>

      <div class="card service-card">
        <div class="service-icon">📱</div>
        <h3>Desarrollo Móvil</h3>
        <p>Aplicaciones nativas e híbridas para iOS y Android</p>
        <ul class="tech-list">
          <li>React Native, Flutter</li>
          <li>Swift, Kotlin</li>
          <li>Integración con APIs</li>
        </ul>
      </div>

      <div class="card service-card">
        <div class="service-icon">☁️</div>
        <h3>Soluciones Cloud</h3>
        <p>Migración y desarrollo de aplicaciones en la nube</p>
        <ul class="tech-list">
          <li>AWS, Azure, Google Cloud</li>
          <li>Arquitecturas escalables</li>
          <li>DevOps y CI/CD</li>
        </ul>
      </div>

      <div class="card service-card">
        <div class="service-icon">🤖</div>
        <h3>Inteligencia Artificial</h3>
        <p>Soluciones de IA y Machine Learning personalizadas</p>
        <ul class="tech-list">
          <li>Análisis predictivo</li>
          <li>Procesamiento de lenguaje natural</li>
          <li>Visión por computadora</li>
        </ul>
      </div>

      <div class="card service-card">
        <div class="service-icon">🔒</div>
        <h3>Ciberseguridad</h3>
        <p>Protección y auditoría de sistemas informáticos</p>
        <ul class="tech-list">
          <li>Análisis de vulnerabilidades</li>
          <li>Implementación de seguridad</li>
          <li>Cumplimiento normativo</li>
        </ul>
      </div>

      <div class="card service-card">
        <div class="service-icon">📊</div>
        <h3>Business Intelligence</h3>
        <p>Análisis de datos y visualización de información</p>
        <ul class="tech-list">
          <li>Dashboards interactivos</li>
          <li>Reportes automatizados</li>
          <li>Data warehousing</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: var(--primary-color);
}

.service-card {
  text-align: center;
  transition: transform 0.2s;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.service-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.service-card h3 {
  color: var(--primary-color);
  margin-bottom: 12px;
}

.service-card p {
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.tech-list {
  list-style: none;
  padding: 0;
  text-align: left;
}

.tech-list li {
  padding: 8px 0;
  color: var(--text-secondary);
  font-size: 14px;
}

.tech-list li::before {
  content: "✓ ";
  color: var(--success-color);
  font-weight: bold;
  margin-right: 8px;
}
</style>
