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

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchClimaData();
      setClimaData(data);
    };
    fetchData();
  }, []);

  const averageTemp = (climaData.reduce((acc, item) => acc + item.tavg, 0) / climaData.length).toFixed(1);
  const averagePrecip = (climaData.reduce((acc, item) => acc + item.prcp, 0) / climaData.length).toFixed(1);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <AverageCard title="Temperatura Promedio" value={averageTemp} unit="°C" icon={FaTemperatureHigh} />
        <AverageCard title="Precipitación Promedio" value={averagePrecip} unit="mm" icon={FaCloudRain} />
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
