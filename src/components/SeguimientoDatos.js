import React, { useState, useEffect } from "react";

const SeguimientoDatos = () => {
  // Estado para almacenar los registros
  const [registros, setRegistros] = useState([]);
  
  // Estado para los datos del formulario (nombre y capacidad)
  const [formData, setFormData] = useState({ nombre: "", capacidad: "" });
  
  // Estado para el término de búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  
  // Estado para la página actual de la paginación
  const [currentPage, setCurrentPage] = useState(1);
  
  // Número de registros que se mostrarán por página
  const registrosPorPagina = 5;

  // Efecto para cargar los datos almacenados en `localStorage` al inicializar el componente
  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("personas")) || [];
    setRegistros(datos); // Establece los registros obtenidos
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  // Filtrar los registros según el término de búsqueda
  // Validación: Se asegura de que los campos no sean `undefined` ni `null` usando operadores seguros
  const filteredRegistros = registros.filter((persona) =>
    (persona.nombre?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (persona.capacidad?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  // Calcular el número total de páginas según los registros filtrados
  const totalPages = Math.ceil(filteredRegistros.length / registrosPorPagina);

  // Obtener los registros correspondientes a la página actual
  const registrosPaginaActual = filteredRegistros.slice(
    (currentPage - 1) * registrosPorPagina,
    currentPage * registrosPorPagina
  );

  // Cambiar la página actual (paginación)
  // Validación: Solo cambiar si la nueva página está dentro de los límites
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // Agregar un nuevo registro
  const handleAdd = () => {
    // Validación: Comprobar que los campos no estén vacíos
    if (!formData.nombre.trim() || !formData.capacidad.trim()) {
      alert("Por favor, ingrese todos los campos."); // Mensaje de alerta si hay campos vacíos
      return;
    }

    // Crear un nuevo objeto de registro
    const nuevaPersona = { nombre: formData.nombre, capacidad: formData.capacidad };
    const updatedRegistros = [...registros, nuevaPersona];

    // Actualizar el almacenamiento local y el estado
    localStorage.setItem("personas", JSON.stringify(updatedRegistros));
    setRegistros(updatedRegistros);

    // Limpiar los campos del formulario
    setFormData({ nombre: "", capacidad: "" });
  };

  // Editar un registro existente
  const handleEdit = (index) => {
    // Solicitar al usuario la nueva capacidad
    const nuevaCapacidad = prompt("Ingrese nueva capacidad:", registros[index].capacidad);

    // Validación: Solo actualizar si la nueva capacidad no está vacía
    if (nuevaCapacidad?.trim()) {
      const updatedRegistros = [...registros];
      updatedRegistros[index].capacidad = nuevaCapacidad;

      // Actualizar el almacenamiento local y el estado
      localStorage.setItem("personas", JSON.stringify(updatedRegistros));
      setRegistros(updatedRegistros);
    } else if (nuevaCapacidad !== null) {
      alert("La capacidad no puede estar vacía."); // Mensaje si el campo está vacío
    }
  };

  // Eliminar un registro
  const handleDelete = (index) => {
    // Confirmación antes de eliminar
    if (window.confirm("¿Estás seguro de que deseas eliminar este registro?")) {
      const updatedRegistros = registros.filter((_, i) => i !== index);

      // Actualizar el almacenamiento local y el estado
      localStorage.setItem("personas", JSON.stringify(updatedRegistros));
      setRegistros(updatedRegistros);
    }
  };

  // Manejar los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main>
      <h2>Seguimiento de Datos</h2>

      {/* Formulario para agregar personas */}
      <section>
        <h3>Agregar Persona</h3>
        <form>
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange} // Manejar cambios en el input
          />
          <select
            name="capacidad"
            value={formData.capacidad}
            onChange={handleInputChange} // Manejar cambios en el select
          >
            <option value="">Seleccione capacidad</option>
            <option value="Capacidad Visual">Capacidad Visual</option>
            <option value="Capacidad Auditiva">Capacidad Auditiva</option>
            <option value="Capacidad Motriz">Capacidad Motriz</option>
            <option value="Capacidad Cognitiva">Capacidad Cognitiva</option>
            <option value="Sin capacidad registrada">Sin capacidad registrada</option>
          </select>
          <button type="button" onClick={handleAdd}>
            Agregar
          </button>
        </form>
      </section>

      {/* Campo de búsqueda */}
      <section>
        <input
          type="text"
          placeholder="Buscar por nombre o capacidad"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Manejar el término de búsqueda
        />
      </section>

      {/* Tabla de registros */}
      {filteredRegistros.length === 0 ? (
        <p>No hay registros disponibles para la búsqueda.</p>
      ) : (
        <section>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Capacidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registrosPaginaActual.map((persona, index) => (
                <tr key={index}>
                  <td>{persona.nombre}</td>
                  <td>{persona.capacidad || "Sin capacidad registrada"}</td>
                  <td>
                    <button onClick={() => handleEdit(index)}>Editar</button>
                    <button onClick={() => handleDelete(index)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Paginación */}
      <section>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1} // Desactivar si es la primera página
        >
          Anterior
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages} // Desactivar si es la última página
        >
          Siguiente
        </button>
      </section>
    </main>
  );
};

export default SeguimientoDatos;
