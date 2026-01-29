import React from 'react';
import Icon from '../../../components/AppIcon';

const StreakCounter = ({ currentStreak, longestStreak }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          Streak Stats
        </h3>
        <Icon name="Flame" size={24} className="text-accent" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-primary/10 rounded-lg p-4 md:p-5 lg:p-6 glow-primary">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Zap" size={20} className="text-primary" />
            <span className="text-sm md:text-base text-muted-foreground">Current Streak</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary data-text">
              {currentStreak}
            </span>
            <span className="text-base md:text-lg text-muted-foreground">days</span>
          </div>
        </div>

        <div className="bg-accent/10 rounded-lg p-4 md:p-5 lg:p-6 glow-accent">
          <div className="flex items-center gap-3 mb-2">
            <Icon name="Trophy" size={20} className="text-accent" />
            <span className="text-sm md:text-base text-muted-foreground">Longest Streak</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent data-text">
              {longestStreak}
            </span>
            <span className="text-base md:text-lg text-muted-foreground">days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;