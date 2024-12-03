// Importamos React, el hook useState para manejar estados locales, useEffect para efectos secundarios, y useNavigate para la navegación entre páginas.
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Componente funcional Administracion
const Administracion = () => {
  // Estados locales
  const [personas, setPersonas] = useState([]); // Lista de personas registradas
  const [newPersona, setNewPersona] = useState({ 
    nombre: "", 
    apellido: "", 
    edad: "", 
    direccion: "", 
    telefono: "", 
    discapacidad: "" 
  }); // Objeto para manejar la nueva persona
  const [search, setSearch] = useState(""); // Valor del campo de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual de la lista de personas
  const [telefonoError, setTelefonoError] = useState(""); // Mensaje de error para validación del teléfono
  const navigate = useNavigate(); // Función para navegación programática

  // useEffect para cargar los datos iniciales desde localStorage
  useEffect(() => {
    const personasRegistradas = JSON.parse(localStorage.getItem("personas")) || []; // Recupera los datos del almacenamiento local
    setPersonas(personasRegistradas); // Inicializa el estado de personas
  }, []); // Este efecto solo se ejecuta una vez al montar el componente

  // Función para manejar acciones (editar o eliminar) sobre una persona
  const handleAction = (action, index) => {
    const updatedPersonas = [...personas]; // Crea una copia de la lista de personas
    if (action === "delete") updatedPersonas.splice(index, 1); // Elimina una persona por índice
    else if (action === "edit") navigate(`/editar-persona/${index}`); // Navega a la página de edición
    setPersonas(updatedPersonas); // Actualiza la lista de personas
    localStorage.setItem("personas", JSON.stringify(updatedPersonas)); // Guarda los cambios en localStorage
  };

  // Función para agregar una nueva persona
  const handleAddPersona = (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario (recargar la página)
    if (telefonoError) return; // No permite agregar si hay errores en el teléfono
    setPersonas([...personas, newPersona]); // Agrega la nueva persona a la lista
    localStorage.setItem("personas", JSON.stringify([...personas, newPersona])); // Actualiza localStorage
    setNewPersona({ nombre: "", apellido: "", edad: "", direccion: "", telefono: "", discapacidad: "" }); // Limpia el formulario
  };

  // Validación del teléfono para asegurarse de que tenga 10 dígitos
  const validateTelefono = (telefono) => {
    const telefonoRegex = /^[0-9]{10}$/; // Expresión regular para validar 10 dígitos numéricos
    setTelefonoError(telefono 
      ? (!telefonoRegex.test(telefono) ? "El teléfono debe tener 10 dígitos." : "") 
      : "El número de teléfono es obligatorio."); // Establece el mensaje de error según el caso
  };

  // Filtrado de personas según el campo de búsqueda
  const filteredPersonas = personas.filter(({ nombre, apellido }) => 
    nombre.toLowerCase().includes(search.toLowerCase()) || 
    apellido.toLowerCase().includes(search.toLowerCase())
  );

  // Paginación
  const personasPerPage = 5; // Personas por página
  const totalPages = Math.ceil(filteredPersonas.length / personasPerPage); // Total de páginas
  const currentPersonas = filteredPersonas.slice(
    (currentPage - 1) * personasPerPage, 
    currentPage * personasPerPage
  ); // Personas de la página actual

  return (
    <div className="administracion-container">
      <h2>Administración</h2> {/* Título principal */}

      {/* Mensaje de error si hay un problema con el teléfono */}
      {newPersona.telefono && telefonoError && <p style={{ color: "red" }}>{telefonoError}</p>}
      
      {/* Formulario para agregar nuevas personas */}
      <h3>Agregar Nueva Persona</h3>
      <form onSubmit={handleAddPersona}>
        {["nombre", "apellido", "edad", "direccion", "telefono"].map((field) => (
          <input
            key={field}
            type={field === "telefono" ? "tel" : "text"} // Tipo de campo según el nombre
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)} // Capitaliza la primera letra del placeholder
            value={newPersona[field]} // Valor controlado por el estado
            onChange={(e) => {
              setNewPersona({ ...newPersona, [field]: e.target.value }); // Actualiza el estado
              if (field === "telefono") validateTelefono(e.target.value); // Valida el teléfono
            }}
            required // Campo obligatorio
          />
        ))}
        {/* Selector para la discapacidad (validacion) */}
        <div>
          <label>Discapacidad:</label>
          <select
            name="discapacidad"
            value={newPersona.discapacidad}
            onChange={(e) => setNewPersona({ ...newPersona, discapacidad: e.target.value })}
            required
          >
            <option value="">Seleccione una discapacidad</option>
            <option value="Visual">Visual</option>
            <option value="Auditiva">Auditiva</option>
            <option value="Motora">Motora</option>
            <option value="Cognitiva">Cognitiva</option>
          </select>
        </div>
        <button type="submit" disabled={telefonoError}>Agregar</button>
      </form>

      {/* Campo de búsqueda */}
      <h3>Buscar Persona</h3>
      <input 
        type="text" 
        placeholder="Buscar por nombre o apellido" 
        value={search} 
        onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} 
      />

      {/* Tabla para listar personas registradas */}
      <h3>Lista de personas registradas</h3>
      {currentPersonas.length ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Discapacidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentPersonas.map((persona, index) => (
                <tr key={index}>
                  <td>{persona.nombre}</td>
                  <td>{persona.apellido}</td>
                  <td>{persona.edad}</td>
                  <td>{persona.direccion}</td>
                  <td>{persona.telefono}</td>
                  <td>{persona.discapacidad || "No especificada"}</td>
                  <td>
                    <button onClick={() => handleAction("edit", index)}>Editar</button>
                    <button onClick={() => handleAction("delete", index)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginación */}
          <div>
            <button 
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span> Página {currentPage} de {totalPages} </span>
            <button 
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      ) : <p>No hay registros disponibles.</p>}
    </div>
  );
};

export default Administracion; // Exporta el componente para ser usado en otras partes del proyecto
