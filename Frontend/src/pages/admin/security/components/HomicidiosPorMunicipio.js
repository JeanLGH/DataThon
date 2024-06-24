// ClimaHistograma.js
import React, { useState } from "react";
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import ClimaChart from "../../../../components/charts/security/LineColumnArea.js";

export default function ClimaHistograma({ data, ...rest }) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Histograma Climático
        </Text>
      </Flex>
      <Box h="350px" mt="auto" w="100%">
        <ClimaChart data={data} />
      </Box>
    </Card>
  );
}