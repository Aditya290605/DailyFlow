import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MobileNav from '../../components/ui/MobileNav';
import WelcomeSection from './components/WelcomeSection';
import LoginForm from './components/LoginForm';
import SecurityBadges from './components/SecurityBadges';

const UserLogin = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Sign In - DailyFlow | Access Your Productivity Dashboard</title>
        <meta 
          name="description" 
          content="Sign in to DailyFlow to access your personal productivity dashboard, track daily tasks, and maintain your consistency streak." 
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="content-container">
          <div className="page-content">
            <div className="max-w-6xl mx-auto">
              <WelcomeSection />
              
              <div className="flex justify-center mb-8 lg:mb-12">
                <LoginForm />
              </div>
              
              <SecurityBadges />
            </div>
          </div>
        </main>

        <MobileNav />
      </div>
    </>
  );
};

export default UserLogin;