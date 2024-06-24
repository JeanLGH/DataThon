import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const DengueBarChart = ({ data }) => {
  const [chartData, setChartData] = useState({ series: [], categories: [] });

  const processData = (data) => {
    const groupedData = {};

    data.forEach((item) => {
      const date = new Date(item.fecha_inicio_sintomas);
      const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });

      if (!groupedData[month]) {
        groupedData[month] = { F: 0, M: 0 };
      }
      groupedData[month][item.sexo] += 1;
    });

    return groupedData;
  };

  useEffect(() => {
    const groupedData = processData(data);
    const categories = Object.keys(groupedData).sort((a, b) => new Date(a) - new Date(b));
    const series = [
      {
        name: 'Femenino',
        data: categories.map((month) => groupedData[month].F),
      },
      {
        name: 'Masculino',
        data: categories.map((month) => groupedData[month].M),
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
        horizontal: false,
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
      <Chart options={options} series={chartData.series} type="bar" height={400} />
    </div>
  );
};

export default DengueBarChart;
