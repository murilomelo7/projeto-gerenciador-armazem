import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ControleProdutoController from '@/controller/ControleProdutoController';

// Registrando componentes do Chart.js
Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ControleProdutoController.findMany();

      const processData = data => {
        const labels = Array.from(new Set(data.map(item => new Date(item.createdAt).toLocaleDateString()))).sort();
        const entradaData = labels.map(label => {
          const totalEntrada = data
            .filter(d => new Date(d.createdAt).toLocaleDateString() === label && d.tipo === 'entrada')
            .reduce((sum, item) => sum + item.quantidade, 0);
          return totalEntrada;
        });

        const saidaData = labels.map(label => {
          const totalSaida = data
            .filter(d => new Date(d.createdAt).toLocaleDateString() === label && d.tipo === 'saida')
            .reduce((sum, item) => sum + item.quantidade, 0);
          return totalSaida;
        });

        return {
          labels,
          datasets: [
            {
              label: 'Entradas',
              data: entradaData,
              backgroundColor: 'rgb(63,171,69)',
            },
            {
              label: 'Saídas',
              data: saidaData,
              backgroundColor: 'rgb(230,63,48)',
            },
          ],
        };
      };

      setChartData(processData(data));
    };

    fetchData();
  }, []);

  return (
    <div>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            // responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Entradas e Saídas por Data',
              },
            },
          }}
        />
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default BarChart;
