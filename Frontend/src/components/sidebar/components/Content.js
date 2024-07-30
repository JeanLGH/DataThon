// chakra imports
import { Box, Flex, Stack, Image } from "@chakra-ui/react";
// Custom components
import Brand from "../components/Brand";
import Links from "../components/Links";
import React from "react";

// Asume que tienes la imagen del logo en tu proyecto
import logoImage from "../../../assets/img/dashboards/datathonLogo.png"; // Ajusta la ruta según la ubicación de tu logo

function SidebarContent({ routes }) {
  return (
    <Flex direction='column' height='100%' pt='25px' px="16px" borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>
      <Flex justifyContent="center" mt="auto" mb="20px">
        <Image 
          src={logoImage} 
          alt="Logo" 
          maxWidth="150px" 
          objectFit="contain"
        />
      </Flex>
    </Flex>
  );
}

export default SidebarContent;