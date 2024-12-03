// src/components/Login.js
// Importamos React y el hook useState para gestionar el estado en el componente
import React, { useState } from "react"; 
// Importamos useNavigate para poder redirigir a otras rutas
import { useNavigate } from "react-router-dom"; 
// Importamos la función de login desde el servicio de autenticación
import { login } from "../services/auth"; 

/**
 * Componente Login: Permite a los usuarios autenticarse en el sistema.
 * 
 * Este componente maneja el formulario de inicio de sesión, 
 * donde el usuario ingresa su correo y contraseña. La información se valida
 * a través de la función 'login' y, si es correcta, redirige al usuario a la página principal.
 * Si la autenticación falla, se muestra un mensaje de error.
 */
const Login = ({ onLogin }) => {
  // Declaración de los estados que se usan para almacenar el email, contraseña, 
  // mensaje de error, y el hook para la navegación
  const [email, setEmail] = useState(""); // Estado para almacenar el email ingresado
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña ingresada
  const [errorMessage, setErrorMessage] = useState(""); // Estado para almacenar el mensaje de error
  const navigate = useNavigate(); // Hook para redirigir al usuario después de iniciar sesión correctamente

  /**
   * handleSubmit: Función que se ejecuta cuando el formulario es enviado.
   * 
   * Primero previene el comportamiento por defecto del formulario, que es recargar la página.
   * Luego, valida las credenciales llamando a la función 'login'. Si las credenciales son correctas,
   * llama a onLogin() para actualizar el estado de login en el componente padre y redirige
   * al usuario a la página de registro de personas.
   * Si las credenciales son incorrectas, se muestra un mensaje de error.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenimos la acción por defecto del formulario (recargar la página)
    
    // Validación de las credenciales de inicio de sesión
    // Llamamos a la función login pasando email y password
    if (login(email, password)) {
      onLogin(); // Si las credenciales son correctas, se llama a onLogin() para actualizar el estado de login
      navigate("/registro-persona"); // Redirigimos al usuario a la página de registro
    } else {
      // Si las credenciales son incorrectas, mostramos el mensaje de error
      setErrorMessage("Correo o contraseña incorrectos");
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {/* Formulario para que el usuario ingrese su correo y contraseña */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          {/* Campo de entrada para el correo */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Actualiza el estado 'email' con el valor ingresado
            required // Campo obligatorio
          />
        </div>
        <div>
          <label>Contraseña</label>
          {/* Campo de entrada para la contraseña */}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Actualiza el estado 'password' con el valor ingresado
            required // Campo obligatorio
          />
        </div>
        {/* Si hay un mensaje de error, se muestra aquí */}
        {errorMessage && <p>{errorMessage}</p>} 
        {/* Botón de envío del formulario */}
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
