// src/components/Footer.js

// Importamos React para construir el componente
import React from "react";
// Importamos el componente Link desde react-router-dom para navegación interna
import { Link } from "react-router-dom";

/**
 * Componente funcional Footer
 *
 * Este componente representa el pie de página de la aplicación. Contiene información de derechos de autor,
 * enlaces de navegación rápida y enlaces a redes sociales.
 */
const Footer = () => {
  return (
    <footer className="footer"> {/* Contenedor principal del pie de página con clase CSS "footer" */}
      <div className="footer-content"> {/* Contenedor para organizar el contenido del footer */}
        
        {/* Información de derechos de autor */}
        <p>&copy; 2024 ULEAM - Todos los derechos reservados</p>

        {/* Navegación rápida */}
        <nav> {/* Sección de navegación con enlaces a páginas importantes */}
          <ul> {/* Lista de elementos de navegación */}
            <li>
              <Link to="/ayuda">Ayuda</Link> {/* Enlace a la página de ayuda */}
            </li>
            <li>
              <Link to="/contacto">Contacto</Link> {/* Enlace a la página de contacto */}
            </li>
            <li>
              <Link to="/terminos">Términos de servicio</Link> {/* Enlace a los términos de servicio */}
            </li>
            <li>
              <Link to="/privacidad">Política de privacidad</Link> {/* Enlace a la política de privacidad */}
            </li>
          </ul>
        </nav>

        {/* Iconos de redes sociales */}
        <div className="social-icons"> {/* Contenedor para los iconos de redes sociales */}
          {/* Enlace a Facebook */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> {/* Enlace externo */}
            <img src="/images/facebook-icon.png" alt="Facebook" /> {/* Icono de Facebook */}
          </a>
          {/* Enlace a Twitter */}
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> {/* Enlace externo */}
            <img src="/images/twitter-icon.png" alt="Twitter" /> {/* Icono de Twitter */}
          </a>
          {/* Enlace a Instagram */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"> {/* Enlace externo */}
            <img src="/images/instagram-icon.png" alt="Instagram" /> {/* Icono de Instagram */}
          </a>
        </div>
      </div>
    </footer>
  );
};

// Exportamos el componente Footer para su uso en otras partes de la aplicación
export default Footer;
