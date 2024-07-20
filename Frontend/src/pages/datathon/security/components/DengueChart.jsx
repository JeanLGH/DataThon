import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import Card from "../../../../components/card/Card.js";

const DengueChart = ({ dengueData }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'area',
      height: 350,
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Fecha'
      },
      labels: {
        formatter: function (val) {
          const date = new Date(val);
          const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
          return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        }
      }
    },
    yaxis: {
      title: {
        text: 'Número de hospitalizados '
      }
    },
    tooltip: {
      enabled: true,
      x: {
        format: 'dd/MM/yyyy'
      }
    },
    title: {
      text: 'Hospitalizados por dengue',
      align: 'center',
      style: {
        fontSize: '16px',
        fontWeight: 'bold'
      }
    }
  });

  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    if (dengueData.length > 0) {
      const dates = []; // Array para almacenar las fechas únicas
      const symptomCounts = []; // Array para contar los síntomas "Si" por cada fecha

      // Recorremos los datos de dengueData para calcular conteos de síntomas "Si"
      dengueData.forEach(caso => {
        const fechaInicio = new Date(caso.fecha_inicio_sintomas).toISOString().split('T')[0]; // Obtener la fecha de inicio de síntomas (solo fecha, sin hora)
        const index = dates.findIndex(item => item === fechaInicio); // Buscar si la fecha ya está en dates

        if (index === -1) {
          // Si la fecha no está en dates, la agregamos y creamos un conteo inicial
          dates.push(fechaInicio);
          symptomCounts.push({
            fecha: fechaInicio,
            count: countSymptoms(caso)
          });
        } else {
          // Si la fecha ya está en dates, incrementamos el conteo de síntomas "Si"
          symptomCounts[index].count += countSymptoms(caso);
        }
      });

      // Ordenar las fechas de manera ascendente
      dates.sort();

      // Construir la serie de datos para ApexCharts
      const seriesData = dates.map(date => {
        const index = symptomCounts.findIndex(item => item.fecha === date);
        return {
          x: new Date(date).getTime(), // Convertir la fecha a timestamp
          y: symptomCounts[index].count
        };
      });

      setChartSeries([{ name: 'Casos de hospitalizados', data: seriesData }]);
    }
  }, [dengueData]);

  // Función para contar los síntomas "Si" en un caso de dengue
  const countSymptoms = (caso) => {
    let count = 0;
    // Contar los síntomas "Si"
    if (caso.hospitalizado === 'Si') count++;
    return count;
  };

  return (
    <Card align="center" direction="column" w="100%">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="area"
        height={350}
      />
    </Card>
  );
};

export default DengueChart;
