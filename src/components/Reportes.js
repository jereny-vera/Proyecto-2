// Importamos React y los hooks useState y useEffect
import React, { useState, useEffect } from "react";

const Reportes = () => {
  // Estado para almacenar la lista de personas cargada desde localStorage
  const [personas, setPersonas] = useState([]);
  
  // Estado para almacenar el texto ingresado en el campo de búsqueda
  const [search, setSearch] = useState("");
  
  // Estado para manejar la página actual en la paginación
  const [currentPage, setCurrentPage] = useState(1);
  
  // Constante que define el número de registros que se mostrarán por página
  const personasPorPagina = 5;

  // useEffect: Se ejecuta al montar el componente. Carga los datos de localStorage
  useEffect(() => {
    // Recuperamos los datos desde localStorage, o establecemos un arreglo vacío si no existen datos(validaciones)
    const personasRegistradas = JSON.parse(localStorage.getItem("personas")) || [];
    setPersonas(personasRegistradas); // Actualizamos el estado con los datos obtenidos
  }, []); // Dependencia vacía para que solo se ejecute una vez

  // Filtramos la lista de personas según el texto ingresado en el campo de búsqueda
  const filteredPersonas = personas.filter(
    ({ nombre, apellido }) =>
      nombre.toLowerCase().includes(search.toLowerCase()) || // Comparamos con el nombre (en minúsculas)
      apellido.toLowerCase().includes(search.toLowerCase()) // Comparamos con el apellido (en minúsculas)
  );

  // Calculamos el número total de páginas necesarias para los resultados filtrados
  const totalPages = Math.ceil(filteredPersonas.length / personasPorPagina);

  // Determinamos qué registros se mostrarán en la página actual
  const currentPersonas = filteredPersonas.slice(
    (currentPage - 1) * personasPorPagina, // Índice de inicio según la página actual
    currentPage * personasPorPagina // Índice de fin según la página actual
  );

  // Función para cambiar la página actual en la paginación (validacion)
  const handlePageChange = (newPage) => {
    // Validamos que la nueva página esté dentro del rango permitido
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage); // Actualizamos el estado con la nueva página
    }
  };

  return (
    <div className="reportes-container">
      <h2>Reportes</h2>

      {/* Campo de búsqueda para filtrar personas */}
      <h3>Buscar Persona</h3>
      <input
        type="text"
        placeholder="Buscar por nombre o apellido" // Placeholder que guía al usuario
        value={search} // Valor del estado de búsqueda
        onChange={(e) => {
          setSearch(e.target.value); // Actualizamos el texto de búsqueda al cambiar el input
          setCurrentPage(1); // Reseteamos a la primera página para mostrar resultados filtrados desde el inicio(validaciones)
        }}
      />

      {/* Mostramos un mensaje si no hay registros coincidentes */}
      {filteredPersonas.length === 0 ? (
        <p>No hay registros disponibles para generar reportes.</p> // Mensaje de error si no hay resultados (validaciones)
      ) : (
        <div>
          <h3>Lista de personas registradas</h3>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Discapacidad</th> {/* Columna adicional para discapacidad */}
              </tr>
            </thead>
            <tbody>
              {/* Iteramos sobre los registros de la página actual para mostrarlos en la tabla */}
              {currentPersonas.map((persona, index) => (
                <tr key={index}>
                  <td>{persona.nombre}</td> {/* Muestra el nombre */}
                  <td>{persona.apellido}</td> {/* Muestra el apellido */}
                  <td>{persona.edad}</td> {/* Muestra la edad */}
                  <td>{persona.direccion}</td> {/* Muestra la dirección */}
                  <td>{persona.telefono}</td> {/* Muestra el teléfono */}
                  <td>{persona.discapacidad}</td> {/* Muestra la discapacidad */}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Controles de paginación (validacion) */}
          <div>
            {/* Botón para ir a la página anterior. Deshabilitado si ya estamos en la primera página */}
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Anterior
            </button>
            {/* Mostramos la página actual y el total de páginas */}
            <span>
              Página {currentPage} de {totalPages}
            </span>
            {/* Botón para ir a la página siguiente. Deshabilitado si ya estamos en la última página */}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Siguiente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reportes; // Exportamos el componente para su uso en otros archivos
