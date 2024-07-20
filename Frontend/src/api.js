// src/api/fetchData.js

export const fetchClimaData = async () => {
    try {
      const response = await fetch('https://datathonbackend-latest.onrender.com/clima');
      if (!response.ok) {
        throw new Error("Error al obtener los datos de clima del servidor");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los datos de clima:", error);
      return [];
    }
  };
  
  export const fetchDengueData = async () => {
    try {
      const response = await fetch('https://datathonbackend-latest.onrender.com/dengue');
      if (!response.ok) {
        throw new Error("Error al obtener los datos de dengue del servidor");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al obtener los datos de dengue:", error);
      return [];
    }
  };
  