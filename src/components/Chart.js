import React from 'react';
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

// Generate Sales Data
function createData(date, amount) {
  return { Date: date, 'Order Amount': amount };
}

const data = [
  createData('00:00', 100),
  createData('03:00', 300),
  createData('06:00', 600),
  createData('09:00', 800),
  createData('12:00', 1500),
  createData('15:00', 2000),
  createData('18:00', 2400),
  createData('21:00', 2400),
  createData('24:00', undefined),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <>
      <Title>Daily Order Trend</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <CartesianGrid strokeDasharray="3" vertical={false} strokeWidth="2" />
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
    </>
  );
}
