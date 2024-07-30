import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Card from "../../../../components/card/Card.js";
import { Flex, Text, Box } from "@chakra-ui/react";

const HeatmapChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: 'heatmap',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true
        },
      }
    },
    stroke: {
      width: 0
    },
    plotOptions: {
      heatmap: {
        radius: 7,
        enableShades: false,
        colorScale: {
          ranges: []
        },
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
        fontSize: '10px'
      }
    },
    xaxis: {
      title: {
        text: 'Días'
      },
      type: 'category',
      categories: Array.from({ length: 31 }, (_, i) => i + 1),
      labels: {
        rotate: -45,
        rotateAlways: false,
        style: {
          fontSize: '10px'
        }
      }
    },
    yaxis: {
      title: {
        text: 'Meses'
      },
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      labels: {
        style: {
          fontSize: '10px'
        }
      }
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (value) {
          return `${value}°C`;
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 800
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const tavgValues = data.map(item => item.tavg);
      const min = Math.min(...tavgValues);
      const max = Math.max(...tavgValues);
      const avg = tavgValues.reduce((acc, val) => acc + val, 0) / tavgValues.length;

      const series = generateSeries(data, min, max, avg);
      setChartSeries(series);

      const ranges = [
        { from: 0, to: 0, color: '#CCCCCC' },
        { from: min, to: 22.98, color: '#00E396' },
        { from: 22.99, to: 24.999, color: '#FEB019' },
        { from: 25.0, to: max, color: '#FF4560' }
      ];

      setChartOptions(prevOptions => ({
        ...prevOptions,
        plotOptions: {
          ...prevOptions.plotOptions,
          heatmap: {
            ...prevOptions.plotOptions.heatmap,
            colorScale: { ranges }
          }
        }
      }));
    }
  }, [data]);

  const generateSeries = (data, min, max, avg) => {
    const series = Array.from({ length: 12 }, (_, i) => ({
      name: chartOptions.yaxis.categories[i],
      data: Array.from({ length: 31 }, (_, j) => ({
        x: j + 1,
        y: 0
      }))
    }));

    data.forEach(item => {
      const fecha = new Date(item.date);
      const mes = fecha.getMonth();
      const dia = fecha.getDate();
      const valor = item.tavg;

      series[mes].data[dia - 1].y = valor;
    });

    return series;
  };

  return (
    <Card align="center" direction="column" w="100%">
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" fontSize="xl" fontWeight="700" lineHeight="100%">
          Mapa de Calor de la Temperatura Promedio
        </Text>
      </Flex>
      <Box overflowX="auto" w="100%">
        <Box minWidth="800px">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="heatmap"
            height={350}
          />
        </Box>
      </Box>
    </Card>
  );
};

export default HeatmapChart;