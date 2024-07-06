import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import TotalNacimientos from "../../admin/health/components/TotalNacimientos";
import HeatmapChart from "../../admin/health/components/HeatmapChart"; // Ruta al archivo HeatmapChart.js

import ClimaHistograma from "../../admin/health/components/TotalAfiliaciones";

import ClimaHistogramaBonito from "../../admin/health/components/TotalDisability";

export default function HealthReports() {
  // Estado para los datos de clima
  const [climaData, setClimaData] = useState([]);
  // Fetch data de clima
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseClima = await fetch('https://datathonbackend-latest.onrender.com/clima');
        if (!responseClima.ok) {
          throw new Error("Error al obtener los datos de clima del servidor");
        }
        const dataClima = await responseClima.json();
        setClimaData(dataClima);
      } catch (error) {
        console.error("Error al obtener los datos de clima:", error);
      }
    };
    fetchData();
  }, []);

  //clima
  const [datosClima, setDatosClima] = useState([]);

  useEffect(() => {
    // Fetch data clima
    const fetchDataClima = async () => {
      try {
        const response = await fetch("https://datathonbackend-latest.onrender.com/clima");
        if (!response.ok) {
          throw new Error("Error al obtener los datos climáticos del servidor");
        }
        const data = await response.json();
        setDatosClima(data);
      } catch (error) {
        console.error("Error al obtener los datos climáticos:", error);
      }
    };

    fetchDataClima();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <TotalNacimientos
          nacimientosData={climaData} // Pasamos los datos de clima a TotalNacimientos
          selectedYear={2023} // Cambiar según tu lógica de selección de año
        />
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
          <HeatmapChart data={climaData}/> {/* Agregamos el HeatmapChart aquí */}
        </SimpleGrid>
      
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
          <ClimaHistograma data={datosClima} />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
          <ClimaHistogramaBonito data={datosClima} />
        </SimpleGrid>

      
    </Box>
  );
}
