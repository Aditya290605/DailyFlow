import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard'
    },
    {
      label: 'Analytics',
      path: '/progress-analytics',
      icon: 'TrendingUp'
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'User'
    }
  ];

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <div className="mobile-nav-container">
        {navigationItems?.map((item) => (
          <button
            key={item?.path}
            onClick={() => handleNavigation(item?.path)}
            className={`mobile-nav-item ${isActive(item?.path) ? 'active' : ''}`}
            aria-current={isActive(item?.path) ? 'page' : undefined}
          >
            <Icon
              name={item?.icon}
              size={24}
            />
            <span className="mobile-nav-item-label">{item?.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;