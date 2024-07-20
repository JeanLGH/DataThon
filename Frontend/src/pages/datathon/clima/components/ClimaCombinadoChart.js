import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import Card from "../../../../components/card/Card.js";
import { Box, Text, Flex } from "@chakra-ui/react";

const ClimaCombinadoChart = ({ data }) => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});

  useEffect(() => {
    if (data && data.length > 0) {
      const sortedData = data.sort((a, b) => new Date(a.date) - new Date(b.date));

      const precipitacionData = sortedData.map(item => parseFloat(item.prcp));
      const temperaturaData = sortedData.map(item => parseFloat(item.tavg));
      const fechas = sortedData.map(item => item.date);

      setSeries([
        {
          name: 'Precipitación',
          type: 'column',
          data: precipitacionData
        },
        {
          name: 'Temperatura Promedio',
          type: 'line',
          data: temperaturaData
        }
      ]);

      setOptions({
        chart: {
          height: 350,
          type: 'line',
        },
        stroke: {
          width: [0, 4]
        },
        
        dataLabels: {
          enabled: false,
          enabledOnSeries: [1]
        },
        labels: fechas,
        xaxis: {
          type: 'datetime'
        },
        yaxis: [
          {
            title: {
              text: 'Precipitación promedio(mm)',
            },
          },
          {
            opposite: true,
            title: {
              text: 'Temperatura (°C)',
            },
          }
        ]
      });
    }
  }, [data]);

  return (
    <Card>
        <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" fontSize="xl" fontWeight="700" lineHeight="100%">
        Precipitación promedio y Temperatura Promedio Diario
        </Text>
      </Flex>
      {series.length > 0 ? (
        <ReactApexChart options={options} series={series} type="line" height={350} />
      ) : (
        <Box p={4}>
          <Text>Cargando datos...</Text>
        </Box>
      )}
    </Card>
  );
};

export default ClimaCombinadoChart;