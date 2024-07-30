import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Box, Flex, Text } from "@chakra-ui/react";
import Card from "../../../../components/card/Card.js";


const DengueBarChart = ({ data }) => {
  const [chartData, setChartData] = useState({ series: [], options: {} });
  const [selectedMonth, setSelectedMonth] = useState('1'); // Por defecto, seleccionar Enero (valor '1')

  // Función para procesar los datos y obtener las series y opciones para el gráfico
  const processData = (data, selectedMonth) => {
    // Filtrar los datos por mes si se ha seleccionado uno específico
    let filteredData = data;
    if (selectedMonth !== 'all') {
      const monthIndex = parseInt(selectedMonth) - 1; // Convertir a índice de mes (0-11)
      filteredData = data.filter(item => new Date(item.date).getMonth() === monthIndex);
    }

    // Filtrar los datos para separar días con y sin casos reportados de dengue
    const dataConDengue = filteredData.filter(item => item.dengue_reportado === 1 && item.tavg);
    const dataSinDengue = filteredData.filter(item => item.dengue_reportado === 0 && item.tavg);

    // Obtener las temperaturas promedio para los días con y sin dengue
    const temperaturasConDengue = dataConDengue.map(item => item.tavg);
    const temperaturasSinDengue = dataSinDengue.map(item => item.tavg);

    // Crear las series para el gráfico de barras agrupadas
    const series = [{
      name: 'Con Dengue',
      data: temperaturasConDengue
    }, {
      name: 'Sin Dengue',
      data: temperaturasSinDengue
    }];

    // Crear opciones para el gráfico
    const options = {
      chart: {
        type: 'bar',
        height: 400,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: dataConDengue.map((item, index) => `Día ${index + 1}`),
        title: {
          text: 'Días',
        },
      },
      yaxis: {
        title: {
          text: 'Temperatura Promedio (°C)',
        },
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        y: {
          formatter: (val) => `${val}°C`,
        },
      },
    };

    return { series, options };
  };

  useEffect(() => {
    // Procesar los datos al cargar o cuando cambie 'data' o 'selectedMonth'
    const { series, options } = processData(data, selectedMonth);
    setChartData({ series, options });
  }, [data, selectedMonth]);

  // Handler para cambiar el mes seleccionado
  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    
    <div id="chart">
      <Card align="center" direction="column" w="100%">
     
      
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" fontSize="xl" fontWeight="700" lineHeight="100%">
          Casos con dengue con relación al clima
        </Text>
      </Flex>
      <div className="month-selector">
        <label htmlFor="month-select">Seleccionar mes:</label>
        <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
          <option value="1">Enero</option>
          <option value="2">Febrero</option>
          <option value="3">Marzo</option>
          <option value="4">Abril</option>
          <option value="5">Mayo</option>
          <option value="6">Junio</option>
          <option value="7">Julio</option>
          <option value="8">Agosto</option>
          <option value="9">Septiembre</option>
          <option value="10">Octubre</option>
          <option value="11">Noviembre</option>
          <option value="12">Diciembre</option>
        </select>
      </div>
      <Box h="350px" mt="auto" w="100%">
      <Chart options={chartData.options} series={chartData.series} type="bar" height={400} />
      </Box>
    </Card>
    </div>
  );
};

export default DengueBarChart;