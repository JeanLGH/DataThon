import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Flex, Text } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";

const DengueBarChart = ({ data }) => {
  const [chartData, setChartData] = useState({ series: [], categories: [] });

  const processData = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const date = new Date(item.fecha_inicio_sintomas);
      const month = date.getMonth();
      const year = date.getFullYear();
      const key = `${year}-${month.toString().padStart(2, '0')}`;

      if (!groupedData[key]) {
        groupedData[key] = { F: 0, M: 0, date };
      }
      groupedData[key][item.sexo] += 1;
    });

    return groupedData;
  };

  useEffect(() => {
    const groupedData = processData(data);
    const sortedKeys = Object.keys(groupedData).sort();
    const categories = sortedKeys.map(key => {
      const date = groupedData[key].date;
      return date.toLocaleString('default', { month: 'short', year: 'numeric' });
    });
    const series = [
      {
        name: 'Femenino',
        data: sortedKeys.map((key) => groupedData[key].F),
      },
      {
        name: 'Masculino',
        data: sortedKeys.map((key) => groupedData[key].M),
      },
    ];

    setChartData({ series, categories });
  }, [data]);

  const options = {
    chart: {
      type: 'bar',
      height: 400,
      stacked: true,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '55%',
        endingShape: 'rounded',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: chartData.categories,
      labels: {
        rotate: -45,
        formatter: function (val) {
          return val.length > 10 ? `${val.substring(0, 10)}...` : val;
        }
      }
    },
    yaxis: {
      title: {
        text: 'Número de Casos',
      },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} casos`,
      },
    },
    colors: ['#0088FE', '#FF8042'],
  };

  return (
    <div id="chart">
      <Card align="center" direction="column" w="100%" >
        <Flex align="center" w="100%" px="15px" py="10px">
          <Text me="auto" fontSize="xl" fontWeight="700" lineHeight="100%">
            Casos por género
          </Text>
        </Flex>
        <Chart options={options} series={chartData.series} type="bar" height={400} />
      </Card>
    </div>
  );
};

export default DengueBarChart;