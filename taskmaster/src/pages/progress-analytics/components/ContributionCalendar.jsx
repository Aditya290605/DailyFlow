import React, { useState, useMemo } from 'react';

const ContributionCalendar = ({ contributions }) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('all');

  // Enhanced color palette with glow effects
  const getIntensityStyle = (percentage) => {
    if (percentage === 0) return {
      backgroundColor: '#0d1117',
      border: '1px solid #21262d',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)'
    };
    if (percentage < 25) return {
      backgroundColor: '#0e4429',
      border: '1px solid #0e4429',
      boxShadow: '0 0 2px rgba(14, 68, 41, 0.3)'
    };
    if (percentage < 50) return {
      backgroundColor: '#006d32',
      border: '1px solid #006d32',
      boxShadow: '0 0 3px rgba(0, 109, 50, 0.4)'
    };
    if (percentage < 75) return {
      backgroundColor: '#26a641',
      border: '1px solid #26a641',
      boxShadow: '0 0 4px rgba(38, 166, 65, 0.5)'
    };
    return {
      backgroundColor: '#39d353',
      border: '1px solid #39d353',
      boxShadow: '0 0 6px rgba(57, 211, 83, 0.6), inset 0 0 0 1px rgba(255,255,255,0.1)'
    };
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const isToday = (dateString) => {
    const today = new Date();
    const d = new Date(dateString);
    return d.toDateString() === today.toDateString();
  };

  // Calculate comprehensive statistics
  const stats = useMemo(() => {
    if (!contributions || !Array.isArray(contributions)) {
      return {
        total: 0,
        currentStreak: 0,
        longestStreak: 0,
        average: 0,
        bestDay: null,
        activeWeeks: 0,
        completionRate: 0
      };
    }

    const total = contributions.reduce((sum, c) => sum + (c.tasksCompleted || 0), 0);
    const today = new Date();
    const daysInYear = Math.ceil((today - new Date(today.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24));
    const average = daysInYear > 0 ? (total / daysInYear).toFixed(1) : 0;

    // Find best day
    const bestDay = contributions.reduce((best, curr) =>
      (curr.tasksCompleted > (best?.tasksCompleted || 0)) ? curr : best, null
    );

    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const sortedContributions = [...contributions]
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    let lastDate = null;
    for (const contrib of sortedContributions) {
      const date = new Date(contrib.date);

      if (contrib.tasksCompleted > 0) {
        if (!lastDate || Math.abs(date - lastDate) <= 1000 * 60 * 60 * 24) {
          tempStreak++;
        } else {
          longestStreak = Math.max(longestStreak, tempStreak);
          tempStreak = 1;
        }
        lastDate = date;
      } else {
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 0;
        lastDate = null;
      }
    }
    longestStreak = Math.max(longestStreak, tempStreak);

    // Current streak (counting backwards from today)
    const todayStr = today.toISOString().split('T')[0];
    let checkDate = new Date(today);
    while (checkDate >= new Date(today.getFullYear(), 0, 1)) {
      const dateStr = checkDate.toISOString().split('T')[0];
      const dayData = contributions.find(c => c.date === dateStr);
      if (dayData && dayData.tasksCompleted > 0) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Active weeks (weeks with at least one contribution)
    const weeks = new Set();
    contributions.forEach(c => {
      if (c.tasksCompleted > 0) {
        const date = new Date(c.date);
        const weekNum = Math.floor((date - new Date(date.getFullYear(), 0, 1)) / (1000 * 60 * 60 * 24 * 7));
        weeks.add(weekNum);
      }
    });

    const activeWeeks = weeks.size;
    const completionRate = ((contributions.filter(c => c.tasksCompleted > 0).length / daysInYear) * 100).toFixed(0);

    return {
      total,
      currentStreak,
      longestStreak,
      average,
      bestDay,
      activeWeeks,
      completionRate
    };
  }, [contributions]);

  // Generate calendar data
  const calendarData = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const startDate = new Date(currentYear, 0, 1);
    const endDate = new Date(currentYear, 11, 31); // Show full year till December

    const getDateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

    const contributionMap = new Map();
    if (contributions && Array.isArray(contributions)) {
      contributions.forEach(c => contributionMap.set(c.date, c));
    }

    const weeks = [];
    let currentWeek = [];

    // Offset for the first week
    const startDayOfWeek = startDate.getDay();
    for (let i = 0; i < startDayOfWeek; i++) {
      currentWeek.push(null);
    }

    let current = new Date(startDate);
    while (current <= endDate) {
      const dateKey = getDateKey(current);
      const isFuture = current > today;
      const data = contributionMap.get(dateKey) || {
        date: dateKey,
        percentage: 0,
        tasksCompleted: 0,
        isFuture
      };
      data.isFuture = isFuture;

      currentWeek.push(data);

      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }

      current.setDate(current.getDate() + 1);
    }

    // Push last partial week
    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) currentWeek.push(null);
      weeks.push(currentWeek);
    }

    // Month Labels Logic
    const monthLabels = [];
    let currentMonth = -1;

    weeks.forEach((week, weekIndex) => {
      const firstDay = week.find(d => d !== null);
      if (firstDay) {
        const d = new Date(firstDay.date);
        if (d.getMonth() !== currentMonth) {
          monthLabels.push({
            month: d.toLocaleDateString('en-US', { month: 'short' }),
            monthNum: d.getMonth(),
            weekIndex
          });
          currentMonth = d.getMonth();
        }
      }
    });

    return { weeks, monthLabels };
  }, [contributions]);

  const filteredWeeks = useMemo(() => {
    if (selectedMonth === 'all') return calendarData.weeks;

    return calendarData.weeks.filter(week => {
      const firstDay = week.find(d => d !== null);
      if (!firstDay) return false;
      const d = new Date(firstDay.date);
      return d.getMonth() === parseInt(selectedMonth);
    });
  }, [selectedMonth, calendarData.weeks]);

  return (
    <div className="w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-2xl p-8 border border-slate-800/50 shadow-2xl relative overflow-hidden">
      {/* Ambient background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        {/* Header with year selector */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-2">
              {new Date().getFullYear()} Contribution Graph
            </h2>
            <p className="text-sm text-slate-400">
              {stats.total.toLocaleString()} contributions • {stats.completionRate}% active days
            </p>
          </div>

          {/* Mini stats */}
          <div className="flex gap-4">
            <div className="text-right">
              <p className="text-xs text-slate-500">Current Streak</p>
              <p className="text-2xl font-bold text-orange-400">{stats.currentStreak}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Longest Streak</p>
              <p className="text-2xl font-bold text-emerald-400">{stats.longestStreak}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Daily Avg</p>
              <p className="text-2xl font-bold text-cyan-400">{stats.average}</p>
            </div>
          </div>
        </div>

        {/* Month filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <button
            onClick={() => setSelectedMonth('all')}
            className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${selectedMonth === 'all'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700/50'
              }`}
          >
            All Year
          </button>
          {calendarData.monthLabels.map((m) => (
            <button
              key={m.monthNum}
              onClick={() => setSelectedMonth(m.monthNum.toString())}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${selectedMonth === m.monthNum.toString()
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-slate-800/50 text-slate-400 hover:bg-slate-800 border border-slate-700/50'
                }`}
            >
              {m.month}
            </button>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          <div className="min-w-[900px]">
            <div className="flex flex-col">
              {/* Top Labels (Months) */}
              <div className="flex text-xs text-slate-400 relative h-6 w-full mb-1 ml-[42px]">
                {calendarData.monthLabels
                  .filter(m => selectedMonth === 'all' || m.monthNum === parseInt(selectedMonth))
                  .map((m, i) => {
                    const adjustedIndex = selectedMonth === 'all'
                      ? m.weekIndex
                      : filteredWeeks.findIndex(week => {
                        const firstDay = week.find(d => d !== null);
                        return firstDay && new Date(firstDay.date).getMonth() === m.monthNum;
                      });
                    return (
                      <span
                        key={i}
                        className="font-medium"
                        style={{
                          position: 'absolute',
                          left: `${adjustedIndex * 22}px`
                        }}
                      >
                        {m.month}
                      </span>
                    );
                  })}
              </div>

              <div className="flex gap-[4px]">
                {/* Day of Week Labels */}
                <div className="flex flex-col justify-around text-[11px] text-slate-400 w-[38px] pr-2 h-[150px] font-medium">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>

                {/* Calendar Grid */}
                <div className="flex gap-[4px]">
                  {filteredWeeks.map((week, weekIdx) => (
                    <div key={weekIdx} className="flex flex-col gap-[4px]">
                      {week.map((day, dayIdx) => {
                        if (!day) {
                          return (
                            <div
                              key={`empty-${weekIdx}-${dayIdx}`}
                              className="w-[18px] h-[18px]"
                            />
                          );
                        }

                        const intensity = getIntensityStyle(day.percentage);
                        const isFutureDay = day.isFuture;

                        return (
                          <div
                            key={day.date}
                            className="relative group"
                            onMouseEnter={() => !isFutureDay && setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                          >
                            <div
                              className={`w-[18px] h-[18px] rounded-[2px] transition-all duration-200 ${isFutureDay
                                ? 'opacity-20 cursor-default'
                                : 'cursor-pointer hover:scale-110 hover:z-10 hover:ring-1 hover:ring-slate-500'
                                } ${isToday(day.date) ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-slate-950' : ''}`}
                              style={isFutureDay ? { backgroundColor: '#0d1117', border: '1px solid #21262d' } : intensity}
                            />

                            {/* Enhanced Tooltip */}
                            {!isFutureDay && (
                              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2.5 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none">
                                <div className="bg-slate-800/95 backdrop-blur-md text-white border border-slate-600/50 rounded-lg px-4 py-3 shadow-2xl whitespace-nowrap">
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-3 h-3 rounded-sm flex-shrink-0" style={intensity} />
                                    <p className="text-sm font-bold">
                                      {day.tasksCompleted} {day.tasksCompleted === 1 ? 'contribution' : 'contributions'}
                                    </p>
                                  </div>
                                  <p className="text-xs text-slate-300">
                                    {formatDate(day.date)}
                                  </p>
                                  {isToday(day.date) && (
                                    <span className="inline-block mt-2 text-[10px] bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                                      Today
                                    </span>
                                  )}
                                  {stats.bestDay && day.date === stats.bestDay.date && (
                                    <span className="inline-block mt-2 text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full">
                                      🔥 Best Day
                                    </span>
                                  )}
                                </div>
                                {/* Arrow */}
                                <div className="w-2 h-2 bg-slate-800/95 backdrop-blur-md border-r border-b border-slate-600/50 transform rotate-45 absolute left-1/2 -ml-1 -bottom-1" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Legend and Info */}
              <div className="flex items-center justify-between mt-5 text-xs text-slate-400 ml-[42px]">
                <div className="flex items-center gap-4">
                  <a href="#" className="hover:text-emerald-400 hover:underline transition-colors flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Learn how we count contributions
                  </a>
                  {stats.bestDay && (
                    <span className="text-slate-500">
                      Best: {stats.bestDay.tasksCompleted} on {new Date(stats.bestDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-medium">Less</span>
                  <div className="flex gap-[4px]">
                    {[0, 20, 45, 70, 95].map((percentage, i) => (
                      <div
                        key={i}
                        className="w-[18px] h-[18px] rounded-[2px] transition-transform hover:scale-125 cursor-pointer"
                        style={getIntensityStyle(percentage)}
                      />
                    ))}
                  </div>
                  <span className="font-medium">More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionCalendar;