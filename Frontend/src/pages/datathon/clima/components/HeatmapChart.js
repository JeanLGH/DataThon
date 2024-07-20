import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Card from "../../../../components/card/Card.js";

const HeatmapChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 350,
      type: 'heatmap',
    },
    stroke: {
      width: 0
    },
    plotOptions: {
      heatmap: {
        radius: 30,
        enableShades: false,
        colorScale: {
          ranges: []
        },
      }
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff']
      }
    },
    xaxis: {
      title: {
        text: 'DÃ­as'
      },
      type: 'category',
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
      const tavgValues = data.map(item => item.tavg);
      const min = Math.min(...tavgValues);
      const max = Math.max(...tavgValues);
      const avg = tavgValues.reduce((acc, val) => acc + val, 0) / tavgValues.length;

      const series = generateSeries(data, min, max, avg);
      setChartSeries(series);

      const ranges = [
        { from: 0, to: 0, color: '#CCCCCC' }, // Gris para valores 0
        { from: min, to: 22.98, color: '#00E396' }, // Verde
        { from: 22.99, to: 24.999, color: '#FEB019' }, // Amarillo
        { from: 25.0, to: max, color: '#FF4560' } // Rojo
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