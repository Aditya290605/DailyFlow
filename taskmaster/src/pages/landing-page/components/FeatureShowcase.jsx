import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesShowcase = () => {
  const features = [
    {
      id: 1,
      icon: 'Moon',
      title: 'Dark Theme Interface',
      description: 'Reduce eye strain with our carefully crafted dark theme designed for extended productivity sessions.'
    },
    {
      id: 2,
      icon: 'Zap',
      title: 'Real-Time Updates',
      description: 'Watch your progress update instantly as you complete tasks without any page refresh needed.'
    },
    {
      id: 3,
      icon: 'Lock',
      title: 'Day Locking System',
      description: 'Submitted days are automatically locked to preserve your progress history and maintain data integrity.'
    },
    {
      id: 4,
      icon: 'Calendar',
      title: 'One Day Per Date',
      description: 'Focus on today with our unique system that allows only one day entry per calendar date.'
    },
    {
      id: 5,
      icon: 'BarChart3',
      title: 'Progress Analytics',
      description: 'Visualize your productivity trends with detailed charts showing completion percentages over time.'
    },
    {
      id: 6,
      icon: 'Target',
      title: 'Streak Motivation',
      description: 'Build momentum with consecutive day tracking and celebrate your longest productivity streaks.'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Powerful Features for Daily Success
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature is designed to help you maintain consistency and achieve your goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features?.map((feature) => (
            <div
              key={feature?.id}
              className="bg-card border border-border rounded-xl p-6 md:p-8 hover:border-secondary/50 transition-all duration-250 hover:shadow-lg hover:glow-secondary"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={feature?.icon} size={24} color="var(--color-secondary)" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-foreground mb-2">
                    {feature?.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {feature?.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesShowcase;