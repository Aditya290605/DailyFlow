import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAnalytics = ({ weeklyData }) => {
  const navigate = useNavigate();

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-foreground">{payload?.[0]?.payload?.day}</p>
          <p className="text-xs text-muted-foreground mt-1">
            Completion: {payload?.[0]?.value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Weekly Overview
        </h3>
        <Icon name="TrendingUp" size={24} className="text-secondary" />
      </div>

      <div className="w-full h-48 md:h-56 lg:h-64 mb-4 md:mb-6" aria-label="Weekly Completion Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="completion" 
              fill="var(--color-primary)" 
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Button
        variant="outline"
        size="default"
        fullWidth
        onClick={() => navigate('/progress-analytics')}
        iconName="BarChart3"
        iconPosition="left"
      >
        View Detailed Analytics
      </Button>
    </div>
  );
};

export default QuickAnalytics;