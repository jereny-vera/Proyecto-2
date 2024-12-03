// Importa los hooks y componentes necesarios de React y React Router
import React, { useState, useEffect } from "react"; 
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // Para la navegación y las rutas en la aplicación
import Header from "./components/Header"; // Importa el componente Header
import Footer from "./components/Footer"; // Importa el componente Footer
import Login from "./components/Login"; // Importa el componente Login
import RegistroPersona from "./components/RegistroPersona"; // Importa el componente RegistroPersona
import ConsultarDatos from "./components/ConsultarDatos"; // Importa el componente ConsultarDatos
import SeguimientoDatos from "./components/SeguimientoDatos"; // Importa el componente SeguimientoDatos
import Reportes from "./components/Reportes"; // Importa el componente Reportes
import Administracion from "./components/Administracion"; // Importa el componente Administracion
import Ayuda from "./components/Ayuda"; // Importa el componente Ayuda
import { isAuthenticated, logout } from "./services/auth"; // Importa las funciones de autenticación

// Componente principal de la aplicación
const App = () => {
  // Hook para manejar el estado de si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated()); // El estado inicial se basa en la función isAuthenticated

  // Función que se llama cuando el usuario inicia sesión
  const handleLogin = () => {
    setIsLoggedIn(true);  // Actualiza el estado a 'logueado'
  };

  // Función que se llama cuando el usuario cierra sesión
  const handleLogout = () => {
    setIsLoggedIn(false); // Actualiza el estado a 'no logueado'
    localStorage.removeItem("isLoggedIn");  // Elimina la clave 'isLoggedIn' en el almacenamiento local
    logout();  // Llama a la función logout para limpiar cualquier otro dato relacionado con la sesión
  };

  return (
    // Envoltorio del enrutamiento de la aplicación
    <Router>
      <div className="app">
        {/* Muestra el componente Header solo si el usuario está logueado */}
        {isLoggedIn && <Header onLogout={handleLogout} />}
        <main>
          <Routes>
            {/* Ruta principal que redirige a /registro-persona si el usuario está logueado, o muestra el Login si no lo está */}
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/registro-persona" />  // Si está logueado, redirige a la ruta '/registro-persona'
                ) : (
                  <Login onLogin={handleLogin} />  // Si no está logueado, muestra el formulario de Login
                )
              }
            />
            {/* Rutas protegidas que solo son accesibles si el usuario está logueado */}
            <Route
              path="/registro-persona"
              element={isLoggedIn ? <RegistroPersona /> : <Navigate to="/" />}  // Redirige a Login si no está logueado
            />
            <Route
              path="/consultar-datos"
              element={isLoggedIn ? <ConsultarDatos /> : <Navigate to="/" />}  // Redirige a Login si no está logueado
            />
            <Route
              path="/seguimiento-datos"
              element={isLoggedIn ? <SeguimientoDatos /> : <Navigate to="/" />}  // Redirige a Login si no está logueado
            />
            <Route
              path="/reportes"
              element={isLoggedIn ? <Reportes /> : <Navigate to="/" />}  // Redirige a Login si no está logueado
            />
            <Route
              path="/administracion"
              element={isLoggedIn ? <Administracion /> : <Navigate to="/" />}  // Redirige a Login si no está logueado
            />
            <Route
              path="/ayuda"
              element={isLoggedIn ? <Ayuda /> : <Navigate to="/" />}  // Redirige a Login si no está logueado
            />
            {/* Ruta por defecto que redirige a la ruta principal si el usuario no coincide con ninguna ruta */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        {/* Muestra el componente Footer solo si el usuario está logueado */}
        {isLoggedIn && <Footer />}
      </div>
    </Router>
  );
};

export default App; // Exporta el componente App para usarlo en otros archivos
