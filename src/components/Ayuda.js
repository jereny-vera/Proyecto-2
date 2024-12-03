// Importamos React y el hook useState
import React, { useState } from "react";

// Componente funcional Ayuda
const Ayuda = () => {
  // Definimos los estados locales con useState
  const [email, setEmail] = useState(""); // Estado para almacenar el correo electrónico ingresado
  const [message, setMessage] = useState(""); // Estado para almacenar el mensaje ingresado
  const [submitted, setSubmitted] = useState(false); // Estado para determinar si el formulario fue enviado exitosamente

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenimos el comportamiento predeterminado del formulario (recargar la página)

    // Aquí puedes realizar acciones como enviar el mensaje a un servidor o API
    setSubmitted(true); // Cambiamos el estado a "enviado"

    // Limpiamos los campos del formulario después de enviarlo
    setEmail("");
    setMessage("");
  };

  return (
    <div className="ayuda-container"> {/* Contenedor principal del componente */}
      <h2>Ayuda</h2> {/* Título principal de la sección */}

      {/* Primera sección: Instrucciones para registrar una persona */}
      <section>
        <h3>¿Cómo registrar una persona?</h3>
        <p>Para registrar una persona, navega a la sección "Registrar Persona" y completa el formulario.</p>
      </section>

      {/* Segunda sección: Preguntas Frecuentes (FAQ) */}
      <section>
        <h3>Preguntas Frecuentes (FAQ)</h3>
        <ul>
          <li>
            <strong>¿Cómo ver los registros?</strong>
            <p>Puedes ver los registros de personas desde la sección "Consultar Datos".</p>
          </li>
          <li>
            <strong>¿Puedo editar o eliminar registros?</strong>
            <p>Sí, puedes editar o eliminar registros desde la sección de administración.</p>
          </li>
        </ul>
      </section>

      {/* Tercera sección: Formulario de contacto */}
      <section>
        <h3>Formulario de Contacto</h3>

        {/* Mensaje de agradecimiento si el formulario ya fue enviado */}
        {submitted ? (
          <p>Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.</p>
        ) : (
          // Formulario de contacto
          <form onSubmit={handleSubmit}> {/* Al enviar, llama a handleSubmit */}
            <div>
              <label htmlFor="email">Correo electrónico:</label> {/* Etiqueta del campo de correo electrónico */}
              <input
                type="email" // Especificamos que es un campo de tipo email
                id="email" // ID único para el campo
                value={email} // Asociamos el estado 'email' al valor del campo
                onChange={(e) => setEmail(e.target.value)} // Actualizamos el estado al escribir
                required // Validación: Campo obligatorio
              />
            </div>
            <div>
              <label htmlFor="message">Mensaje:</label> {/* Etiqueta del campo de texto para el mensaje */}
              <textarea
                id="message" // ID único para el campo
                value={message} // Asociamos el estado 'message' al valor del campo
                onChange={(e) => setMessage(e.target.value)} // Actualizamos el estado al escribir
                required // Validación: Campo obligatorio
              ></textarea>
            </div>
            <button type="submit">Enviar mensaje</button> {/* Botón para enviar el formulario */}
          </form>
        )}
      </section>
    </div>
  );
};

export default Ayuda; // Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
