import React from 'react';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 md:py-16 lg:py-24 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 text-center">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 lg:p-16 shadow-xl">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
            <Icon name="Rocket" size={36} color="var(--color-primary)" />
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6">
            Ready to Build Your Consistency Habit?
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 lg:mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of users who are transforming their productivity with daily task tracking, visual progress monitoring, and motivational streak counters.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="default"
              size="xl"
              iconName="ArrowRight"
              iconPosition="right"
              onClick={() => navigate('/user-registration')}
              className="w-full sm:w-auto"
            >
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="xl"
              iconName="PlayCircle"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Watch Demo
            </Button>
          </div>

          <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span>Free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Check" size={16} color="var(--color-success)" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;