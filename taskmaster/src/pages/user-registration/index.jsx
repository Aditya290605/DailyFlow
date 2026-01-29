import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationHeader from './components/RegistrationHeader';
import RegistrationForm from './components/RegistrationForm';
import RegistrationBenefits from './components/RegistrationBenefits';

const UserRegistration = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen flex flex-col">
        <header className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-4 md:py-6 border-b border-border">
          <button
            onClick={() => navigate('/landing-page')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <img src="/assets/logo.png" alt="DailyFlow Logo" className="h-6 w-6 md:h-8 md:w-8 object-contain" />
            </div>
            <span className="text-xl md:text-2xl font-semibold text-foreground">
              DailyFlow
            </span>
          </button>

          <button
            onClick={() => navigate('/user-login')}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 rounded-lg text-sm md:text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
          >
            <Icon name="LogIn" size={18} />
            <span className="hidden sm:inline">Sign In</span>
          </button>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="w-full max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center">
                <div className="w-full max-w-md mx-auto">
                  <RegistrationHeader />

                  <div className="bg-card border border-border rounded-2xl p-6 md:p-8 lg:p-10 shadow-lg">
                    <RegistrationForm />
                  </div>

                  <div className="mt-6 md:mt-8 text-center">
                    <div className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground">
                      <Icon name="Lock" size={16} />
                      <span>SSL Secured · Your data is encrypted and protected</span>
                    </div>
                  </div>
                </div>
              </div>

              <RegistrationBenefits />
            </div>
          </div>
        </main>

        <footer className="border-t border-border px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
                © {new Date()?.getFullYear()} DailyFlow. All rights reserved.
              </p>
              <div className="flex items-center gap-4 md:gap-6">
                <button
                  onClick={() => window.open('/terms', '_blank')}
                  className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </button>
                <button
                  onClick={() => window.open('/privacy', '_blank')}
                  className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </button>
                <button
                  onClick={() => window.open('/contact', '_blank')}
                  className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default UserRegistration;