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
      type: 'line',
      data: datosMensuales.map(item => item.tmax)
    },
    {
      name: 'Temperatura Mínima',
      type: 'line',
      data: datosMensuales.map(item => item.tmin)
    },
    {
      name: 'Temperatura Promedio',
      type: 'line',
      data: datosMensuales.map(item => item.tavg)
    },
    {
      name: 'Precipitación',
      type: 'column',
      data: datosMensuales.map(item => item.prcp)
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
    },
    stroke: {
      width: [3, 3, 3, 0],
      curve: 'smooth'
    },
    plotOptions: {
      bar: {
        columnWidth: '50%'
      }
    },
    fill: {
      opacity: [1, 1, 1, 0.8],
    },
    labels: datosMensuales.map(item => {
      const [year, month] = item.fecha.split('-');
      return `${['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][parseInt(month) - 1]} '${year.slice(2)}`;
    }),
    markers: {
      size: 0
    },
    xaxis: {
      type: 'category'
    },
    yaxis: [
      {
        title: {
          text: 'Temperatura (°C)',
        },
        min: 0,
        max: 40,
        decimalsInFloat: 1,
      },
      {
        opposite: true,
        title: {
          text: 'Precipitación (mm)'
        },
        min: 0,
        max: 700,
        decimalsInFloat: 0,
      }
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: function (y, { seriesIndex }) {
          if (typeof y !== "undefined") {
            return seriesIndex === 3 ? y.toFixed(1) + " mm" : y.toFixed(1) + " °C";
          }
          return y;
        }
      }
    },
    legend: {
      position: 'top'
    },
    colors: ['#FF4560', '#00E396', '#FEB019', '#008FFB']
  };

  return (
    <Chart options={options} series={series} type="line" height={350} />
  );
};

export default ClimaChart;
