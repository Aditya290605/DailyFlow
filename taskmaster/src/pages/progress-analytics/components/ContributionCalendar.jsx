import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ContributionCalendar = ({ data }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [hoveredDay, setHoveredDay] = useState(null);

  const getIntensityColor = (completion) => {
    if (completion === 0) return 'bg-muted';
    if (completion < 25) return 'bg-primary/20';
    if (completion < 50) return 'bg-primary/40';
    if (completion < 75) return 'bg-primary/60';
    if (completion < 100) return 'bg-primary/80';
    return 'bg-primary';
  };

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleDayHover = (day) => {
    setHoveredDay(day);
  };

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date()?.getMonth();

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-foreground">Contribution Calendar</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {data?.filter(d => d?.completion === 100)?.length} days completed this year
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden md:inline">Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-muted"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/20"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/40"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/60"></div>
            <div className="w-3 h-3 rounded-sm bg-primary/80"></div>
            <div className="w-3 h-3 rounded-sm bg-primary"></div>
          </div>
          <span className="text-xs text-muted-foreground hidden md:inline">More</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <div className="inline-flex flex-col gap-1 min-w-full">
          <div className="flex gap-1 mb-2">
            {months?.map((month, idx) => (
              <div 
                key={month}
                className={`text-xs text-muted-foreground ${idx === currentMonth ? 'font-semibold text-primary' : ''}`}
                style={{ width: '80px' }}
              >
                {month}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-12 gap-1">
            {data?.map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 md:w-4 md:h-4 rounded-sm cursor-pointer transition-all ${getIntensityColor(day?.completion)} ${
                  hoveredDay?.date === day?.date ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-110' : ''
                }`}
                onClick={() => handleDayClick(day)}
                onMouseEnter={() => handleDayHover(day)}
                onMouseLeave={() => setHoveredDay(null)}
                title={`${day?.date}: ${day?.completion}% completed`}
              />
            ))}
          </div>
        </div>
      </div>
      {hoveredDay && (
        <div className="mt-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">{hoveredDay?.date}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {hoveredDay?.tasksCompleted} of {hoveredDay?.totalTasks} tasks completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-semibold text-primary data-text">{hoveredDay?.completion}%</p>
            </div>
          </div>
        </div>
      )}
      {selectedDay && (
        <div className="mt-4 p-4 bg-primary/10 border border-primary/20 rounded-lg">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h4 className="text-base font-semibold text-foreground">{selectedDay?.date}</h4>
              <p className="text-sm text-muted-foreground mt-1">Day Details</p>
            </div>
            <button
              onClick={() => setSelectedDay(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Completion Rate</p>
              <p className="text-lg font-semibold text-primary data-text">{selectedDay?.completion}%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Tasks Completed</p>
              <p className="text-lg font-semibold text-foreground data-text">
                {selectedDay?.tasksCompleted}/{selectedDay?.totalTasks}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContributionCalendar;