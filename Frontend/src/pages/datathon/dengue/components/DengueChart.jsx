import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Card from "../../../../components/card/Card.js";
import { Flex, Text } from "@chakra-ui/react";

const DengueChart = ({ dengueData }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'chart2',
      type: 'line',
      height: 230,
      toolbar: {
        autoSelected: 'pan',
        show: true
      }
    },
    colors: ['#7457D8'],
    stroke: {
      width: 3
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 1,
    },
    markers: {
      size: 0
    },
    xaxis: {
      type: 'datetime'
    }
  });

  const [brushChartOptions, setBrushChartOptions] = useState({
    chart: {
      id: 'chart1',
      height: 130,
      type: 'area',
      brush: {
        target: 'chart2',
        enabled: true
      },
      selection: {
        enabled: true,
      },
    },
    colors: ['#7457D8'],
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.91,
        opacityTo: 0.1,
      }
    },
    xaxis: {
      type: 'datetime',
      tooltip: {
        enabled: false
      }
    },
    yaxis: {
      tickAmount: 2
    }
  });

  const [chartSeries, setChartSeries] = useState([]);
  const [brushChartSeries, setBrushChartSeries] = useState([]);

  useEffect(() => {
    if (dengueData.length > 0) {
      const dates = [];
      const symptomCounts = [];

      dengueData.forEach(caso => {
        const fechaInicio = new Date(caso.fecha_inicio_sintomas).toISOString().split('T')[0];
        const index = dates.findIndex(item => item === fechaInicio);

        if (index === -1) {
          dates.push(fechaInicio);
          symptomCounts.push({
            fecha: fechaInicio,
            count: countSymptoms(caso)
          });
        } else {
          symptomCounts[index].count += countSymptoms(caso);
        }
      });

      dates.sort();

      const seriesData = dates.map(date => {
        const index = symptomCounts.findIndex(item => item.fecha === date);
        return {
          x: new Date(date).getTime(),
          y: symptomCounts[index].count
        };
      });

      setChartSeries([{ name: 'Casos de hospitalizados', data: seriesData }]);
      setBrushChartSeries([{ name: 'Casos de hospitalizados', data: seriesData }]);
    }
  }, [dengueData]);

  const countSymptoms = (caso) => {
    return caso.hospitalizado === 'Si' ? 1 : 0;
  };

  return (
    <Card align="center" direction="column" w="100%">
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" fontSize="xl" fontWeight="700" lineHeight="100%">
          Casos de hospitalizados en el año 2023
        </Text>
      </Flex>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={230}
      />
      <Chart
        options={brushChartOptions}
        series={brushChartSeries}
        type="area"
        height={130}
      />
    </Card>
  );
};

export default DengueChart;