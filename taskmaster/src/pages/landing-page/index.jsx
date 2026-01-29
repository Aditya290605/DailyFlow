import React from 'react';
import HeroSection from './components/HeroSection';
import BenefitsSection from './components/BenefitsSection';
import TestimonialsSection from './components/TestimonialsSection';
import FeaturesShowcase from './components/FeaturesShowcase';
import SocialProofSection from './components/SocialProofSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <BenefitsSection />
      <FeaturesShowcase />
      <TestimonialsSection />
      <SocialProofSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default LandingPage;