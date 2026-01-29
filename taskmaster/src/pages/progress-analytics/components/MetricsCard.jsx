import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ icon, label, value, trend, trendValue, color = "var(--color-primary)" }) => {
  const isPositive = trend === 'up';
  
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 transition-smooth hover:glow-primary">
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center" 
             style={{ background: `${color}20` }}>
          <Icon name={icon} size={20} color={color} className="md:w-6 md:h-6" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
            isPositive ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
          }`}>
            <Icon name={isPositive ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span className="text-xs font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground data-text">
          {value}
        </p>
        <p className="text-sm md:text-base text-muted-foreground">{label}</p>
      </div>
    </div>
  );
};

export default MetricsCard;