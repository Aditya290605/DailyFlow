import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const WeekdayPerformance = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <p className="text-xs text-muted-foreground">
              Avg. Completion: <span className="text-accent font-semibold">{payload[0].value}%</span>
            </p>
          </div>
          <p className="text-[10px] text-muted-foreground mt-1">
            Based on {payload[0].payload.count} days
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-foreground tracking-tight">Best Performing Days</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Average completion rate across weekdays
        </p>
      </div>
      <div className="w-full h-72" aria-label="Area chart showing weekday performance">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWeekday" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.5} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-accent)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="average"
              stroke="var(--color-accent)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWeekday)"
              activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-accent)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-2 text-center">
        {data?.map((day, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="text-[10px] text-muted-foreground mb-1">{day?.day?.charAt(0)}</div>
            <div className={`text-xs font-semibold ${day?.average > 0 ? 'text-accent' : 'text-muted'}`}>
              {day?.average}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekdayPerformance;