import React from 'react';
import Button from '../../../components/ui/Button';

const ChartControls = ({ 
  activeView, 
  onViewChange, 
  activeChart, 
  onChartChange,
  onExport 
}) => {
  const timeViews = [
    { id: 'week', label: 'Week' },
    { id: 'month', label: 'Month' },
    { id: 'quarter', label: 'Quarter' },
    { id: 'year', label: 'Year' }
  ];

  const chartTypes = [
    { id: 'bar', label: 'Bar Chart', icon: 'BarChart3' },
    { id: 'line', label: 'Line Chart', icon: 'LineChart' }
  ];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {timeViews?.map((view) => (
          <Button
            key={view?.id}
            variant={activeView === view?.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewChange(view?.id)}
          >
            {view?.label}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        {chartTypes?.map((chart) => (
          <Button
            key={chart?.id}
            variant={activeChart === chart?.id ? 'secondary' : 'ghost'}
            size="sm"
            iconName={chart?.icon}
            onClick={() => onChartChange(chart?.id)}
          >
            {chart?.label}
          </Button>
        ))}
        
        <Button
          variant="outline"
          size="sm"
          iconName="Download"
          onClick={onExport}
        >
          Export
        </Button>
      </div>
    </div>
  );
};

export default ChartControls;