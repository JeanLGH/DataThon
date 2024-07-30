import React from 'react';
import {
  Card,
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
      p={3}
      shadow="md"
      borderRadius="lg"
      bg={bgColor}
      _hover={{ transform: "translateY(-2px)", boxShadow: "md" }}
      transition="all 0.2s ease-in-out"
    >
      <CardBody>
        <Flex align="center" mb={2}>
          <Icon as={icon} w={5} h={5} color={accentColor} mr={2} />
          <Heading size="sm" color={textColor}>{title}</Heading>
        </Flex>
        <Flex justify="space-between" align="baseline">
          <Text fontSize="2xl" fontWeight="bold" color={accentColor}>
            {value}
            <Text as="span" fontSize="md" ml={1}>{unit}</Text>
          </Text>
          <Box textAlign="right">
            <Text fontSize="xs" color="gray.500">Min / Max</Text>
            <Text fontSize="sm" fontWeight="medium" color={textColor}>
              {minTemp}{unit} / {maxTemp}{unit}
            </Text>
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default AverageCard;