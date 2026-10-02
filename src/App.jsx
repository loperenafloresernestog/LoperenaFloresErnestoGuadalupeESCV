import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [showToast, setShowToast] = useState(false);

  // 1. Estado para el modo oscuro (por defecto lo ponemos falso/claro)
  const [isDarkMode, setIsDarkMode] = useState(false);

  // === NUEVOS ESTADOS PARA LA GALERÍA ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // === TUS IMÁGENES === 
  // (Reemplaza estas URLs por las rutas de tus imágenes, ej: 'assets/img/vet-1.png')
  const projectImages = {
    veterinaria: [
      'assets/img/Login.png',
      "assets/img/oauth.png",
      "assets/img/Dashboard.png",
      'assets/img/DetalleMascotas.png',
      "assets/img/DetalleDuenos.png",
      "assets/img/DetalleVeterinarios2.png",
      "assets/img/DetallesReportes.png",
      'assets/img/DetalleCitas.png',
      'assets/img/RegistroMascotas.png',
      "assets/img/RegistroClientes.png",
      "assets/img/RegistroCitas.png",
      "assets/img/RegistroDeReportes.png"
    ],

    indava: [
      "https://via.placeholder.com/900x500/fff3e0/e65100?text=INDAVA+-+Proceso+OCR",
      "https://via.placeholder.com/900x500/fff3e0/e65100?text=INDAVA+-+Base+de+Datos"
    ],
    inventario: [
      "https://via.placeholder.com/900x500/ede7f6/311b92?text=Inventario+-+Login",
      "https://via.placeholder.com/900x500/ede7f6/311b92?text=Inventario+-+Stock"
    ]
  };

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

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // === FUNCIONES DEL CARRUSEL ===
  const openGallery = (projectKey) => {
    setCurrentProject(projectKey);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Bloquea el scroll del fondo
  };

  const closeGallery = () => {
    setIsModalOpen(false);
    setCurrentProject(null);
    document.body.style.overflow = 'auto'; // Restaura el scroll
  };

  const nextImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prev) => 
        prev === projectImages[currentProject].length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (currentProject) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? projectImages[currentProject].length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="app-container container-fluid py-4 py-md-5 position-relative">
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
                  Diseño y desarrollo de una aplicación web para la gestión integral de una clínica veterinaria, enfocada en la administración de expedientes de mascotas, control de citas y flujos de usuarios. 
                </p>
                <p className="text-secondary small mb-2">
                  El sistema asegura la protección de los datos mediante autenticación basada en roles y filtros sin estado (stateless). 
                </p>
                <p className="text-secondary small mb-2">
                  La plataforma está construida bajo una arquitectura de microservicios, integrando el sistema principal de clínica con un módulo de tienda independiente; cada uno operando con bases de datos segregadas y comunicándose a través de la orquestación y consumo de APIs REST.
                </p>

                <div className="stack-used text-muted small mb-3">
                  <strong>Stack:</strong> Java, JPA / Hibernate, REST APIs, PostgreSQL, Spring Boot, Spring Security, JWT (Stateless Authentication), Google OAuth2, React.
                </div>

                <div className="mt-2">
                  <button onClick={() => openGallery('veterinaria')} className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 shadow-sm transition-all hover-lift">
                    <i className="fas fa-images me-2"></i> Ver capturas del proyecto
                  </button>
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
                <p className="text-secondary small mb-2">
                  Desarrollo de un sistema OCR con Python y Tesseract para extraer datos de salarios e incrementos de contratos legales para la plataforma Ohio Insightboard.                
                </p>
                <p className="text-secondary small mb-2">
                  Optimicé y redacté consultas SQL complejas para la inserción y el análisis de datos en una plataforma Insightboard, mejorando significativamente la eficiencia del procesamiento de la información.
                </p>
                <div className="stack-used text-muted small mb-3">
                  <strong>Stack:</strong> Python (Bibliotecas de OCR y Web Scraping), Java, SQL, Optimización de Consultas.
                </div>
                {/* 
                <div className="mt-2">
                  <button onClick={() => openGallery('indava')} className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 shadow-sm transition-all hover-lift">
                    <i className="fas fa-images me-2"></i> Ver capturas del proyecto
                  </button>
                </div>*/}
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
                <div className="stack-used text-muted small mb-3">
                  <strong>Stack:</strong> Java SE, Apache Maven, JPA (Java Persistence API), MySQL.
                </div>
                {/*
                <div className="mt-2">
                  <button onClick={() => openGallery('inventario')} className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 shadow-sm transition-all hover-lift">
                    <i className="fas fa-images me-2"></i> Ver capturas del proyecto
                  </button>
                </div>
                */}
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
                <h3 className="section-title mb-3"><i className="fas fa-heart me-2 text-primary"></i>En mis tiempos libres</h3>
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

      {/* === MODAL DEL CARRUSEL === */}
      {isModalOpen && currentProject && (
        <div 
          className="modal-overlay d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 9999,
            backdropFilter: 'blur(5px)'
          }}
          onClick={closeGallery} // Cierra si hacen clic afuera de la imagen
        >
          {/* Contenedor del Carrusel */}
          <div 
            className="position-relative d-flex flex-column align-items-center"
            style={{ maxWidth: '90%', maxHeight: '90%' }}
            onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer clic en la imagen
          >
            {/* Botón Cerrar (Arriba a la derecha) */}
            <button 
              onClick={closeGallery}
              className="btn btn-link text-white position-absolute"
              style={{ top: '-40px', right: '-20px', fontSize: '24px', textDecoration: 'none' }}
              title="Cerrar"
            >
              <i className="fas fa-times"></i>
            </button>

            {/* Imagen Actual */}
            <img 
              src={projectImages[currentProject][currentImageIndex]} 
              alt={`Captura ${currentImageIndex + 1} del proyecto ${currentProject}`} 
              className="img-fluid rounded shadow-lg"
              style={{ maxHeight: '80vh', objectFit: 'contain' }}
            />

            {/* Controles de navegación (Solo si hay más de 1 imagen) */}
            {projectImages[currentProject].length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="btn btn-dark position-absolute start-0 top-50 translate-middle-y ms-2 ms-md-n4 shadow"
                  style={{ borderRadius: '50%', width: '45px', height: '45px', opacity: 0.8 }}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                  onClick={nextImage}
                  className="btn btn-dark position-absolute end-0 top-50 translate-middle-y me-2 me-md-n4 shadow"
                  style={{ borderRadius: '50%', width: '45px', height: '45px', opacity: 0.8 }}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              </>
            )}

            {/* Indicador de número de imagen */}
            <div className="text-white mt-3 fw-bold tracking-wider small">
              {currentImageIndex + 1} / {projectImages[currentProject].length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
