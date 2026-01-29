import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialProofSection = () => {
  const stats = [
    {
      id: 1,
      icon: 'Users',
      value: '12,500+',
      label: 'Active Users'
    },
    {
      id: 2,
      icon: 'CheckCircle2',
      value: '2.5M+',
      label: 'Tasks Completed'
    },
    {
      id: 3,
      icon: 'Flame',
      value: '180',
      label: 'Avg. Streak Days'
    },
    {
      id: 4,
      icon: 'TrendingUp',
      value: '94%',
      label: 'Success Rate'
    }
  ];

  const successStories = [
    {
      id: 1,
      achievement: 'Maintained 365-day streak',
      user: 'Michael Thompson',
      timeframe: 'Full year consistency'
    },
    {
      id: 2,
      achievement: 'Completed 5,000+ tasks',
      user: 'Lisa Anderson',
      timeframe: 'In 8 months'
    },
    {
      id: 3,
      achievement: '98% completion rate',
      user: 'David Park',
      timeframe: 'Last 6 months'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Join a Thriving Community
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Thousands of users are already building better habits with DailyFlow
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-16 lg:mb-20">
          {stats?.map((stat) => (
            <div
              key={stat?.id}
              className="bg-background border border-border rounded-xl p-4 md:p-6 lg:p-8 text-center hover:border-primary/50 transition-all duration-250"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 md:mb-4">
                <Icon name={stat?.icon} size={24} color="var(--color-primary)" />
              </div>
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1 md:mb-2 data-text">
                {stat?.value}
              </div>
              <div className="text-xs md:text-sm lg:text-base text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-background border border-border rounded-xl p-6 md:p-8 lg:p-10">
          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-6 md:mb-8 text-center">
            Recent Success Stories
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {successStories?.map((story) => (
              <div
                key={story?.id}
                className="bg-card border border-border rounded-lg p-4 md:p-6 hover:border-primary/50 transition-all duration-250"
              >
                <div className="flex items-start gap-3 mb-3">
                  <Icon name="Trophy" size={20} color="var(--color-accent)" />
                  <h4 className="text-base md:text-lg font-semibold text-foreground">
                    {story?.achievement}
                  </h4>
                </div>
                <p className="text-sm md:text-base text-muted-foreground mb-1">
                  {story?.user}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {story?.timeframe}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;