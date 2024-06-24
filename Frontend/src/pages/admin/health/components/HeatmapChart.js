// HeatmapChart.js
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Card from "../../../../components/card/Card.js";

const HeatmapChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'heatmap',
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      title: {
        text: 'Días'
      },
      categories: Array.from({ length: 31 }, (_, i) => i + 1)
    },
    yaxis: {
      title: {
        text: 'Meses'
      },
      categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    },
    tooltip: {
      enabled: true,
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (value) {
          return `${value}`;
        }
      }
    },
    title: {
      text: 'Mapa de Calor',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    }
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const min = Math.min(...data.map(item => item.tavg));
      const max = Math.max(...data.map(item => item.tavg));
      const avg = data.reduce((acc, item) => acc + item.tavg, 0) / data.length;

      const series = generateSeries(data, min, max, avg); // Generar series a partir de los datos reales
      setChartSeries(series);
    }
  }, [data]);

  const generateSeries = (data, min, max, avg) => {
    const series = Array.from({ length: 12 }, (_, i) => ({
      name: chartOptions.yaxis.categories[i],
      data: Array.from({ length: 31 }, (_, j) => ({
        x: j + 1,
        y: 0, // Inicializar con 0
        fillColor: '#00E396' // Color inicial
      }))
    }));

    // Recorrer los datos y asignar los valores correspondientes
    data.forEach(item => {
      const fecha = new Date(item.date);
      const mes = fecha.getMonth(); // 0-11
      const dia = fecha.getDate(); // 1-31
      const valor = item.tavg; // Temperatura promedio

      // Asignar el valor y el color según la temperatura de ese día
      series[mes].data[dia - 1].y = valor;
      series[mes].data[dia - 1].fillColor = getColor(valor, min, max, avg);
    });

    return series;
  };

  const getColor = (value, min, max, avg) => {
    // Asignar colores según el valor comparado con min, max y avg
    if (value <= avg) return '#00E396';    // Verde
    if (value > avg && value < max) return '#FEB019';    // Amarillo
    return '#FF4560';                    // Rojo
  };
  
  return (
    <Card align="center" direction="column" w="100%" >
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="heatmap"
        height={350}
      />
    </Card>
  );
};

export default HeatmapChart;
