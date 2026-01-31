import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import { logout } from '../../services/api';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

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

  const handleLogout = () => {
    logout(); // Clear localStorage tokens
    navigate('/user-login');
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event?.key === 'Escape') {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isUserMenuOpen]);

  return (
    <header className="header-nav">
      <div className="header-nav-container">
        <div className="header-nav-logo">
          <img src="/assets/logo.png" alt="DailyFlow Logo" className="h-8 w-8 object-contain mr-2" />
          <span className="header-nav-logo-text">DailyFlow</span>
        </div>

        <nav className="header-nav-menu" aria-label="Primary navigation">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`header-nav-item ${isActive(item?.path) ? 'active' : ''}`}
              aria-current={isActive(item?.path) ? 'page' : undefined}
            >
              <Icon
                name={item?.icon}
                size={20}
                className="mr-2"
              />
              {item?.label}
            </button>
          ))}
        </nav>

        <div className="header-nav-actions">
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="user-menu-trigger"
              aria-expanded={isUserMenuOpen}
              aria-haspopup="true"
            >
              <div className="user-menu-avatar">
                <span>U</span>
              </div>
              <Icon
                name={isUserMenuOpen ? "ChevronUp" : "ChevronDown"}
                size={16}
                className="text-muted-foreground"
              />
            </button>

            {isUserMenuOpen && (
              <div className="user-menu-dropdown" role="menu">
                <button
                  onClick={handleLogout}
                  className="user-menu-item"
                  role="menuitem"
                >
                  <Icon name="LogOut" size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;