import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ContributionCalendar = ({ contributions }) => {
  const [hoveredDay, setHoveredDay] = useState(null);

  // GitHub Dark Mode Colors
  const getIntensityStyle = (percentage) => {
    if (percentage === 0) return { backgroundColor: '#161b22' }; // Empty
    if (percentage < 25) return { backgroundColor: '#0e4429' }; // Level 1
    if (percentage < 50) return { backgroundColor: '#006d32' }; // Level 2
    if (percentage < 75) return { backgroundColor: '#26a641' }; // Level 3
    return { backgroundColor: '#39d353' }; // Level 4
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isToday = (dateString) => {
    const today = new Date();
    const d = new Date(dateString);
    return d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear();
  };

  // Generate Month Labels based on the rendered grid (simplified for last ~5 months)
  const getMonthLabels = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const today = new Date();
    const labels = [];
    for (let i = 4; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      labels.push(months[d.getMonth()]);
    }
    return labels;
  };

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-semibold text-foreground tracking-tight">
            Contributions
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-border text-[10px] items-center justify-center flex font-medium text-muted-foreground">
            {new Date().getFullYear()}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: '#161b22' }} />
            <div className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: '#0e4429' }} />
            <div className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: '#006d32' }} />
            <div className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: '#26a641' }} />
            <div className="w-[10px] h-[10px] rounded-sm" style={{ backgroundColor: '#39d353' }} />
          </div>
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto pb-2 scrollbar-hide">
        <div className="inline-flex flex-col gap-1 min-w-full">
          {/* Month Labels - Simplified alignment */}
          <div className="flex justify-between px-1 mb-2 max-w-[90%]">
            {getMonthLabels().map((m, i) => (
              <span key={i} className="text-xs font-medium text-muted-foreground">{m}</span>
            ))}
          </div>

          <div className="grid grid-rows-7 grid-flow-col gap-[3px]">
            {/* Weekday Labels (Optional, often omitted in mini calendars, but good for context) */}
            {/* We can map generic boxes if data is empty, but assuming 'contributions' is populated correctly */}
            {contributions?.map((day) => (
              <div
                key={day?.date}
                className="relative group"
                onMouseEnter={() => setHoveredDay(day)}
                onMouseLeave={() => setHoveredDay(null)}
              >
                <div
                  className={`w-[10px] h-[10px] md:w-[12px] md:h-[12px] rounded-[2px] transition-colors cursor-pointer ${isToday(day?.date) ? 'ring-1 ring-foreground ring-offset-1 ring-offset-background' : ''
                    }`}
                  style={getIntensityStyle(day?.percentage)}
                />

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 hidden group-hover:block pointer-events-none">
                  <div className="bg-popover/95 backdrop-blur-md border border-border rounded-lg p-3 shadow-xl whitespace-nowrap min-w-[140px]">
                    <p className="text-xs font-semibold text-foreground mb-1">
                      {formatDate(day?.date)}
                    </p>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={getIntensityStyle(day?.percentage)}></span>
                      <p className="text-xs text-muted-foreground">
                        {day?.percentage}% Done
                      </p>
                    </div>
                    <p className="text-[10px] text-muted-foreground/80">
                      {day?.tasksCompleted} tasks completed
                    </p>
                  </div>
                  {/* Arrow */}
                  <div className="w-2 h-2 bg-popover border-r border-b border-border transform rotate-45 absolute left-1/2 -ml-1 -bottom-1"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionCalendar;