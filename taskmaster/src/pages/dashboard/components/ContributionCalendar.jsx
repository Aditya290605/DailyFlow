import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ContributionCalendar = ({ contributions }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  const getIntensityClass = (percentage) => {
    if (percentage === 0) return 'bg-muted';
    if (percentage < 25) return 'bg-success/20';
    if (percentage < 50) return 'bg-success/40';
    if (percentage < 75) return 'bg-success/60';
    if (percentage < 100) return 'bg-success/80';
    return 'bg-success';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isToday = (dateString) => {
    const today = new Date()?.toISOString()?.split('T')?.[0];
    return dateString === today;
  };

  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date()?.getMonth();
    return months?.slice(Math.max(0, currentMonth - 2), currentMonth + 1);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Contribution Calendar
        </h3>
        <Icon name="Calendar" size={24} className="text-primary" />
      </div>
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-muted" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-success/20" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-success/40" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-success/60" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-success/80" />
            <div className="w-3 h-3 md:w-4 md:h-4 rounded bg-success" />
          </div>
          <span>More</span>
        </div>

        <div className="overflow-x-auto">
          <div className="inline-flex flex-col gap-1 min-w-full">
            <div className="flex gap-1 mb-2">
              {getMonthLabels()?.map((month, idx) => (
                <span key={idx} className="text-xs text-muted-foreground w-12 md:w-16">
                  {month}
                </span>
              ))}
            </div>

            <div className="grid grid-rows-7 grid-flow-col gap-1">
              {contributions?.map((day) => (
                <div
                  key={day?.date}
                  className="relative"
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                >
                  <div
                    className={`w-3 h-3 md:w-4 md:h-4 rounded transition-smooth cursor-pointer ${getIntensityClass(day?.percentage)} ${
                      isToday(day?.date) ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                    } hover:ring-2 hover:ring-primary/50`}
                  />
                  
                  {hoveredDay?.date === day?.date && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
                      <div className="bg-popover border border-border rounded-lg p-3 shadow-lg whitespace-nowrap">
                        <p className="text-xs md:text-sm font-medium text-foreground">
                          {formatDate(day?.date)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {day?.percentage}% completed
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {day?.tasksCompleted}/{day?.totalTasks} tasks
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionCalendar;