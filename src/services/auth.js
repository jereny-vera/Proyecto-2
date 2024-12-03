// src/services/auth.js

// Función para autenticar a un usuario con email y contraseña
export const login = (email, password) => {
  // En un entorno real, no guardes la contraseña directamente en localStorage
  // Definimos las credenciales almacenadas como ejemplo (en un entorno real, estos deben estar en un backend seguro)
  const storedEmail = "user@example.com";  // Esto debería provenir de un sistema de backend en producción
  const storedPassword = "password123";  // Esto también debería estar en un sistema seguro

  // Comprobamos si el correo y la contraseña proporcionados coinciden con los valores almacenados
  if (email === storedEmail && password === storedPassword) {
    // Si las credenciales son correctas, marcamos al usuario como autenticado
    localStorage.setItem("isLoggedIn", "true");  // Guardamos un indicador de que el usuario está autenticado
    localStorage.setItem("email", email); // Almacenamos el email del usuario para futuros usos
    return true;  // Retornamos true indicando que el login fue exitoso
  }

  // Si las credenciales no coinciden, retornamos false
  return false;
};

// Función para verificar si el usuario está autenticado
export const isAuthenticated = () => {
  // Verificamos si el indicador de sesión "isLoggedIn" está presente y tiene el valor "true" en localStorage
  return localStorage.getItem("isLoggedIn") === "true";  // Retorna true si el usuario está autenticado
};

// Función para cerrar la sesión del usuario
export const logout = () => {
  // Eliminamos el estado de sesión y la información almacenada en localStorage
  localStorage.removeItem("isLoggedIn");  // Eliminamos el indicador de inicio de sesión
  localStorage.removeItem("email");       // Eliminamos el email del usuario
  localStorage.removeItem("password");    // Si es que almacenaste la contraseña (no recomendado)
};
