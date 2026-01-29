import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CompletionChart = ({ data, chartType, timeView }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-1">{payload?.[0]?.payload?.date}</p>
          <p className="text-xs text-muted-foreground">
            Completion: <span className="text-primary font-semibold">{payload?.[0]?.value}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const chartConfig = {
    bar: {
      component: BarChart,
      element: Bar,
      props: {
        dataKey: "completion",
        fill: "var(--color-primary)",
        radius: [8, 8, 0, 0],
        maxBarSize: 60
      }
    },
    line: {
      component: LineChart,
      element: Line,
      props: {
        type: "monotone",
        dataKey: "completion",
        stroke: "var(--color-primary)",
        strokeWidth: 3,
        dot: { fill: "var(--color-primary)", r: 5 },
        activeDot: { r: 7 }
      }
    }
  };

  const config = chartConfig?.[chartType];
  const ChartComponent = config?.component;
  const ChartElement = config?.element;

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Daily Completion Rate</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Tracking your productivity over {timeView}
        </p>
      </div>
      <div className="w-full h-64 md:h-80 lg:h-96" aria-label={`${chartType} chart showing completion percentages`}>
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
            <ChartElement {...config?.props} name="Completion %" />
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompletionChart;