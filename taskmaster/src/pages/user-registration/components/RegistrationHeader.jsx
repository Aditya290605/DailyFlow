import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationHeader = () => {
  return (
    <div className="text-center space-y-4 mb-8 md:mb-10 lg:mb-12">
      <div className="flex justify-center">
        <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-2xl bg-primary/10 flex items-center justify-center glow-primary">
          <Icon name="UserPlus" size={32} color="var(--color-primary)" className="md:w-10 md:h-10 lg:w-12 lg:h-12" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground">
          Create Your Account
        </h1>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground max-w-md mx-auto px-4">
          Start your productivity journey with DailyFlow and build consistent daily habits
        </p>
      </div>
    </div>
  );
};

export default RegistrationHeader;