import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BoardHeader = ({ boardName, currentStreak, longestStreak, totalCompleted, onShowAnalytics, showAnalytics }) => {
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(boardName || 'Daily Tasks');

  return (
    <div
      className="flex items-center justify-between px-4 py-3 border-b border-white/10"
      style={{
        background: 'rgba(15, 18, 30, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      {/* Left — Board name */}
      <div className="flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)' }}
        >
          <Icon name="Layers" size={16} color="white" />
        </div>

        {editingName ? (
          <input
            autoFocus
            className="text-white font-bold text-lg bg-white/10 border border-white/20 rounded-md px-3 py-1 outline-none focus:border-violet-400 transition-colors"
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

      {/* Right — Streak + Analytics toggle */}
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
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold"
            style={{ background: 'rgba(52, 211, 153, 0.15)', border: '1px solid rgba(52, 211, 153, 0.3)', color: '#34d399' }}
          >
            <Icon name="CheckCircle2" size={15} color="#34d399" />
            <span>{totalCompleted} done</span>
          </div>
        )}

        {/* Analytics toggle */}
        <button
          onClick={onShowAnalytics}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            showAnalytics
              ? 'bg-violet-500/30 text-violet-300 border border-violet-400/40'
              : 'bg-white/5 text-white/60 border border-white/10 hover:bg-white/10 hover:text-white'
          }`}
        >
          <Icon name="BarChart2" size={15} />
          <span className="hidden sm:inline">Analytics</span>
        </button>
      </div>
    </div>
  );
};

export default BoardHeader;
