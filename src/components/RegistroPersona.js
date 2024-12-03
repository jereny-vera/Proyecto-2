// Importamos React y el hook useState para gestionar el estado de los datos del formulario
import React, { useState } from "react";
// Importamos el hook useNavigate para redirigir al usuario después de registrar los datos
import { useNavigate } from "react-router-dom";

const RegistroPersona = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    nombre: "", apellido: "", edad: "", direccion: "", discapacidad: "", telefono: "",
  });

  // Estado para almacenar los mensajes de error de validación
  const [errors, setErrors] = useState({ telefono: "", discapacidad: "" });

  // Hook para redirigir al usuario a otra página (en este caso, después de registrar la persona)
  const navigate = useNavigate();

  // Función que maneja el cambio de los valores en el formulario
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Función de validación para el teléfono (debe tener exactamente 10 dígitos)
  const validateTelefono = (telefono) => /^[0-9]{10}$/.test(telefono) ? "" : "El teléfono debe tener 10 dígitos.";

  // Función de validación para la discapacidad (no debe estar vacía)
  const validateDiscapacidad = (discapacidad) => discapacidad ? "" : "Seleccione una discapacidad.";

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se recargue al enviarlo
    const { telefono, discapacidad } = formData;

    // Realizamos las validaciones del teléfono y la discapacidad
    const telefonoError = validateTelefono(telefono);
    const discapacidadError = validateDiscapacidad(discapacidad);

    // Si hay errores o algún campo está vacío, mostramos los errores y no enviamos el formulario
    if (telefonoError || discapacidadError || Object.values(formData).some(value => value === "")) {
      setErrors({ telefono: telefonoError, discapacidad: discapacidadError });
      return;
    }

    // Obtenemos los datos existentes en el localStorage (si hay) o creamos un array vacío
    const personas = JSON.parse(localStorage.getItem("personas")) || [];
    
    // Agregamos la nueva persona al array de personas
    personas.push(formData);
    
    // Guardamos los datos actualizados en el localStorage
    localStorage.setItem("personas", JSON.stringify(personas));

    // Limpiamos el formulario después de enviarlo
    setFormData({ nombre: "", apellido: "", edad: "", direccion: "", discapacidad: "", telefono: "" });

    // Redirigimos al usuario a la página de consulta después del registro
    navigate("/consultar");
  };

  return (
    <div>
      <h2>Registrar Persona</h2>
      <form onSubmit={handleSubmit}>
        {/* Mapeamos los campos básicos del formulario (nombre, apellido, edad, direccion) */}
        {["nombre", "apellido", "edad", "direccion"].map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
            <input 
              type={field === "edad" ? "number" : "text"}  // El campo "edad" es numérico
              name={field} 
              value={formData[field]} 
              onChange={handleChange}  // Llamamos a handleChange para actualizar el estado
              required  // Este campo es obligatorio
            />
          </div>
        ))}

        {/* Campo select para elegir la discapacidad */}
        <div>
          <label>Discapacidad:</label>
          <select 
            name="discapacidad" 
            value={formData.discapacidad} 
            onChange={handleChange}  // Llamamos a handleChange para actualizar el estado
            required  // Este campo es obligatorio
          >
            <option value="">Seleccione una discapacidad</option>
            <option value="Visual">Visual</option>
            <option value="Auditiva">Auditiva</option>
            <option value="Motora">Motora</option>
            <option value="Cognitiva">Cognitiva</option>
          </select>
          {/* Mostramos el error de discapacidad si existe */}
          {errors.discapacidad && <p style={{ color: "red" }}>{errors.discapacidad}</p>}
        </div>

        {/* Campo para el teléfono, validado con la expresión regular */}
        <div>
          <label>Teléfono:</label>
          <input 
            type="tel" 
            name="telefono" 
            value={formData.telefono} 
            onChange={(e) => {
              handleChange(e);  // Actualizamos el estado con el valor del campo
              setErrors({ ...errors, telefono: validateTelefono(e.target.value) });  // Validamos el teléfono en tiempo real
            }} 
            required  // Este campo es obligatorio
          />
          {/* Mostramos el error de teléfono si existe */}
          {errors.telefono && <p style={{ color: "red" }}>{errors.telefono}</p>}
        </div>

        {/* Botón de enviar, que se desactiva si hay errores */}
        <button 
          type="submit" 
          disabled={errors.telefono || errors.discapacidad}  // El botón se desactiva si hay errores de validación
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegistroPersona;
