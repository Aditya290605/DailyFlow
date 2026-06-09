import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import { logout } from '../../../services/api';

const BoardHeader = ({ boardName, currentStreak, longestStreak, totalCompleted }) => {
  const navigate = useNavigate();
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(boardName || 'Daily Tasks');
  const [user, setUser] = useState({ fullName: 'User' });
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user data", e);
      }
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/user-login');
  };

  const userInitial = user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U';

  return (
    <div
      className="flex items-center justify-between px-4 py-3 border-b"
      style={{
        background: 'rgba(26, 29, 39, 0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderColor: 'rgba(255,255,255,0.06)',
      }}
    >
      {/* Left — Board name */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
        >
          <Icon name="Layers" size={16} color="white" />
        </div>

        {editingName ? (
          <input
            autoFocus
            className="text-white font-bold text-lg bg-white/10 border border-white/20 rounded-md px-3 py-1 outline-none focus:border-emerald-400 transition-colors"
            value={nameValue}
            onChange={(e) => setNameValue(e.target.value)}
            onBlur={() => setEditingName(false)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === 'Escape') setEditingName(false); }}
          />
        ) : (
          <button
            onClick={() => setEditingName(true)}
            className="text-white font-bold text-lg hover:bg-white/10 rounded-md px-2 py-1 transition-colors"
          >
            {nameValue}
          </button>
        )}
      </div>

      {/* Right — Streak + Analytics + Profile */}
      <div className="flex items-center gap-3">
        {/* Streak pill */}
        <div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
          style={{ background: 'rgba(251, 146, 60, 0.15)', border: '1px solid rgba(251, 146, 60, 0.3)', color: '#fb923c' }}
        >
          <Icon name="Flame" size={15} color="#fb923c" />
          <span>{currentStreak}d streak</span>
        </div>

        {/* Completed today pill */}
        {totalCompleted > 0 && (
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#34d399' }}
          >
            <Icon name="CheckCircle2" size={15} color="#34d399" />
            <span>{totalCompleted} done</span>
          </div>
        )}

        {/* Analytics button — navigates to /progress-analytics */}
        <button
          onClick={() => navigate('/progress-analytics')}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all bg-white/5 text-white/60 border border-white/10 hover:bg-emerald-500/15 hover:text-emerald-300 hover:border-emerald-400/30"
        >
          <Icon name="BarChart2" size={15} />
          <span className="hidden sm:inline">Analytics</span>
        </button>

        {/* Profile avatar + dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-full transition-all hover:bg-white/10"
            title="Profile"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{
                background: 'linear-gradient(135deg, #10B981, #059669)',
                color: 'white',
              }}
            >
              {userInitial}
            </div>
            <Icon
              name={showUserMenu ? "ChevronUp" : "ChevronDown"}
              size={14}
              color="rgba(255,255,255,0.5)"
            />
          </button>

          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
              <div
                className="absolute right-0 top-11 z-20 w-48 rounded-xl overflow-hidden shadow-2xl"
                style={{ background: 'rgba(26, 29, 39, 0.97)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                <button
                  onClick={() => { navigate('/profile'); setShowUserMenu(false); }}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors text-left"
                >
                  <Icon name="User" size={15} />
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left border-t"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <Icon name="LogOut" size={15} />
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardHeader;
