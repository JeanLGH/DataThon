import React, { useEffect, useState } from "react";
import {
  Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import '../../../assets/css/App.css';
import MiniStatistics from "../../../components/card/MiniStatistics";
import IconBox from "../../../components/icons/IconBox";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";

//Violecia Intrafamiliar
import VictimasDesplazamiento from "../violence/components/VictimasDesplazamiento";

//Conflictos armados
import ConflictosArmados from "../violence/components/ConflictosArmados";
import MuertesViolentasDescriptivo from "./components/MuertesViolentasDescriptivo";

//Muertes Violentas
import MuertesViolentas from "../violence/components/MuertesViolentas";

export default function ViolenceReports() {

  //Conflictos Armados
  const [conflictosArmadosData, setConflictosArmadosData] = useState([]);

  //Muertes Violentas
  const [muertesViolentasData, setMuertesViolentasData] = useState([]);

  //Desplazamientos forzados
  const [dataDesplazados, setDataDesplazados] = useState([]);

  // Constants
  //mapa const center = [2.283333, -76.85];
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");




  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 3, lg: 3, "2xl": 3 }}
        gap='20px'
        mb='20px'
      >
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={BsGenderMale} color={brandColor} />
              }
            />
          }
          name={`card`}
          value={2020}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={BsGenderMale} color={brandColor} />
              }
            />
          }
          name={`Nacimientos de Hombres en 2022`}
          value={20202}
        />
        <MiniStatistics
          startContent={
            <IconBox
              w='56px'
              h='56px'
              bg={boxBg}
              icon={
                <Icon w='32px' h='32px' as={BsGenderFemale} color={brandColor} />
              }
            />
          }
          name={`Nacimientos de Mujeres en 2021`}
          value={4334}
        />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <ConflictosArmados data={conflictosArmadosData} />
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <MuertesViolentasDescriptivo data={muertesViolentasData} />
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
        <SimpleGrid columns={{ base: 1, md: 2, xl: 1 }} gap="20px">
          <VictimasDesplazamiento data={dataDesplazados} />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap="20px" mb="20px">
        <MuertesViolentas data={muertesViolentasData} />
      </SimpleGrid>
    </Box>
  );
}
