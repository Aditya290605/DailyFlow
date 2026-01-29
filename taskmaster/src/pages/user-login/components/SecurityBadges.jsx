import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityBadges = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Lock',
      label: 'Secure Login',
      description: 'JWT-based authentication for maximum security'
    },
    {
      icon: 'Eye',
      label: 'Privacy First',
      description: 'We never share your personal information'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 lg:mt-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-border/50 transition-all duration-250 hover:bg-card hover:border-border"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground mb-1">
                {feature?.label}
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityBadges;