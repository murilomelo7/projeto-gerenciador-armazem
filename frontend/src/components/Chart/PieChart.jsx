import React from 'react';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }) => {
  return <Pie data={data} />;
};

PieChart.propTypes = {
  data: PropTypes.object.isRequired,
};

export default PieChart;
