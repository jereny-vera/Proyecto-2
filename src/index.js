// Importa React y ReactDOM para usar React y renderizar la aplicación en el DOM
import React from 'react';  // Importa React para utilizarlo en los componentes
import ReactDOM from 'react-dom/client'; // Importa ReactDOM con el método correcto para React 18+
import App from './App';  // Importa el componente principal de la aplicación (App)
import './App.css';  // Importa el archivo CSS de la aplicación para los estilos globales

// Se obtiene el elemento con el id 'root' del DOM, donde se montará la aplicación React
const root = ReactDOM.createRoot(document.getElementById('root')); // Utiliza el método 'createRoot' para crear un punto de entrada en el DOM

// Se renderiza la aplicación dentro del contenedor root
root.render(
  <React.StrictMode>  {/* Modo estricto de React para ayudar a detectar posibles problemas durante el desarrollo */}
    <App />  {/* Componente principal de la aplicación */}
  </React.StrictMode>
);
