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
      if (item.tmax !== undefined && item.tmax !== null) porMes[mesAnio].tmax.push(Number(item.tmax));
      if (item.tmin !== undefined && item.tmin !== null) porMes[mesAnio].tmin.push(Number(item.tmin));
      if (item.tavg !== undefined && item.tavg !== null) porMes[mesAnio].tavg.push(Number(item.tavg));
      if (item.prcp !== undefined && item.prcp !== null) porMes[mesAnio].prcp.push(Number(item.prcp));
    });

    return Object.entries(porMes).map(([mesAnio, valores]) => ({
      fecha: mesAnio,
      tmax: valores.tmax.length ? valores.tmax.reduce((a, b) => a + b, 0) / valores.tmax.length : null,
      tmin: valores.tmin.length ? valores.tmin.reduce((a, b) => a + b, 0) / valores.tmin.length : null,
      tavg: valores.tavg.length ? valores.tavg.reduce((a, b) => a + b, 0) / valores.tavg.length : null,
      prcp: valores.prcp.length ? valores.prcp.reduce((a, b) => a + b, 0) : null,
    }));
  };

  const datosMensuales = agruparPorMes(data).sort((a, b) => a.fecha.localeCompare(b.fecha));

  const formatValue = (value) => {
    return value !== null && value !== undefined ? parseFloat(value.toFixed(1)) : null;
  };

  const series = [
    {
      name: 'Temperatura Máxima',
      data: datosMensuales.map(item => formatValue(item.tmax))
    },
    {
      name: 'Temperatura Mínima',
      data: datosMensuales.map(item => formatValue(item.tmin))
    },
    {
      name: 'Temperatura Promedio',
      data: datosMensuales.map(item => formatValue(item.tavg))
    },
    {
      name: 'Precipitación',
      data: datosMensuales.map(item => formatValue(item.prcp))
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
            return value !== null && value !== undefined ? value.toFixed(1) : 'N/A';
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
            return value !== null && value !== undefined ? value.toFixed(1) : 'N/A';
          }
        }
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (val, { seriesIndex }) {
          if (val === null || val === undefined) return 'N/A';
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