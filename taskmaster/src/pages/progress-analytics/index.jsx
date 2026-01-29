import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import MobileNav from '../../components/ui/MobileNav';
import MetricsCard from './components/MetricsCard';
import ChartControls from './components/ChartControls';
import CompletionChart from './components/CompletionChart';
import ContributionCalendar from './components/ContributionCalendar';
import InsightsPanel from './components/InsightsPanel';
import WeekdayPerformance from './components/WeekdayPerformance';

const ProgressAnalytics = () => {
  const [activeView, setActiveView] = useState('month');
  const [activeChart, setActiveChart] = useState('bar');
  const [stats, setStats] = useState([]);
  const [metrics, setMetrics] = useState({ currentStreak: 0, longestStreak: 0, totalCompletedDays: 0, averageCompletion: 0 });

  useEffect(() => {
    const loadData = async () => {
      try {
        const api = await import('../../services/api');
        const { stats, metrics } = await api.getAnalytics();
        setStats(stats);

        // Calculate average completion
        let totalAvg = 0;
        if (stats.length > 0) {
          totalAvg = Math.round(stats.reduce((acc, curr) => acc + curr.percentage, 0) / stats.length);
        }
        setMetrics({ ...metrics, averageCompletion: totalAvg });

      } catch (err) {
        console.error("Failed to load analytics", err);
      }
    };
    loadData();
  }, []);

  // Process Stats for different views
  const getProcessedData = (view) => {
    if (!stats || !Array.isArray(stats) || !stats.length) return [];

    // Naively mapping last 7 days for 'week' view as an example
    // Full implementation would handle day aggregations properly
    if (view === 'week') {
      return stats.slice(-7).map(s => {
        const d = new Date(s.date);
        return {
          date: d.toLocaleDateString('en-US', { weekday: 'short' }),
          completion: s.percentage,
          tasksCompleted: s.tasksCompleted,
          totalTasks: s.totalTasks
        };
      });
    }

    // Mapping for Month
    if (view === 'month') {
      return stats.slice(-30).map(s => {
        const d = new Date(s.date);
        return {
          date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          completion: s.percentage,
          tasksCompleted: s.tasksCompleted,
          totalTasks: s.totalTasks
        };
      });
    }

    return stats; // default fallback
  };

  const chartData = getProcessedData(activeView);

  // Weekday Performance Calculation
  const getWeekdayData = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayTotals = { 0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] };

    if (stats && Array.isArray(stats)) {
      stats.forEach(s => {
        const d = new Date(s.date);
        // day is actually 0-6 in stats usually if generated, but date string parsing needs care
        // Assuming UTC date string YYYY-MM-DD
        dayTotals[d.getDay()].push(s.percentage);
      });
    }

    return days.map((day, index) => {
      const scores = dayTotals[index];
      const average = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
      return { day, average, count: scores.length };
    });
  };

  const weekdayData = getWeekdayData();

  // Simple Insights Logic
  const insights = [
    {
      type: "achievement",
      title: "Consistency Champion",
      description: `You've maintained a ${metrics?.currentStreak || 0}-day streak! Keep going!`,
      metric: { label: "Current Streak", value: `${metrics?.currentStreak || 0} days` }
    },
    {
      type: "milestone",
      title: "Task Master",
      description: `You've completed ${metrics?.totalCompletedDays || 0} days fully.`,
      metric: { label: "Total Days", value: `${metrics?.totalCompletedDays || 0}` }
    }
  ];

  // Format Calendar Data
  const calendarData = Array.isArray(stats) ? stats.map(s => {
    const d = new Date(s.date);
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completion: s.percentage,
      tasksCompleted: s.tasksCompleted,
      totalTasks: s.totalTasks
    };
  }) : [];

  const handleExport = () => {
    const dataToExport = {
      metrics,
      stats,
      exportDate: new Date()?.toISOString()
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dailyflow-analytics-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>Progress Analytics - DailyFlow</title>
        <meta name="description" content="Comprehensive visualization of your productivity trends, achievement patterns, and performance insights with interactive charts and analytics." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="content-container">
          <div className="page-content">
            <div className="mb-6 md:mb-8">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-2">
                Progress Analytics
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Track your productivity trends and achievement patterns over time
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
              <MetricsCard
                icon="Flame"
                label="Current Streak"
                value={`${metrics.currentStreak} days`}
                trend="neutral"
                trendValue="-"
                color="var(--color-primary)"
              />
              <MetricsCard
                icon="Trophy"
                label="Longest Streak"
                value={`${metrics.longestStreak} days`}
                trend={undefined}
                trendValue={undefined}
                color="var(--color-accent)"
              />
              <MetricsCard
                icon="Target"
                label="Average Completion"
                value={`${metrics.averageCompletion}%`}
                trend="neutral"
                trendValue="-"
                color="var(--color-success)"
              />
              <MetricsCard
                icon="Calendar"
                label="Completed Days"
                value={`${metrics.totalCompletedDays}`}
                trend="neutral"
                trendValue="-"
                color="var(--color-secondary)"
              />
            </div>

            <div className="mb-6 md:mb-8">
              <ChartControls
                activeView={activeView}
                onViewChange={setActiveView}
                activeChart={activeChart}
                onChartChange={setActiveChart}
                onExport={handleExport}
              />
              <CompletionChart
                data={chartData}
                chartType={activeChart}
                timeView={activeView}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
              <WeekdayPerformance data={weekdayData} />
              <InsightsPanel insights={insights} />
            </div>

            <div className="mb-6 md:mb-8">
              <ContributionCalendar data={calendarData} />
            </div>

            <div className="bg-card border border-border rounded-lg p-4 md:p-6 text-center">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2">
                  Keep Building Your Streak!
                </h3>
                <p className="text-sm md:text-base text-muted-foreground mb-4">
                  You're doing amazing! Consistency is the key to success. Every completed day brings you closer to your goals.
                </p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
                  <span className="text-2xl">🎯</span>
                  <span className="text-sm font-medium text-primary">
                    Next milestone: 300 completed days
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <MobileNav />
      </div>
    </>
  );
};
export default ProgressAnalytics;