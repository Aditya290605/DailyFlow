import React from 'react';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import FeatureShowcase from './components/FeatureShowcase';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import TipsAndTricksSection from './components/TipsAndTricksSection';
import InspirationalQuotesSection from './components/InspirationalQuotesSection';
import UserGuideSection from './components/UserGuideSection';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <HeroSection />
      <TipsAndTricksSection />
      <UserGuideSection />
      <FeatureShowcase />
      <InspirationalQuotesSection />
      <BenefitsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;