//INDEX MODELO
// pages/datathon/modelo/index.jsx

import React from 'react';
import { Box, Button } from '@chakra-ui/react';

const Modelo = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="100vh"
      w="100vw"
      overflow="hidden"
      m={0}
      p={0}
    >
      <Button
        as="a"
        href="https://jedsdenguereport.netlify.app/"
        target="_blank"
        rel="noopener noreferrer"
        colorScheme="blue"
      >
        Abrir Modelo Predictivo
      </Button>
    </Box>
  );
};

export default Modelo;


