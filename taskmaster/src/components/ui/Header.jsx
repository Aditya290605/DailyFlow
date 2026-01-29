import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

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
    }
  ];

  const isActive = (path) => {
    return location?.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
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
          <div className="header-nav-logo-icon">
            <Icon name="CheckCircle2" size={24} color="var(--color-primary)" />
          </div>
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