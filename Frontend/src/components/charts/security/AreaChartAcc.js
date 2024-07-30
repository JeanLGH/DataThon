import React from "react";
import Chart from "react-apexcharts";

const ClimaChart = ({ data }) => {
  // Función para agrupar datos por mes
  const agruparPorMes = (datos) => {
    const porMes = {};
    datos.forEach(item => {
      const fecha = new Date(item.date);
      const mesAnio = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}`;
      if (!porMes[mesAnio]) {
        porMes[mesAnio] = { tmax: [], tmin: [], tavg: [], prcp: [] };
      }
      if (item.tmax !== undefined) porMes[mesAnio].tmax.push(item.tmax);
      if (item.tmin !== undefined) porMes[mesAnio].tmin.push(item.tmin);
      if (item.tavg !== undefined) porMes[mesAnio].tavg.push(item.tavg);
      if (item.prcp !== undefined) porMes[mesAnio].prcp.push(item.prcp);
    });

    return Object.entries(porMes).map(([mesAnio, valores]) => ({
      fecha: mesAnio,
      tmax: valores.tmax.length ? valores.tmax.reduce((a, b) => a + b, 0) / valores.tmax.length : 0,
      tmin: valores.tmin.length ? valores.tmin.reduce((a, b) => a + b, 0) / valores.tmin.length : 0,
      tavg: valores.tavg.length ? valores.tavg.reduce((a, b) => a + b, 0) / valores.tavg.length : 0,
      prcp: valores.prcp.length ? valores.prcp.reduce((a, b) => a + b, 0) : 0,
    }));
  };

  const datosMensuales = agruparPorMes(data).sort((a, b) => a.fecha.localeCompare(b.fecha));

  const series = [
    {
      name: 'Temperatura Máxima',
      data: datosMensuales.map(item => parseFloat(item.tmax.toFixed(1)))
    },
    {
      name: 'Temperatura Mínima',
      data: datosMensuales.map(item => parseFloat(item.tmin.toFixed(1)))
    },
    {
      name: 'Temperatura Promedio',
      data: datosMensuales.map(item => parseFloat(item.tavg.toFixed(1)))
    },
    {
      name: 'Precipitación',
      data: datosMensuales.map(item => parseFloat(item.prcp.toFixed(1)))
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
      categories: datosMensuales.map(item => item.fecha),
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
            return value.toFixed(1);
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
            return value.toFixed(1);
          }
        }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val, { seriesIndex }) {
          return seriesIndex === 3 ? val.toFixed(1) + " mm" : val.toFixed(1) + " °C";
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