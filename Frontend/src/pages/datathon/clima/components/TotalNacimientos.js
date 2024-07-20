import React from "react";
import { Box, Flex, Select, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";
import SlopeChart from "../../../../components/charts/common/SlopeChart.js";

export default function TotalNacimientos({
  nacimientosData,
  selectedYear,
  handleYearChange,
  ...rest
}) {
  const textColor = useColorModeValue("secondaryGray.900", "white");

  // Función para agrupar los datos por meses y ordenarlos
  const groupDataByMonth = (data) => {
    const groupedData = {};
    data.forEach(item => {
      const month = new Date(item.date).toLocaleString('default', { month: 'short' });
      if (!groupedData[month]) {
        groupedData[month] = {
          prcp: [],
          tavg: []
        };
      }
      groupedData[month].prcp.push(item.prcp);
      groupedData[month].tavg.push(item.tavg);
    });

    // Lista de meses en el orden correcto
    const monthOrder = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

    // Ordenar los datos agrupados por el orden de los meses
    const sortedData = monthOrder.map(month => ({
      month,
      prcp: groupedData[month] ? groupedData[month].prcp.reduce((acc, curr) => acc + curr, 0) / groupedData[month].prcp.length : 0,
      tavg: groupedData[month] ? groupedData[month].tavg.reduce((acc, curr) => acc + curr, 0) / groupedData[month].tavg.length : 0
    }));

    return sortedData;
  };

  // Filtrar y preparar datos agrupados para el gráfico
  const chartData = groupDataByMonth(nacimientosData);

  return (
    <Card align="center" direction="column" w="100%" {...rest}>
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" color={textColor} fontSize="xl" fontWeight="700" lineHeight="100%">
          Datos de Clima
        </Text>
        <Select value={selectedYear} onChange={handleYearChange}>
          <option value="2023">2023</option>
        </Select>
      </Flex>
      <Box h="350px" mt="auto">
        <SlopeChart data={chartData} />
      </Box>
    </Card>
  );
}
