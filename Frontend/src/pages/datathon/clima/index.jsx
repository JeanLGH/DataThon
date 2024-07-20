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
import { fetchClimaData } from '../../../api';

export default function HealthReports() {
  const [climaData, setClimaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchClimaData();
      setClimaData(data);
    };
    fetchData();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <TotalNacimientos
          nacimientosData={climaData}
          selectedYear={2023}
        />
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
