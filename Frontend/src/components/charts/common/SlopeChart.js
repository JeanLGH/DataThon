import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';

const SlopeChart = ({ data }) => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const categories = data.map(d => d.month);
    const series = [
      {
        name: 'Promedio Precipitación',
        data: data.map(d => d.prcp !== null ? parseFloat(d.prcp.toFixed(2)) : null)
      },
      {
        name: 'Promedio Temperatura',
        data: data.map(d => d.tavg !== null ? parseFloat(d.tavg.toFixed(2)) : null)
      }
    ];

    setChartOptions({
      chart: {
        type: 'line',
        animations: {
          enabled: false
        }
      },
      stroke: {
        width: [4, 4],
        curve: 'smooth'
      },
      xaxis: {
        categories: categories,
        labels: {
          rotate: -45,
          rotateAlways: false
        }
      },
      yaxis: [
        {
          title: {
            text: 'Precipitación (mm)'
          },
          decimalsInFloat: 2
        },
        {
          opposite: true,
          title: {
            text: 'Temperatura (°C)'
          },
          decimalsInFloat: 2
        }
      ],
      markers: {
        size: 5
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y, { seriesIndex }) {
            if (y === null) return "Sin datos";
            return `${y.toFixed(2)} ${seriesIndex === 0 ? 'mm' : '°C'}`;
          }
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left'
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    });

    setChartSeries(series);
  }, [data]);

  if (!data || data.length === 0) {
    return <div>No hay datos disponibles</div>;
  }

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