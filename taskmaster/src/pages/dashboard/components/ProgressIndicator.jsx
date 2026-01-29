import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ percentage }) => {
  const getProgressColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 50) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getProgressBg = () => {
    if (percentage >= 80) return 'bg-success/20';
    if (percentage >= 50) return 'bg-warning/20';
    return 'bg-muted';
  };

  const getMotivationalMessage = () => {
    if (percentage === 100) return "Perfect day! 🎉";
    if (percentage >= 80) return "Almost there! Keep going! 💪";
    if (percentage >= 50) return "Great progress! 🚀";
    if (percentage > 0) return "Good start! Keep it up! ⭐";
    return "Let's get started! 🌟";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Today's Progress
        </h3>
        <Icon name="Target" size={24} className="text-primary" />
      </div>

      <div className="space-y-4 md:space-y-6">
        <div className="relative">
          <div className="h-3 md:h-4 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full ${getProgressBg()} transition-all duration-500`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className={`text-3xl md:text-4xl lg:text-5xl font-bold ${getProgressColor()}`}>
            {percentage}%
          </span>
          <span className="text-sm md:text-base lg:text-lg text-muted-foreground">
            {getMotivationalMessage()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;