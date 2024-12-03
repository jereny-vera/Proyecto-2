// src/services/data.js

// Arreglo donde se almacenarán los registros de personas
let registros = [];  // Inicializamos un arreglo vacío para almacenar los datos de las personas

// Función para agregar una nueva persona al arreglo de registros
export const agregarPersona = (persona) => {
  // Añadimos el objeto persona al arreglo de registros
  registros.push(persona);  // `persona` es un objeto que contiene los datos de una persona, como nombre, apellido, etc.
};

// Función para obtener todos los registros de personas almacenados
export const obtenerRegistros = () => {
  // Retorna el arreglo completo de registros
  return registros;  // Esta función devolverá todos los elementos en el arreglo `registros`
};
