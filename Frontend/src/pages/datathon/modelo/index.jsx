import React from 'react';
import { Box } from '@chakra-ui/react';

const Modelo = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" h="100vh" overflow="hidden" m={0} p={0}>
      <iframe
        src="https://jedsdenguereport.netlify.app/"
        style={{
          width: '100%',
          height: '100%',
          border: 'none'
        }}
        title="Modelo Predictivo"
      />
    </Box>
  );
};

export default Modelo;