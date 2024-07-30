import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Text,
  Flex,
  Icon,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";

const AverageCard = ({ title, value, unit, icon, minTemp, maxTemp }) => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const accentColor = useColorModeValue('teal.500', 'teal.200');

  return (
    <Card
      p={6}
      shadow="xl"
      borderRadius="lg"
      bg={bgColor}
      _hover={{ transform: "translateY(-5px)", boxShadow: "2xl" }}
      transition="all 0.3s ease-in-out"
      overflow="hidden"
      position="relative"
    >
      <Box
        position="absolute"
        top="-20px"
        right="-20px"
        width="100px"
        height="100px"
        borderRadius="full"
        bg={useColorModeValue('teal.50', 'teal.900')}
        opacity="0.2"
      />
      <CardHeader>
        <Flex justify="space-between" align="center" mb={4}>
          <Icon as={icon} w={8} h={8} color={accentColor} />
          <Heading size="md" color={textColor}>{title}</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <Flex direction="column" align="center">
          <Text fontSize="4xl" fontWeight="bold" color={accentColor}>
            {value}
            <Text as="span" fontSize="2xl" ml={1}>{unit}</Text>
          </Text>
          <Flex justify="space-between" width="100%" mt={4}>
            <Box textAlign="center">
              <Text fontSize="sm" color="gray.500">Mín</Text>
              <Text fontSize="md" fontWeight="bold" color={textColor}>{minTemp}{unit}</Text>
            </Box>
            <Box textAlign="center">
              <Text fontSize="sm" color="gray.500">Máx</Text>
              <Text fontSize="md" fontWeight="bold" color={textColor}>{maxTemp}{unit}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default AverageCard;