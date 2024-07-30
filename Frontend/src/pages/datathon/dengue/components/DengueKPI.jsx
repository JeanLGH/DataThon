// DengueKPI.jsx
import React from 'react';
import {
  Box,
  Flex,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";

const DengueKPI = ({ title, value, total, icon }) => {
  const percentage = Math.round((value / total) * 100);
  
  return (
    <Box
      px={4}
      py={5}
      shadow={'xl'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      rounded={'lg'}
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Flex justifyContent={'space-between'} alignItems={'center'} mb={2}>
        <Text fontWeight={'medium'} fontSize={'lg'}>
          {title}
        </Text>
        <Icon as={icon} w={6} h={6} color={'purple.500'} />
      </Flex>
      <Flex justifyContent={'center'} alignItems={'center'}>
        <CircularProgress 
          value={percentage} 
          color="purple.400" 
          size="120px"
          thickness="12px"
        >
          <CircularProgressLabel>{percentage}%</CircularProgressLabel>
        </CircularProgress>
      </Flex>
      <Flex justifyContent={'space-between'} mt={2}>
        <Text fontSize={'sm'} color={'gray.500'}>Total: {value}</Text>
        <Text fontSize={'sm'} color={'gray.500'}>de {total}</Text>
      </Flex>
    </Box>
  );
};

export default DengueKPI;