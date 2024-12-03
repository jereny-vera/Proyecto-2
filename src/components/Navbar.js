// Importamos React y el componente Link desde react-router-dom
import React from "react";
import { Link } from "react-router-dom";

/**
 * Componente funcional Navbar
 * 
 * Este componente representa la barra de navegación de la aplicación,
 * proporcionando enlaces a diferentes secciones y un botón para cerrar sesión.
 * 
 * @param {Function} onLogout - Función que se ejecuta al hacer clic en el botón "Cerrar sesión".
 */
const Navbar = ({ onLogout }) => {
  return (
    <nav> {/* Contenedor principal de la barra de navegación */}
      <ul> {/* Lista de elementos de navegación */}
        <li>
          <Link to="/dashboard">Dashboard</Link> {/* Enlace al panel principal (Dashboard) */}
        </li>
        <li>
          <Link to="/registro-persona">Registrar Persona</Link> {/* Enlace al formulario para registrar personas */}
        </li>
        <li>
          <Link to="/reportes">Reportes</Link> {/* Enlace a la sección de reportes */}
        </li>
        <li>
          <Link to="/seguimiento-datos">Seguimiento de Datos</Link> {/* Enlace a la página de seguimiento de datos */}
        </li>
        <li>
          <button onClick={onLogout}>Cerrar sesión</button> {/* Botón para cerrar sesión. Ejecuta la función onLogout */}
        </li>
      </ul>
    </nav>
  );
};

// Exportamos el componente para que pueda ser utilizado en otros archivos
export default Navbar;
