<template>
  <div class="container">
    <div class="card">
      <h1>Lineamientos de la Empresa</h1>
      
      <section class="lineamiento-section">
        <h2>Misión</h2>
        <p>
          Proporcionar soluciones de software innovadoras y de alta calidad que impulsen 
          el crecimiento y la transformación digital de nuestros clientes.
        </p>
      </section>

      <section class="lineamiento-section">
        <h2>Visión</h2>
        <p>
          Ser reconocidos como líderes en el desarrollo de software a nivel internacional, 
          destacando por nuestra excelencia técnica y compromiso con la innovación.
        </p>
      </section>

      <section class="lineamiento-section">
        <h2>Valores</h2>
        <ul class="valores-list">
          <li><strong>Excelencia:</strong> Buscamos la perfección en cada proyecto</li>
          <li><strong>Innovación:</strong> Adoptamos nuevas tecnologías y metodologías</li>
          <li><strong>Integridad:</strong> Actuamos con honestidad y transparencia</li>
          <li><strong>Colaboración:</strong> Trabajamos en equipo para lograr objetivos comunes</li>
          <li><strong>Compromiso:</strong> Cumplimos nuestras promesas con dedicación</li>
        </ul>
      </section>

      <section class="lineamiento-section">
        <h2>Políticas de Calidad</h2>
        <ul class="valores-list">
          <li>Cumplimiento de estándares internacionales de desarrollo</li>
          <li>Revisión continua de código y pruebas exhaustivas</li>
          <li>Documentación completa de todos los proyectos</li>
          <li>Capacitación constante del equipo de desarrollo</li>
          <li>Atención personalizada al cliente</li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: var(--primary-color);
  margin-bottom: 32px;
}

.lineamiento-section {
  margin-bottom: 32px;
}

.lineamiento-section h2 {
  color: var(--text-primary);
  margin-bottom: 16px;
  font-size: 24px;
}

.lineamiento-section p {
  line-height: 1.8;
  color: var(--text-secondary);
}

.valores-list {
  list-style: none;
  padding-left: 0;
}

.valores-list li {
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);
  line-height: 1.6;
}

.valores-list li:last-child {
  border-bottom: none;
}
</style>
