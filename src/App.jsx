import { useState, useEffect, useCallback } from 'react';
import './App.css';

const BASE_URL = import.meta.env.BASE_URL;

// Rutas e imágenes de proyectos (fuera del componente para optimizar renders y memoria)
const projectImages = {
  veterinaria: [
    `${BASE_URL}assets/img/Login.png`,
    `${BASE_URL}assets/img/oauth.png`,
    `${BASE_URL}assets/img/Dashboard.png`,
    `${BASE_URL}assets/img/DetalleMascotas.png`,
    `${BASE_URL}assets/img/DetalleDuenos.png`,
    `${BASE_URL}assets/img/DetalleVeterinarios2.png`,
    `${BASE_URL}assets/img/DetallesReportes.png`,
    `${BASE_URL}assets/img/DetalleCitas.png`,
    `${BASE_URL}assets/img/RegistroMascotas.png`,
    `${BASE_URL}assets/img/RegistroClientes.png`,
    `${BASE_URL}assets/img/RegistroCitas.png`,
    `${BASE_URL}assets/img/RegistroDeReportes.png`
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

const cvPdfUrl = `${BASE_URL}assets/CVESHVLoperenaFloresErnestoGuadalupe.pdf`;

const App = () => {
  const [showToast, setShowToast] = useState(false);

  // 1. Estado para el modo oscuro con detección de preferencia del sistema y persistencia en localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // === ESTADOS PARA LA GALERÍA / CARRUSEL ===
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 2. Efecto para aplicar el tema al documento HTML cada vez que cambie el estado
  useEffect(() => {
    const theme = isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ernesto.loperena.f@gmail.com')
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      })
      .catch((err) => console.error('Error al copiar el correo: ', err));
  };

  // === FUNCIONES DEL CARRUSEL ===
  const openGallery = (projectKey) => {
    setCurrentProject(projectKey);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGallery = useCallback(() => {
    setIsModalOpen(false);
    setCurrentProject(null);
    document.body.style.overflow = 'auto';
  }, []);

  const nextImage = useCallback(() => {
    if (currentProject && projectImages[currentProject]) {
      setCurrentImageIndex((prev) => 
        prev === projectImages[currentProject].length - 1 ? 0 : prev + 1
      );
    }
  }, [currentProject]);

  const prevImage = useCallback(() => {
    if (currentProject && projectImages[currentProject]) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? projectImages[currentProject].length - 1 : prev - 1
      );
    }
  }, [currentProject]);

  // Manejo de teclado para el carrusel (Escape, Flechas)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, closeGallery, nextImage, prevImage]);

  return (
    <div className="app-container container-fluid py-4 py-md-5 position-relative">
      {/* Botón flotante para Modo Oscuro */}
      <button 
        className="theme-toggle-btn shadow-sm"
        onClick={toggleTheme}
        aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={isDarkMode ? 'Activar modo claro' : 'Activar modo oscuro'}
      >
        <i className={isDarkMode ? 'fas fa-sun text-warning' : 'fas fa-moon text-primary'}></i>
        <span className="d-none d-sm-inline ms-1">{isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
      </button>

      <div className="row g-4 max-width-wrapper">

        {/* COLUMNA IZQUIERDA: Perfil y Habilidades (Sticky en desktop) */}
        <aside className="col-lg-4 col-xl-3">
          <div className="card profile-card position-sticky border-0 shadow-sm p-4 text-center text-lg-start">
            <div className="d-flex flex-column align-items-center align-items-lg-start">
              <div className="profile-img-container mb-3">
                <img 
                  className="img-fluid rounded-circle" 
                  src={`${BASE_URL}assets/img/profile.jpg`} 
                  alt="Ernesto Guadalupe Loperena Flores" 
                />
              </div>
              <h1 className="h3 fw-bold mb-1 title-name">Ernesto Guadalupe</h1>
              <h2 className="h4 fw-bold text-gradient mb-3">Loperena Flores</h2>
              <div className="badge bg-soft-primary text-primary mb-3 px-3 py-2 rounded-pill fw-semibold">
                Desarrollador Backend
              </div>
            </div>

            {/* BOTÓN DESCARGAR CV */}
            <div className="d-grid gap-2 mb-4">
              <a 
                href={cvPdfUrl}
                download="CV_Ernesto_Guadalupe_Loperena_Flores.pdf"
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-download-cv"
                title="Descargar Currículum Vitae en PDF"
              >
                <i className="fas fa-file-arrow-down me-2"></i>
                <span>Descargar CV</span>
              </a>
            </div>

            <p className="text-secondary small mb-3 text-center text-lg-start">
              Enfocado en el diseño y construcción de APIs REST y microservicios con Java y Spring Boot. Mi enfoque principal está en el desarrollo de soluciones escalables y eficientes, con un dominio sólido en persistencia de datos utilizando JPA / Hibernate y bases de datos SQL.
            </p>
            <p className="text-secondary small mb-4 text-center text-lg-start">
              Trabajo con Git para el control de versiones. Adicionalmente, cuento con conocimientos en Python, lo que me permite crear herramientas complementarias de automatización y optimización de datos cuando el proyecto lo requiere.
            </p>

            {/* Redes Sociales y Contacto */}
            <div className="d-flex justify-content-center justify-content-lg-start gap-2 mb-3">
              <a 
                className="btn btn-social" 
                href="https://www.linkedin.com/in/loperena-flores-ernesto-guadalupe-9aa47a305/" 
                target="_blank" 
                rel="noreferrer" 
                title="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a 
                className="btn btn-social" 
                href="https://github.com/loperenafloresernestog" 
                target="_blank" 
                rel="noreferrer" 
                title="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <button 
                className="btn btn-social" 
                onClick={handleCopyEmail} 
                title="Copiar correo (ernesto.loperena.f@gmail.com)"
              >
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

        {/* COLUMNA DERECHA: Contenido Principal */}
        <main className="col-lg-8 col-xl-9">

          {/* SECCIÓN: Experiencia */}
          <section className="card content-card border-0 shadow-sm p-4 mb-4">
            <h3 className="section-title mb-4"><i className="fas fa-briefcase me-2 text-primary"></i> Experiencia Profesional</h3>

            <div className="timeline">
              {/* Item 1: Proyecto Independiente (Veterinaria & E-commerce) */}
              <div className="timeline-item mb-4">
                <div className="timeline-dot"></div>
                <div className="d-flex flex-column flex-md-row justify-content-between mb-2">
                  <div>
                    <h4 className="h5 fw-bold mb-0">Desarrollador Backend</h4>
                    <span className="text-muted small fw-medium">Proyecto Independiente — Plataforma de Gestión Clínica Veterinaria & E-commerce</span>
                  </div>
                  <span className="badge bg-soft-success text-success align-self-start mt-1 mt-md-0 px-2.5 py-1 rounded">Nov 2025 – Actualidad</span>
                </div>

                <ul className="text-secondary small ps-3 mb-3">
                  <li className="mb-1">
                    Arquitecturé una plataforma integral de gestión clínica veterinaria y e-commerce basada en microservicios utilizando <strong>Java y Spring Boot</strong>, comunicando dominios independientes a través de APIs REST.
                  </li>
                  <li className="mb-1">
                    Implementé flujos de seguridad stateless mediante <strong>Spring Security, JWT y Google OAuth2</strong>, aplicando control de acceso basado en roles (RBAC) para proteger rutas sensibles.
                  </li>
                  <li className="mb-1">
                    Diseñé la capa de persistencia de datos con <strong>Spring Data JPA y Hibernate</strong>, segregando esquemas relacionales (PostgreSQL/MySQL) para garantizar el aislamiento entre el módulo clínico y la tienda.
                  </li>
                  <li className="mb-1">
                    Integré pasarelas de pago y arquitectura de cobro mediante enlaces (<strong>Pay-by-Link</strong>) para el módulo de facturación.
                  </li>
                </ul>

                <div className="stack-used text-secondary small mb-3">
                  <strong>Stack:</strong> Java, Spring Boot, Microservicios, Spring Security, JWT, Google OAuth2, Spring Data JPA, Hibernate, PostgreSQL, MySQL, REST APIs, Pay-by-Link, React.
                </div>

                <div className="mt-2">
                  <button onClick={() => openGallery('veterinaria')} className="btn btn-sm btn-outline-primary rounded-pill px-3 py-1 shadow-sm transition-all hover-lift">
                    <i className="fas fa-images me-2"></i> Ver capturas del proyecto
                  </button>
                </div>
              </div>

              {/* Item 2: INDAVA - Desarrollador Backend */}
              <div className="timeline-item mb-4">
                <div className="timeline-dot"></div>
                <div className="d-flex flex-column flex-md-row justify-content-between mb-2">
                  <div>
                    <h4 className="h5 fw-bold mb-0">Desarrollador Backend</h4>
                    <span className="text-muted small fw-medium">INDAVA</span>
                  </div>
                  <span className="badge bg-soft-secondary text-secondary align-self-start mt-1 mt-md-0 px-2.5 py-1 rounded">Mar 2025 – Jun 2026</span>
                </div>

                <ul className="text-secondary small ps-3 mb-3">
                  <li className="mb-1">
                    Mantenimiento y evolución de <strong>APIs RESTful</strong>, asegurando la integridad de reglas de negocio complejas y la alta disponibilidad de los servicios.
                  </li>
                  <li className="mb-1">
                    Empaquetado y orquestación de aplicaciones mediante <strong>Docker</strong>, estandarizando los flujos de trabajo entre los entornos de desarrollo y producción.
                  </li>
                  <li className="mb-1">
                    Resolución de incidencias técnicas y <strong>refactorización de código heredado en Java</strong>, mejorando significativamente la escalabilidad y mantenibilidad del sistema.
                  </li>
                </ul>

                <div className="stack-used text-secondary small mb-3">
                  <strong>Stack:</strong> Java, APIs RESTful, Docker, Refactorización de Código, Arquitectura Backend, SQL.
                </div>
              </div>

              {/* Item 3: INDAVA - Prácticas / Servicio Social */}
              <div className="timeline-item mb-2">
                <div className="timeline-dot"></div>
                <div className="d-flex flex-column flex-md-row justify-content-between mb-2">
                  <div>
                    <h4 className="h5 fw-bold mb-0">Desarrollador Backend (Prácticas / Servicio Social)</h4>
                    <span className="text-muted small fw-medium">INDAVA</span>
                  </div>
                  <span className="badge bg-soft-secondary text-secondary align-self-start mt-1 mt-md-0 px-2.5 py-1 rounded">Jun 2024 – Feb 2025</span>
                </div>

                <ul className="text-secondary small ps-3 mb-3">
                  <li className="mb-1">
                    Desarrollé un sistema OCR utilizando <strong>Python, OpenCV y Tesseract</strong> para la extracción de datos salariales en contratos legales para la plataforma Ohio Insightboard, incrementando la velocidad en un <strong>45%</strong> con <strong>92% de precisión</strong>.
                  </li>
                  <li className="mb-1">
                    Diseñé un pipeline de <strong>web scraping</strong> para automatizar la recolección de datos de portales del gobierno mexicano para una biblioteca digital (Tramitoteca), reduciendo el ingreso manual en un <strong>57.4%</strong>.
                  </li>
                  <li className="mb-1">
                    Optimizé consultas SQL complejas para el análisis e inserción de datos masivos, reduciendo los tiempos de carga de la plataforma <strong>Insightboard Ohio</strong>.
                  </li>
                </ul>

                <div className="stack-used text-secondary small mb-3">
                  <strong>Stack:</strong> Python, OpenCV, Tesseract OCR, Web Scraping, SQL (Optimización y Procesamiento Masivo).
                </div>
              </div>
            </div>
          </section>

          {/* SECCIÓN: Educación */}
          <section className="card content-card border-0 shadow-sm p-4 mb-4">
            <h3 className="section-title mb-4"><i className="fas fa-graduation-cap me-2 text-primary"></i> Educación</h3>
            <div className="education-block mb-3 pb-3 border-bottom-dashed">
              <div className="d-flex justify-content-between flex-wrap gap-2 mb-1">
                <h4 className="h6 fw-bold mb-0">Unidad Profesional Interdisciplinaria de Ingeniería y Ciencias Sociales y Administrativas (UPIICSA IPN)</h4>
                <span className="badge bg-soft-secondary text-secondary fw-normal">2020 - 2025</span>
              </div>
              <p className="text-primary small mb-0 fw-medium">Ciencias de la Informática</p>
            </div>
            <div className="education-block">
              <div className="d-flex justify-content-between flex-wrap gap-2 mb-1">
                <h4 className="h6 fw-bold mb-0">Tecnológico de Estudios Superiores de Ixtapaluca (TESI)</h4>
                <span className="badge bg-soft-secondary text-secondary fw-normal">2017 - 2020</span>
              </div>
              <p className="text-primary small mb-0 fw-medium">Ingeniería en Sistemas Computacionales</p>
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
          onClick={closeGallery}
        >
          {/* Contenedor del Carrusel */}
          <div 
            className="position-relative d-flex flex-column align-items-center"
            style={{ maxWidth: '90%', maxHeight: '90%' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón Cerrar */}
            <button 
              onClick={closeGallery}
              className="btn btn-link text-white position-absolute"
              style={{ top: '-40px', right: '-20px', fontSize: '24px', textDecoration: 'none' }}
              title="Cerrar (Esc)"
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

            {/* Controles de navegación */}
            {projectImages[currentProject].length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="btn btn-dark position-absolute start-0 top-50 translate-middle-y ms-2 ms-md-n4 shadow"
                  style={{ borderRadius: '50%', width: '45px', height: '45px', opacity: 0.85 }}
                  title="Anterior (←)"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <button 
                  onClick={nextImage}
                  className="btn btn-dark position-absolute end-0 top-50 translate-middle-y me-2 me-md-n4 shadow"
                  style={{ borderRadius: '50%', width: '45px', height: '45px', opacity: 0.85 }}
                  title="Siguiente (→)"
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
