import React from "react";
import Chart from "react-apexcharts";

const ClimaChart = ({ data }) => {
  // Función para agrupar datos por mes
  const agruparPorMes = (datos) => {
    const porMes = {};
    datos.forEach(item => {
      const fecha = new Date(item.date);
      const mesAnio = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`;
      if (!porMes[mesAnio]) {
        porMes[mesAnio] = { tmax: [], tmin: [], tavg: [], prcp: [] };
      }
      porMes[mesAnio].tmax.push(item.tmax);
      porMes[mesAnio].tmin.push(item.tmin);
      porMes[mesAnio].tavg.push(item.tavg);
      porMes[mesAnio].prcp.push(item.prcp);
    });

    return Object.entries(porMes).map(([mesAnio, valores]) => ({
      fecha: mesAnio,
      tmax: valores.tmax.reduce((a, b) => a + b, 0) / valores.tmax.length,
      tmin: valores.tmin.reduce((a, b) => a + b, 0) / valores.tmin.length,
      tavg: valores.tavg.reduce((a, b) => a + b, 0) / valores.tavg.length,
      prcp: valores.prcp.reduce((a, b) => a + b, 0), // Suma total de precipitación
    }));
  };

  const datosMensuales = agruparPorMes(data).sort((a, b) => a.fecha.localeCompare(b.fecha));

  const series = [
    {
      name: 'Temperatura Máxima',
      data: datosMensuales.map(item => item.tmax.toFixed(1)) // Ajustar a un decimal
    },
    {
      name: 'Temperatura Mínima',
      data: datosMensuales.map(item => item.tmin.toFixed(1)) // Ajustar a un decimal
    },
    {
      name: 'Temperatura Promedio',
      data: datosMensuales.map(item => item.tavg.toFixed(1)) // Ajustar a un decimal
    },
    {
      name: 'Precipitación',
      data: datosMensuales.map(item => item.prcp.toFixed(1)) // Ajustar a un decimal
    }
  ];

  const options = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: datosMensuales.map(item => {
        const [year, month] = item.fecha.split('-');
        return `${year}-${month.padStart(2, '0')}`;
      }),
      title: {
        text: 'Mes'
      }
    },
    yaxis: [
      {
        title: {
          text: 'Temperatura (°C)'
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(1); // Ajustar a un decimal
          }
        }
      },
      {
        opposite: true,
        title: {
          text: 'Precipitación (mm)'
        },
        labels: {
          formatter: function (value) {
            return value.toFixed(1); // Ajustar a un decimal
          }
        }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val, { seriesIndex }) {
          if (seriesIndex === 3) {
            return val.toFixed(1) + " mm";
          }
          return val.toFixed(1) + " °C";
        }
      }
    },
    legend: {
      position: 'top'
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560']
  };

  return (
    <Chart options={options} series={series} type="bar" height={350} />
  );
};

export default ClimaChart;
