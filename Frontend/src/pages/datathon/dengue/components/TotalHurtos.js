import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Box } from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import { Flex, Text } from "@chakra-ui/react";
import { Card } from 'antd';

const DengueChart = ({ dengueData }) => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: 'area',
      height: 350,
      stacked: false,
      zoom: { enabled: false }
    },
    dataLabels: { enabled: false },
    stroke: { 
      curve: 'smooth', 
      width: 2
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.1,
      }
    },
    xaxis: {
      type: 'datetime',
      title: { text: 'Fecha de inicio de síntomas' },
      labels: {
        formatter: function (val) {
          const date = new Date(val);
          const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
          return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        }
      }
    },
    yaxis: {
      title: { text: 'Número acumulado de casos' }
    },
    tooltip: {
      x: { format: 'dd/MM/yyyy' },
      y: {
        formatter: function (value) {
          return Math.round(value);
        }
      }
    },
    title: {
      text: '',
      align: 'center',
      style: { fontSize: '16px', fontWeight: 'bold' }
    },
    legend: {
      position: 'right',
      offsetY: 40
    }
  });

  const [chartSeries, setChartSeries] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [availableSymptoms, setAvailableSymptoms] = useState([]);

  useEffect(() => {
    if (dengueData && dengueData.length > 0) {
      const symptoms = [
        'fiebre', 'cefalea', 'dolor_retro_ocular', 'malgias', 'artralgia',
        'erupcion', 'dolor_abdominal', 'vomito', 'diarrea', 'somnolencia',
        'hipotension', 'hepatomegalia', 'hem_mucosa', 'hipotermia',
        'caida_plaquetas', 'acumulacion_liquidos', 'extravasacion',
        'choque'
      ];

      setAvailableSymptoms(symptoms.map(symptom => ({ value: symptom, label: symptom })));
      setSelectedSymptoms(symptoms.slice(0, 5).map(symptom => ({ value: symptom, label: symptom }))); // Initially select first 5 symptoms

      const symptomCounts = symptoms.reduce((acc, symptom) => ({ ...acc, [symptom]: {} }), {});

      dengueData.sort((a, b) => new Date(a.fecha_inicio_sintomas) - new Date(b.fecha_inicio_sintomas));

      dengueData.forEach(caso => {
        const fechaInicio = new Date(caso.fecha_inicio_sintomas).toISOString().split('T')[0];
        
        symptoms.forEach(symptom => {
          if (caso[symptom] === 'Si') {
            symptomCounts[symptom][fechaInicio] = (symptomCounts[symptom][fechaInicio] || 0) + 1;
          }
        });
      });

      const seriesData = symptoms.map(symptom => {
        let accumulator = 0;
        const data = Object.entries(symptomCounts[symptom])
          .sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB))
          .map(([date, count]) => {
            accumulator += count;
            return {
              x: new Date(date).getTime(),
              y: accumulator
            };
          });
        
        return { name: symptom, data: data };
      });

      setChartSeries(seriesData);
    }
  }, [dengueData]);

  const filteredSeries = chartSeries.filter(series => 
    selectedSymptoms.some(symptom => symptom.value === series.name)
  );

  const handleSymptomChange = (selectedOptions) => {
    setSelectedSymptoms(selectedOptions);
  };

  if (!dengueData || dengueData.length === 0) {
    return <Box>No hay datos disponibles para mostrar.</Box>;
  }

  return (
    <Box>
      <Card align="center" direction="column" w="100%" >
      <Flex align="center" w="100%" px="15px" py="10px">
        <Text me="auto" fontSize="xl" fontWeight="700" lineHeight="100%">
        Acumulación de síntomas de Dengue
        </Text>
      </Flex>
      <Select
        isMulti
        name="symptoms"
        options={availableSymptoms}
        value={selectedSymptoms}
        onChange={handleSymptomChange}
        placeholder="Selecciona los síntomas"
        closeMenuOnSelect={false}
      />
      <Box mt={4}>
        <Chart
          options={chartOptions}
          series={filteredSeries}
          type="area"
          height={350}
        />
      </Box>
    </Card>
    </Box>
  );
};

export default DengueChart;
