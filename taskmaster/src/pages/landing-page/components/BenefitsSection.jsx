import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      icon: 'CheckCircle2',
      title: 'Daily Task Management',
      description: 'Create and organize your daily tasks with ease. Track completion in real-time and maintain focus on what matters most each day.'
    },
    {
      id: 2,
      icon: 'Flame',
      title: 'Streak Tracking',
      description: 'Build momentum with consecutive day streaks. Watch your consistency grow and stay motivated with visual progress indicators.'
    },
    {
      id: 3,
      icon: 'TrendingUp',
      title: 'Motivational Analytics',
      description: 'Gain insights into your productivity patterns with detailed charts and statistics. Celebrate achievements and identify improvement areas.'
    }
  ];

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">
            Everything You Need to Stay Consistent
          </h2>
          <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you build lasting productivity habits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {benefits?.map((benefit) => (
            <div
              key={benefit?.id}
              className="bg-card border border-border rounded-xl p-6 md:p-8 hover:border-primary/50 transition-all duration-250 hover:shadow-lg hover:glow-primary"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 md:mb-6">
                <Icon name={benefit?.icon} size={28} color="var(--color-primary)" />
              </div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground mb-2 md:mb-3">
                {benefit?.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {benefit?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;