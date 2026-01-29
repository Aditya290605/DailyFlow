import React from 'react';
import Icon from '../../../components/AppIcon';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { label: 'Features', path: '/landing-page' },
      { label: 'Pricing', path: '/landing-page' },
      { label: 'FAQ', path: '/landing-page' }
    ],
    company: [
      { label: 'About', path: '/landing-page' },
      { label: 'Blog', path: '/landing-page' },
      { label: 'Careers', path: '/landing-page' }
    ],
    legal: [
      { label: 'Privacy', path: '/landing-page' },
      { label: 'Terms', path: '/landing-page' },
      { label: 'Security', path: '/landing-page' }
    ]
  };

  const socialLinks = [
    { icon: 'Twitter', label: 'Twitter', url: '#' },
    { icon: 'Github', label: 'GitHub', url: '#' },
    { icon: 'Linkedin', label: 'LinkedIn', url: '#' }
  ];

  return (
    <footer className="bg-card border-t border-border py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12 mb-8 md:mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="CheckCircle2" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-semibold text-foreground">DailyFlow</span>
            </div>
            <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
              Build daily consistency habits with visual progress tracking and motivational analytics.
            </p>
            <div className="flex gap-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  aria-label={social?.label}
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-all duration-250"
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
              Product
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks?.product?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-250"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
              Company
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-250"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 md:mb-4">
              Legal
            </h3>
            <ul className="space-y-2 md:space-y-3">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={() => navigate(link?.path)}
                    className="text-sm md:text-base text-muted-foreground hover:text-primary transition-colors duration-250"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              &copy; {currentYear} DailyFlow. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span>Secured with SSL encryption</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;