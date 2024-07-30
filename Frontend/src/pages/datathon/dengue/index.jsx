import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import DengueChart from "./components/DengueChart.jsx";
import DengueBarChart from "./components/TotalAccesosCarnales.js";
import DengueSi from "./components/TotalHurtos.js";
import DengueClimatico from "./components/TotalLesiones.js";
import DengueKPI from "./components/DengueKPI.jsx";
import { fetchDengueData, fetchClimaData } from '../../../api';
import { FaUserInjured, FaMale, FaFemale } from 'react-icons/fa';

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

  const totalHospitalized = dengueData.filter(caso => caso.hospitalizado === 'Si').length;
  const malesHospitalized = dengueData.filter(caso => caso.hospitalizado === 'Si' && caso.sexo === 'M').length;
  const femalesHospitalized = dengueData.filter(caso => caso.hospitalizado === 'Si' && caso.sexo === 'F').length;

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 3, xl: 3 }} gap="20px" mb="20px">
        <DengueKPI title="Total Hospitalizados" value={totalHospitalized} total={dengueData.length} icon={FaUserInjured} />
        <DengueKPI title="Hombres Hospitalizados" value={malesHospitalized} total={totalHospitalized} icon={FaMale} />
        <DengueKPI title="Mujeres Hospitalizadas" value={femalesHospitalized} total={totalHospitalized} icon={FaFemale} />
      </SimpleGrid>

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