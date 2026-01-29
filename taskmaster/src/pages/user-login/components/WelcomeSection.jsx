import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeSection = () => {
  return (
    <div className="text-center mb-8 lg:mb-12">
      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-primary/10 mb-4 md:mb-6">
        <Icon name="CheckCircle2" size={40} color="var(--color-primary)" className="hidden lg:block" />
        <Icon name="CheckCircle2" size={32} color="var(--color-primary)" className="hidden md:block lg:hidden" />
        <Icon name="CheckCircle2" size={28} color="var(--color-primary)" className="block md:hidden" />
      </div>
      
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 md:mb-3">
        Welcome Back to DailyFlow
      </h1>
      
      <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-md mx-auto px-4">
        Sign in to continue building your daily consistency and track your productivity journey
      </p>
    </div>
  );
};

export default WelcomeSection;