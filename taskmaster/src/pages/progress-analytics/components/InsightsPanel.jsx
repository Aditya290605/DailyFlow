import React from 'react';
import Icon from '../../../components/AppIcon';

const InsightsPanel = ({ insights }) => {
  const getInsightIcon = (type) => {
    const icons = {
      achievement: 'Trophy',
      pattern: 'TrendingUp',
      suggestion: 'Lightbulb',
      milestone: 'Target'
    };
    return icons?.[type] || 'Info';
  };

  const getInsightColor = (type) => {
    const colors = {
      achievement: 'var(--color-success)',
      pattern: 'var(--color-primary)',
      suggestion: 'var(--color-accent)',
      milestone: 'var(--color-secondary)'
    };
    return colors?.[type] || 'var(--color-primary)';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center gap-2 mb-4 md:mb-6">
        <Icon name="Sparkles" size={20} color="var(--color-accent)" />
        <h3 className="text-lg md:text-xl font-semibold text-foreground">Productivity Insights</h3>
      </div>
      <div className="space-y-3 md:space-y-4">
        {insights?.map((insight, index) => (
          <div
            key={index}
            className="p-3 md:p-4 rounded-lg border border-border hover:border-primary/30 transition-smooth"
            style={{ background: `${getInsightColor(insight?.type)}10` }}
          >
            <div className="flex items-start gap-3">
              <div 
                className="w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: `${getInsightColor(insight?.type)}20` }}
              >
                <Icon 
                  name={getInsightIcon(insight?.type)} 
                  size={18} 
                  color={getInsightColor(insight?.type)}
                  className="md:w-5 md:h-5"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="text-sm md:text-base font-medium text-foreground mb-1">
                  {insight?.title}
                </h4>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {insight?.description}
                </p>
                {insight?.metric && (
                  <div className="mt-2 inline-flex items-center gap-2 px-2 py-1 bg-background rounded-md">
                    <span className="text-xs text-muted-foreground">{insight?.metric?.label}:</span>
                    <span className="text-sm font-semibold data-text" style={{ color: getInsightColor(insight?.type) }}>
                      {insight?.metric?.value}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightsPanel;