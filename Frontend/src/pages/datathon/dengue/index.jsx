import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import DengueChart from "./components/DengueChart.jsx";
import DengueBarChart from "./components/TotalAccesosCarnales.js";
import DengueSi from "./components/TotalHurtos.js";
import DengueClimatico from "./components/TotalLesiones.js";
import { fetchDengueData, fetchClimaData } from '../../../api';

export default function SecurityReports() {
  const [dengueData, setDengueData] = useState([]);
  const [climaData, setClimaData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const dengue = await fetchDengueData();
      setDengueData(dengue);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const clima = await fetchClimaData();
      setClimaData(clima);
    };
    fetchData();
  }, []);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <DengueChart dengueData={dengueData} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        {dengueData.length > 0 ? (
          <DengueSi dengueData={dengueData} />
        ) : (
          <Box>Loading Dengue data...</Box>
        )}
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
        <DengueBarChart data={dengueData} />
        <DengueClimatico data={climaData} />
      </SimpleGrid>
    </Box>
  );
}
