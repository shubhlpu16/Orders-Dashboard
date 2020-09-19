import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@material-ui/core/styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import Title from './Title';

function Chart(props) {
  const theme = useTheme();
  return (
    <>
      <Title>Daily Order Trend</Title>
      {props.data.length ? (
        <ResponsiveContainer>
          <LineChart
            data={props.data}
            margin={{
              top: 16,
              right: 16,
              bottom: 0,
              left: 24,
            }}
          >
            <CartesianGrid
              strokeDasharray="3"
              vertical={false}
              strokeWidth="2"
            />
            <XAxis
              dataKey="Date"
              stroke={theme.palette.text.secondary}
              padding={{ left: 30, right: 30 }}
              axisLine={false}
            />
            <YAxis stroke={theme.palette.text.secondary} axisLine={false} />
            <Line
              type="linear"
              dataKey="Order Amount"
              stroke={theme.palette.secondary.main}
              strokeWidth={2}
              legendType="rect"
            />
            <Tooltip />
            <Legend verticalAlign="bottom" iconSize="20" />
          </LineChart>
        </ResponsiveContainer>
      ) : null}
    </>
  );
}

Chart.propTypes = {
  data: PropTypes.array.isRequired,
};
export default Chart;
