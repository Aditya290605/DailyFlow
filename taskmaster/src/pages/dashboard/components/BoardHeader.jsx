import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const BoardHeader = ({ boardName, currentStreak, longestStreak, totalCompleted }) => {
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState(boardName || 'Daily Tasks');

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

      {/* Right — Streak info pills */}
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
      </div>
    </div>
  );
};

export default BoardHeader;
