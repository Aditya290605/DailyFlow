import React from 'react';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  const calendarData = [
    { date: '2026-01-01', completed: true },
    { date: '2026-01-02', completed: true },
    { date: '2026-01-03', completed: false },
    { date: '2026-01-04', completed: true },
    { date: '2026-01-05', completed: true },
    { date: '2026-01-06', completed: true },
    { date: '2026-01-07', completed: false },
    { date: '2026-01-08', completed: true },
    { date: '2026-01-09', completed: true },
    { date: '2026-01-10', completed: true },
    { date: '2026-01-11', completed: true },
    { date: '2026-01-12', completed: true },
    { date: '2026-01-13', completed: true },
    { date: '2026-01-14', completed: false },
    { date: '2026-01-15', completed: true },
    { date: '2026-01-16', completed: true },
    { date: '2026-01-17', completed: true },
    { date: '2026-01-18', completed: true },
    { date: '2026-01-19', completed: true },
    { date: '2026-01-20', completed: true },
    { date: '2026-01-21', completed: false },
    { date: '2026-01-22', completed: true },
    { date: '2026-01-23', completed: true },
    { date: '2026-01-24', completed: true },
    { date: '2026-01-25', completed: true },
    { date: '2026-01-26', completed: true },
    { date: '2026-01-27', completed: true },
    { date: '2026-01-28', completed: true },
    { date: '2026-01-29', completed: true }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-card to-background py-16 md:py-24 lg:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 md:mb-6">
              Build Daily Consistency Habits That Last
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-8 leading-relaxed">
              Transform your productivity with visual progress tracking, streak counters, and motivational analytics. Plan your day, track completion, and watch your consistency grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                variant="default"
                size="lg"
                iconName="Rocket"
                iconPosition="right"
                onClick={() => navigate('/user-registration')}
                className="w-full sm:w-auto"
              >
                Start Building Consistency
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="LogIn"
                iconPosition="right"
                onClick={() => navigate('/user-login')}
                className="w-full sm:w-auto"
              >
                Sign In
              </Button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="bg-card border border-border rounded-xl p-4 md:p-6 lg:p-8 shadow-lg w-full max-w-md">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-semibold text-foreground">Your Progress</h3>
                <div className="flex items-center gap-2 bg-primary/10 px-3 py-1.5 rounded-lg">
                  <span className="text-xl md:text-2xl font-bold text-primary">15</span>
                  <span className="text-xs md:text-sm text-muted-foreground">day streak</span>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 md:gap-2">
                {calendarData?.map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded transition-all duration-250 ${
                      day?.completed
                        ? 'bg-primary hover:bg-primary/80 glow-primary' :'bg-muted hover:bg-muted/80'
                    }`}
                    title={`${day?.date} - ${day?.completed ? 'Completed' : 'Incomplete'}`}
                  ></div>
                ))}
              </div>

              <div className="mt-4 md:mt-6 flex items-center justify-between text-xs md:text-sm text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-muted rounded"></div>
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-primary/40 rounded"></div>
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-primary/70 rounded"></div>
                  <div className="w-3 h-3 md:w-4 md:h-4 bg-primary rounded"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;