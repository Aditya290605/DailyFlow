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

  const weekData = [
    { date: "Mon", completion: 85, tasksCompleted: 6, totalTasks: 7 },
    { date: "Tue", completion: 100, tasksCompleted: 8, totalTasks: 8 },
    { date: "Wed", completion: 75, tasksCompleted: 6, totalTasks: 8 },
    { date: "Thu", completion: 90, tasksCompleted: 9, totalTasks: 10 },
    { date: "Fri", completion: 80, tasksCompleted: 4, totalTasks: 5 },
    { date: "Sat", completion: 100, tasksCompleted: 5, totalTasks: 5 },
    { date: "Sun", completion: 70, tasksCompleted: 7, totalTasks: 10 }
  ];

  const monthData = [
    { date: "Jan 1", completion: 85, tasksCompleted: 6, totalTasks: 7 },
    { date: "Jan 5", completion: 90, tasksCompleted: 9, totalTasks: 10 },
    { date: "Jan 10", completion: 75, tasksCompleted: 6, totalTasks: 8 },
    { date: "Jan 15", completion: 100, tasksCompleted: 8, totalTasks: 8 },
    { date: "Jan 20", completion: 80, tasksCompleted: 4, totalTasks: 5 },
    { date: "Jan 25", completion: 95, tasksCompleted: 19, totalTasks: 20 },
    { date: "Jan 29", completion: 88, tasksCompleted: 7, totalTasks: 8 }
  ];

  const quarterData = [
    { date: "Week 1", completion: 82, tasksCompleted: 41, totalTasks: 50 },
    { date: "Week 4", completion: 88, tasksCompleted: 44, totalTasks: 50 },
    { date: "Week 8", completion: 75, tasksCompleted: 38, totalTasks: 50 },
    { date: "Week 12", completion: 90, tasksCompleted: 45, totalTasks: 50 }
  ];

  const yearData = [
    { date: "Jan", completion: 85, tasksCompleted: 170, totalTasks: 200 },
    { date: "Feb", completion: 88, tasksCompleted: 176, totalTasks: 200 },
    { date: "Mar", completion: 82, tasksCompleted: 164, totalTasks: 200 },
    { date: "Apr", completion: 90, tasksCompleted: 180, totalTasks: 200 },
    { date: "May", completion: 87, tasksCompleted: 174, totalTasks: 200 },
    { date: "Jun", completion: 92, tasksCompleted: 184, totalTasks: 200 },
    { date: "Jul", completion: 85, tasksCompleted: 170, totalTasks: 200 },
    { date: "Aug", completion: 89, tasksCompleted: 178, totalTasks: 200 },
    { date: "Sep", completion: 91, tasksCompleted: 182, totalTasks: 200 },
    { date: "Oct", completion: 86, tasksCompleted: 172, totalTasks: 200 },
    { date: "Nov", completion: 88, tasksCompleted: 176, totalTasks: 200 },
    { date: "Dec", completion: 90, tasksCompleted: 180, totalTasks: 200 }
  ];

  const chartDataMap = {
    week: weekData,
    month: monthData,
    quarter: quarterData,
    year: yearData
  };

  const calendarData = Array.from({ length: 365 }, (_, i) => {
    const completionRate = Math.floor(Math.random() * 101);
    const totalTasks = Math.floor(Math.random() * 10) + 5;
    const tasksCompleted = Math.floor((completionRate / 100) * totalTasks);
    const date = new Date(2026, 0, 1);
    date?.setDate(date?.getDate() + i);
    
    return {
      date: date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      completion: completionRate,
      tasksCompleted,
      totalTasks
    };
  });

  const weekdayData = [
    { day: "Mon", average: 85, count: 52 },
    { day: "Tue", average: 88, count: 52 },
    { day: "Wed", average: 82, count: 52 },
    { day: "Thu", average: 90, count: 52 },
    { day: "Fri", average: 87, count: 52 },
    { day: "Sat", average: 92, count: 52 },
    { day: "Sun", average: 78, count: 52 }
  ];

  const insights = [
    {
      type: "achievement",
      title: "Consistency Champion",
      description: "You\'ve maintained a 15-day streak! Your dedication is paying off with an average completion rate of 87%.",
      metric: { label: "Current Streak", value: "15 days" }
    },
    {
      type: "pattern",
      title: "Peak Performance Days",
      description: "Your productivity peaks on Thursdays and Saturdays with completion rates above 90%. Consider scheduling important tasks on these days.",
      metric: { label: "Best Day", value: "Saturday 92%" }
    },
    {
      type: "milestone",
      title: "Milestone Achieved",
      description: "You\'ve completed 250 days this year! You\'re on track to reach your annual goal of 300 completed days.",
      metric: { label: "Progress", value: "83%" }
    },
    {
      type: "suggestion",
      title: "Improvement Opportunity",
      description: "Sundays show lower completion rates. Try planning lighter task loads or using this day for weekly reviews and planning.",
      metric: { label: "Sunday Average", value: "78%" }
    }
  ];

  const handleExport = () => {
    const dataToExport = {
      metrics: {
        currentStreak: 15,
        longestStreak: 28,
        averageCompletion: 87,
        totalCompletedDays: 250
      },
      chartData: chartDataMap?.[activeView],
      weekdayPerformance: weekdayData,
      exportDate: new Date()?.toISOString()
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dailyflow-analytics-${activeView}-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
                value="15 days"
                trend="up"
                trendValue="+3"
                color="var(--color-primary)"
              />
              <MetricsCard
                icon="Trophy"
                label="Longest Streak"
                value="28 days"
                trend={undefined}
                trendValue={undefined}
                color="var(--color-accent)"
              />
              <MetricsCard
                icon="Target"
                label="Average Completion"
                value="87%"
                trend="up"
                trendValue="+5%"
                color="var(--color-success)"
              />
              <MetricsCard
                icon="Calendar"
                label="Completed Days"
                value="250"
                trend="up"
                trendValue="+12"
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
                data={chartDataMap?.[activeView]}
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