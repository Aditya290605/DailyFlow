import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationBenefits = () => {
  const benefits = [
    {
      icon: 'Target',
      title: 'Daily Task Planning',
      description: 'Plan and organize your tasks each morning for focused productivity'
    },
    {
      icon: 'TrendingUp',
      title: 'Visual Progress Tracking',
      description: 'See your consistency with GitHub-style contribution calendars'
    },
    {
      icon: 'Zap',
      title: 'Streak Motivation',
      description: 'Build momentum with consecutive day tracking and achievement badges'
    },
    {
      icon: 'BarChart3',
      title: 'Analytics Dashboard',
      description: 'Monitor your productivity trends with detailed completion charts'
    }
  ];

  return (
    <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-8 xl:px-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <h2 className="text-3xl xl:text-4xl font-semibold text-foreground">
            Build Better Habits
          </h2>
          <p className="text-base xl:text-lg text-muted-foreground">
            Join thousands of users who have transformed their daily productivity with DailyFlow's intuitive task management and motivational tracking system.
          </p>
        </div>

        <div className="grid gap-6">
          {benefits?.map((benefit, index) => (
            <div
              key={index}
              className="flex gap-4 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name={benefit?.icon} size={24} color="var(--color-primary)" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-medium text-foreground">
                  {benefit?.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-4 p-6 rounded-xl bg-primary/5 border border-primary/20">
          <Icon name="Shield" size={32} color="var(--color-primary)" />
          <div className="space-y-1">
            <h3 className="text-base font-medium text-foreground">
              Secure & Private
            </h3>
            <p className="text-sm text-muted-foreground">
              Your data is encrypted and protected with industry-standard security measures
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationBenefits;