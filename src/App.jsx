import React, { useState, useEffect } from 'react';
import './App.css'; 

const App = () => {
  const [showToast, setShowToast] = useState(false);
  
  // 1. Estado para el modo oscuro (por defecto lo ponemos falso/claro)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 2. Efecto para aplicar el tema al documento HTML cada vez que cambie el estado
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ernesto.loperena.f@gmail.com')
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch((err) => console.error('Error al copiar el correo: ', err));
  };

  // Función para cambiar el tema
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
      <div className="app-container container-fluid py-4 py-md-5">
      <div className="row g-2 max-width-wrapper">
        
        {/* COLUMNA IZQUIERDA: Perfil y Habilidades (Fija/Sticky en desktop) */}
        <aside className="col-lg-4 col-xl-3">
          <div className="card profile-card position-sticky border-0 shadow-sm p-4 text-center text-lg-start">
            <div className="d-flex flex-column align-items-center align-items-lg-start">
              <div className="profile-img-container mb-3">
                <img className="img-fluid rounded-circle" src="assets/img/profile.jpg" alt="Ernesto Loperena" />
              </div>
              <h1 className="h3 fw-bold mb-1 title-name">Ernesto Guadalupe</h1>
              <h2 className="h4 fw-bold text-gradient mb-3">Loperena Flores</h2>
              <div className="badge bg-soft-primary text-primary mb-4 px-3 py-2 rounded-pill fw-semibold">
                Desarrollador Backend
              </div>
            </div>

            <p className="text-muted small mb-4 text-center text-lg-start">
              Enfocado en el diseño y construcción de APIs REST y microservicios con Java y Spring Boot. Mi enfoque principal está en el desarrollo de soluciones escalables y eficientes, con un dominio sólido en persistencia de datos utilizando JPA / Hibernate y bases de datos SQL. 
            </p>
            <p className="text-muted small mb-4 text-center text-lg-start">
              Trabajo con Git para el control de versiones. Adicionalmente, cuento con conocimientos en Python, lo que me permite crear herramientas complementarias de automatización y optimización de datos cuando el proyecto lo requiere.
            </p>

            {/* Redes Sociales, Contacto y Controles */}
            <div className="d-flex justify-content-center justify-content-lg-start gap-2 mb-3">
              
              {/* NUEVO BOTÓN DE MODO OSCURO */}
              {/*<button className="btn btn-social" onClick={toggleTheme} title="Cambiar tema">
                {isDarkMode ? <i className="fas fa-sun text-warning"></i> : <i className="fas fa-moon"></i>}
              </button>*/}

              <a className="btn btn-social" href="https://www.linkedin.com/in/loperena-flores-ernesto-guadalupe-9aa47a305/" target="_blank" rel="noreferrer" title="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a className="btn btn-social" href="https://github.com/loperenafloresernestog" target="_blank" rel="noreferrer" title="GitHub">
                <i className="fab fa-github"></i>
              </a>
              <button className="btn btn-social" onClick={handleCopyEmail} title="Copiar correo">
                <i className="fa-regular fa-envelope"></i>
              </button>
            </div>

            <hr className="my-4 text-muted opacity-25" />

            {/* Bloque de Tech Stack compacto */}
            <div className="skills-sidebar">
              <h5 className="fw-bold mb-3 small text-uppercase tracking-wider text-muted">Principales Tecnologías</h5>
              <div className="d-flex flex-wrap gap-2 mb-4">
                <span className="tech-tag"><i className="devicon-java-plain text-java"></i> Java</span>
                <span className="tech-tag"><i className="devicon-spring-original text-spring"></i> Spring Boot</span>
                <span className="tech-tag"><i className="devicon-postgresql-plain text-postgres"></i> PostgreSQL</span>
                <span className="tech-tag"><i className="devicon-gitlab-plain text-gitlab"></i> GitLab</span>
                <span className="tech-tag"><i className="devicon-docker-plain text-docker"></i> Docker</span>
              </div>

              <h5 className="fw-bold mb-3 small text-uppercase tracking-wider text-muted">Complementarias</h5>
              <div className="d-flex flex-wrap gap-2">
                <span className="tech-tag-sm">JavaScript</span>
                <span className="tech-tag-sm">Kubernetes</span>
                <span className="tech-tag-sm">SQL</span>
                <span className="tech-tag-sm">Python</span>
                <span className="tech-tag-sm">Ubuntu</span>
                <span className="tech-tag-sm">Git</span>
              </div>
            </div>
          </div>
        </aside>

        {/* COLUMNA DERECHA: Contenido Principal (Scroll dinámico) */}
        <main className="col-lg-8 col-xl-9">
          
          {/* SECCIÓN: Experiencia */}
          <section className="card content-card border-0 shadow-sm p-4 mb-4">
            <h3 className="section-title mb-4"><i className="fas fa-briefcase me-2 text-primary"></i> Experiencia Profesional</h3>
            
            <div className="timeline">
              {/* Item 1 */}
              <div className="timeline-item mb-4">
                <div className="timeline-dot"></div>
                <div className="d-flex flex-column flex-md-row justify-content-between mb-2">
                  <div>
                    <h4 className="h5 fw-bold mb-0">Sistema de Gestión para Clínica Veterinaria</h4>
                    <span className="text-muted small fw-medium">Freelance</span>
                  </div>
                  <span className="badge bg-soft-success text-success align-self-start mt-1 mt-md-0 px-2.5 py-1 rounded">2026</span>
                </div>
                <p className="text-secondary small mb-2">
                  Aplicación web robusta diseñada para la automatización de operaciones en clínicas veterinarias. El sistema centraliza la gestión de expedientes médicos, control de mascotas y propietarios, permitiendo un flujo de trabajo digital eficiente y seguro.
                </p>
                <div className="stack-used text-muted small">
                  <strong>Stack:</strong> Java, Spring Boot, Spring Security, JPA / Hibernate, REST APIs, MySQL.
                </div>
              </div>

              {/* Item 2 */}
              <div className="timeline-item mb-4">
                <div className="timeline-dot"></div>
                <div className="d-flex flex-column flex-md-row justify-content-between mb-2">
                  <div>
                    <h4 className="h5 fw-bold mb-0">Servicio Social y Prácticas Profesionales</h4>
                    <span className="text-muted small fw-medium">INDAVA</span>
                  </div>
                  <span className="badge bg-soft-secondary text-secondary align-self-start mt-1 mt-md-0 px-2.5 py-1 rounded">2025 - 2026</span>
                </div>
                <p className="text-secondary small mb-2">
                  Desarrollo de herramientas automatizadas de backend y optimización de bases de datos orientadas a la extracción, limpieza y procesamiento masivo de información gubernamental y corporativa.
                </p>
                <div className="stack-used text-muted small">
                  <strong>Stack:</strong> Python (Bibliotecas de OCR y Web Scraping), Java, SQL, Optimización de Consultas.
                </div>
              </div>

              {/* Item 3 */}
              <div className="timeline-item mb-2">
                <div className="timeline-dot"></div>
                <div className="d-flex flex-column flex-md-row justify-content-between mb-2">
                  <div>
                    <h4 className="h5 fw-bold mb-0">Sistema de Control de Inventarios para Concesionaria</h4>
                    <span className="text-muted small fw-medium">Freelance</span>
                  </div>
                  <span className="badge bg-soft-secondary text-secondary align-self-start mt-1 mt-md-0 px-2.5 py-1 rounded">2025</span>
                </div>
                <p className="text-secondary small mb-2">
                  Software de escritorio enfocado en la administración, trazabilidad y control de inventario de vehículos para agencias automotrices, automatizando los flujos de almacén tradicionales.
                </p>
                <div className="stack-used text-muted small">
                  <strong>Stack:</strong> Java SE, Apache Maven, JPA (Java Persistence API), MySQL.
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN: Educación */}
          <section className="card content-card border-0 shadow-sm p-4 mb-4">
            <h3 className="section-title mb-4"><i className="fas fa-graduation-cap me-2 text-primary"></i> Educación</h3>
            <div className="education-block mb-3 pb-3 border-bottom-dashed">
              <div className="d-flex justify-content-between mb-1">
                <h4 className="h6 fw-bold mb-0">Unidad Profesional Interdisciplinaria de Ingeniería y Ciencias Sociales y Administrativas (UPIICSA IPN)</h4>
                <span className="text-muted small ms-20 shrink-0">2020 - 2025</span>
              </div>
              <p className="text-primary small mb-0">Ciencias de la Informática</p>
            </div>
            <div className="education-block">
              <div className="d-flex justify-content-between mb-1">
                <h4 className="h6 fw-bold mb-0">Tecnológico de Estudios Superiores de Ixtapaluca (TESI)</h4>
                <span className="text-muted small ms-2 shrink-0">2017 - 2020</span>
              </div>
              <p className="text-primary small mb-0">Ingeniería en Sistemas Computacionales</p>
            </div>
          </section>

          {/* DOS COLUMNAS EN DESKTOP PARA INTERESES Y CERTIFICADOS */}
          <div className="row g-4">
            <div className="col-md-6">
              <section className="card content-card border-0 shadow-sm p-4 h-100">
                <h3 className="section-title mb-3"><i className=" me-2 text-primary"></i>En mis tiempos libres</h3>
                <p className="text-secondary small">
                  Disfruto mucho del aire libre haciendo senderismo y viajando para conocer comida diferente. En casa, me sumerjo en mundos de Minecraft, lecturas de thrillers o practicando música. ¡También soy un apasionado speedcuber!
                </p>
                <p className="text-secondary small mb-0">
                  Me encanta experimentar con proyectos propios desarrollando soluciones automatizadas que optimicen tareas cotidianas.
                </p>
              </section>
            </div>

            <div className="col-md-6">
              <section className="card content-card border-0 shadow-sm p-4 h-100">
                <h3 className="section-title mb-3"><i className="fas fa-award me-2 text-primary"></i> Certificaciones</h3>
                <ul className="list-unstyled cert-list mb-0 small text-secondary">
                  <li><i className="fas fa-check-circle text-success me-2"></i> Spring Security — TodoCode</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i> Microservicios con SpringCloud</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i> APIs en Java con Spring Boot</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i> Java EE con JSP y JPA</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i> Programación Orientada a Objetos</li>
                  <li><i className="fas fa-check-circle text-success me-2"></i> Java para principiantes — TodoCode</li>
                </ul>
              </section>
            </div>
          </div>

        </main>
      </div>

      {/* Toast Notificación */}
      <div className={`custom-toast shadow ${showToast ? 'show' : ''}`}>
        <i className="fas fa-check-circle me-2"></i> ¡Correo copiado al portapapeles!
      </div>
    </div>
  );
};

export default App;
