import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import TotalNacimientos from "../../datathon/clima/components/TotalNacimientos";
import HeatmapChart from "../../datathon/clima/components/HeatmapChart";
import ClimaHistograma from "../../datathon/clima/components/TotalAfiliaciones";
import ClimaHistogramaBonito from "../../datathon/clima/components/TotalDisability";
import ClimaCombinadoChart from "../../datathon/clima/components/ClimaCombinadoChart";
import AverageCard from "../../datathon/clima/components/AverageCard";
import { fetchClimaData } from '../../../api';
import { FaTemperatureHigh, FaCloudRain } from "react-icons/fa";

export default function HealthReports() {
  const [climaData, setClimaData] = useState([]);
  const [tempStats, setTempStats] = useState({ avg: 0, min: 0, max: 0 });
  const [precipStats, setPrecipStats] = useState({ avg: 0, min: 0, max: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchClimaData();
      setClimaData(data);

      // Calcular estadísticas de temperatura
      const temps = data.map(item => item.tavg);
      setTempStats({
        avg: (temps.reduce((a, b) => a + b, 0) / temps.length).toFixed(1),
        min: Math.min(...temps).toFixed(1),
        max: Math.max(...temps).toFixed(1)
      });

      // Calcular estadísticas de precipitación
      const precips = data.map(item => item.prcp);
      setPrecipStats({
        avg: (precips.reduce((a, b) => a + b, 0) / precips.length).toFixed(1),
        min: Math.min(...precips).toFixed(1),
        max: Math.max(...precips).toFixed(1)
      });
    };
    fetchData();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <AverageCard 
          title="Temperatura Promedio" 
          value={tempStats.avg} 
          unit="°C" 
          icon={FaTemperatureHigh}
          minTemp={tempStats.min}
          maxTemp={tempStats.max}
        />
        <AverageCard 
          title="Precipitación Promedio" 
          value={precipStats.avg} 
          unit="mm" 
          icon={FaCloudRain}
          minTemp={precipStats.min}
          maxTemp={precipStats.max}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <TotalNacimientos nacimientosData={climaData} selectedYear={2023} />
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
          <ClimaCombinadoChart data={climaData} />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <HeatmapChart data={climaData}/> 
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <ClimaHistograma data={climaData} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <ClimaHistogramaBonito data={climaData} />
      </SimpleGrid>
    </Box>
  );
}