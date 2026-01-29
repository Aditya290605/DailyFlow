import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const WeekdayPerformance = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground mb-1">{payload?.[0]?.payload?.day}</p>
          <p className="text-xs text-muted-foreground">
            Average: <span className="text-primary font-semibold">{payload?.[0]?.value}%</span>
          </p>
          <p className="text-xs text-muted-foreground">
            Days: <span className="text-foreground font-medium">{payload?.[0]?.payload?.count}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const getBarColor = (value) => {
    if (value >= 80) return 'var(--color-success)';
    if (value >= 60) return 'var(--color-primary)';
    if (value >= 40) return 'var(--color-accent)';
    return 'var(--color-warning)';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Best Performing Days</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Average completion rate by day of week
        </p>
      </div>
      <div className="w-full h-64 md:h-72" aria-label="Bar chart showing weekday performance">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-muted-foreground)"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              domain={[0, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="average" 
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry?.average)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        {data?.slice(0, 4)?.map((day, index) => (
          <div key={index} className="p-3 bg-muted rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">{day?.day}</p>
            <p className="text-lg md:text-xl font-semibold text-foreground data-text">
              {day?.average}%
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekdayPerformance;