// Importamos React y el componente Link desde react-router-dom
import React from "react";
import { Link } from "react-router-dom";

/**
 * Componente funcional Header
 *
 * Este componente representa el encabezado de la aplicación, incluyendo un título y una barra de navegación
 * que proporciona enlaces a las diferentes secciones del sistema.
 */
const Header = () => {
  return (
    <header> {/* Contenedor principal del encabezado */}
      <h1>Software de Registro y Seguimiento</h1> {/* Título principal de la aplicación */}
      <nav> {/* Contenedor de la barra de navegación */}
        <ul> {/* Lista de elementos de navegación */}
          <li>
            <Link to="/Login">Inicio</Link> {/* Enlace a la página de inicio */}
          </li>
          <li>
            <Link to="/registro-persona">Registro</Link> {/* Enlace al formulario de registro de personas */}
          </li>
          <li>
            <Link to="/consultar-datos">Consultar Datos</Link> {/* Enlace a la página de consulta de datos */}
          </li>
          <li>
            <Link to="/reportes">Reportes</Link> {/* Enlace a la página de reportes */}
          </li>
          <li>
            <Link to="/administracion">Administración</Link> {/* Enlace a la sección de administración */}
          </li>
          <li>
            <Link to="/ayuda">Ayuda</Link> {/* Enlace a la página de ayuda */}
          </li>
          <li>
            <Link to="/seguimiento-datos">Seguimiento Datos</Link> {/* Enlace a la sección de seguimiento de datos */}
          </li>
        </ul>
      </nav>
    </header>
  );
};

// Exportamos el componente para que pueda ser utilizado en otros módulos de la aplicación
export default Header;
