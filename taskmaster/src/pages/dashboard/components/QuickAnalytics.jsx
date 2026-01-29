import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAnalytics = ({ weeklyData }) => {
  const navigate = useNavigate();

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary" />
            <p className="text-xs text-muted-foreground">
              Completion: <span className="text-secondary font-semibold">{payload[0].value}%</span>
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm flex flex-col w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-foreground tracking-tight">
          Weekly Overview
        </h3>
        <Icon name="TrendingUp" size={20} className="text-secondary" />
      </div>

      <div className="w-full h-64 mb-4 relative z-0" aria-label="Weekly Completion Area Chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={weeklyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorWeekly" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" opacity={0.3} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'var(--color-muted-foreground)', fontSize: 11 }}
              dy={10}
            />
            {/* Minimal YAxis or hidden */}
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'var(--color-secondary)', strokeWidth: 1, strokeDasharray: '4 4' }} />
            <Area
              type="monotone"
              dataKey="completion"
              stroke="var(--color-secondary)"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorWeekly)"
              activeDot={{ r: 5, strokeWidth: 0, fill: "var(--color-secondary)" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-auto">
        <Button
          variant="outline"
          size="default"
          fullWidth
          onClick={() => navigate('/progress-analytics')}
          iconName="BarChart3"
          iconPosition="left"
          className="border-border/50 hover:bg-secondary/10 hover:text-secondary hover:border-secondary/50 transition-all font-medium"
        >
          View Detailed Analytics
        </Button>
      </div>
    </div>
  );
};

export default QuickAnalytics;