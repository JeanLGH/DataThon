import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const SlopeChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    // Transformar los datos para el gráfico
    const categories = data.map(d => d.month); // Usamos el mes como categorías
    const series = [
      {
        name: 'Promedio Precipitación',
        data: data.map(d => d.prcp.toFixed(2)) // Redondeamos a 2 decimales
      },
      {
        name: 'Promedio Temperatura Promedio',
        data: data.map(d => d.tavg.toFixed(2)) // Redondeamos a 2 decimales
      }
    ];

    setChartOptions({
      chart: {
        type: 'line'
      },
      stroke: {
        width: [4, 4],
        curve: 'smooth'
      },
      xaxis: {
        categories: categories
      },
      yaxis: {
        title: {
          text: 'Valor'
        }
      },
      markers: {
        size: [6, 6]
      },
      tooltip: {
        shared: true,
        intersect: false
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      }
    });

    setChartSeries(series);
  }, [data]);

  return (
    <Chart
      options={chartOptions}
      series={chartSeries}
      type="line"
      height={350}
    />
  );
};

export default SlopeChart;
