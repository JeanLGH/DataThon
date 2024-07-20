// index.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import DengueChart from "./components/DengueChart.jsx";
import DengueBarChart from "./components/TotalAccesosCarnales.js";
import DengueSi from "./components/TotalHurtos.js";
import DengueClimatico from "./components/TotalLesiones.js";


export default function SecurityReports() {

  const [dengueData, setDengueData] = useState([]);
  const [climaData, setClimaData] = useState([]);

  useEffect(() => {
    fetch("https://datathonbackend-latest.onrender.com/dengue")
      .then((response) => response.json())
      .then((data) => {
        setDengueData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    fetch("https://datathonbackend-latest.onrender.com/clima")
      .then((response) => response.json())
      .then((data) => {
        setClimaData(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
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
