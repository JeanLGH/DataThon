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
} from "@chakra-ui/react";
const AverageCard = ({ title, value, unit, icon }) => {
  return (
    <Card
      p={4}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg={useColorModeValue('white', 'gray.800')}
      _hover={{ transform: "scale(1.02)", boxShadow: "lg" }}
      transition="transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out"
      textAlign="center"
    >
      <CardHeader>
        <Flex justify="center" align="center" mb={2}>
          <Icon as={icon} w={6} h={6} mr={2} color="teal.500" />
          <Heading size="sm">{title}</Heading>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontSize="lg" fontWeight="semibold">
          {value} <Text as="span" fontSize="md" color="gray.500">{unit}</Text>
        </Text>
      </CardBody>
    </Card>
  );
};

export default AverageCard;
