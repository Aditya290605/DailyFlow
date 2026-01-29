import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MobileNav from '../../components/ui/MobileNav';
import Icon from '../../components/AppIcon';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import TaskCard from './components/TaskCard';
import ProgressIndicator from './components/ProgressIndicator';
import StreakCounter from './components/StreakCounter';
import ContributionCalendar from './components/ContributionCalendar';
import DaySubmissionPanel from './components/DaySubmissionPanel';
import QuickAnalytics from './components/QuickAnalytics';

const Dashboard = () => {
  const [newTaskText, setNewTaskText] = useState('');
  const [tasks, setTasks] = useState([
    { id: 1, text: "Review project documentation and update README", completed: true },
    { id: 2, text: "Complete code review for pull request #234", completed: true },
    { id: 3, text: "Attend team standup meeting at 10 AM", completed: false },
    { id: 4, text: "Write unit tests for authentication module", completed: false },
    { id: 5, text: "Update project timeline and milestones", completed: false }
  ]);
  const [isDaySubmitted, setIsDaySubmitted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(7);
  const [longestStreak, setLongestStreak] = useState(14);

  const generateContributions = () => {
    const contributions = [];
    const today = new Date();
    
    for (let i = 90; i >= 0; i--) {
      const date = new Date(today);
      date?.setDate(date?.getDate() - i);
      const dateString = date?.toISOString()?.split('T')?.[0];
      
      const totalTasks = Math.floor(Math.random() * 8) + 3;
      const tasksCompleted = Math.floor(Math.random() * (totalTasks + 1));
      const percentage = Math.round((tasksCompleted / totalTasks) * 100);
      
      contributions?.push({
        date: dateString,
        percentage: percentage,
        tasksCompleted: tasksCompleted,
        totalTasks: totalTasks
      });
    }
    
    return contributions;
  };

  const [contributions] = useState(generateContributions());

  const weeklyData = [
    { day: 'Mon', completion: 85 },
    { day: 'Tue', completion: 92 },
    { day: 'Wed', completion: 78 },
    { day: 'Thu', completion: 95 },
    { day: 'Fri', completion: 88 },
    { day: 'Sat', completion: 100 },
    { day: 'Sun', completion: 75 }
  ];

  const calculateProgress = () => {
    if (tasks?.length === 0) return 0;
    const completedTasks = tasks?.filter(task => task?.completed)?.length;
    return Math.round((completedTasks / tasks?.length) * 100);
  };

  const handleAddTask = () => {
    if (newTaskText?.trim() && !isDaySubmitted) {
      const newTask = {
        id: Date.now(),
        text: newTaskText?.trim(),
        completed: false
      };
      setTasks([...tasks, newTask]);
      setNewTaskText('');
    }
  };

  const handleToggleTask = (taskId) => {
    if (!isDaySubmitted) {
      setTasks(tasks?.map(task =>
        task?.id === taskId ? { ...task, completed: !task?.completed } : task
      ));
    }
  };

  const handleEditTask = (taskId, newText) => {
    if (!isDaySubmitted) {
      setTasks(tasks?.map(task =>
        task?.id === taskId ? { ...task, text: newText } : task
      ));
    }
  };

  const handleDeleteTask = (taskId) => {
    if (!isDaySubmitted) {
      setTasks(tasks?.filter(task => task?.id !== taskId));
    }
  };

  const handleSubmitDay = () => {
    setIsDaySubmitted(true);
    const completionPercentage = calculateProgress();
    
    if (completionPercentage >= 80) {
      setCurrentStreak(prev => prev + 1);
      if (currentStreak + 1 > longestStreak) {
        setLongestStreak(currentStreak + 1);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleAddTask();
    }
  };

  const currentDate = new Date()?.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <>
      <Header />
      <div className="content-container">
        <div className="page-content">
          <div className="mb-6 md:mb-8 lg:mb-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              Welcome back! 👋
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
              {currentDate}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mb-6 md:mb-8 lg:mb-10">
            <div className="lg:col-span-2 space-y-4 md:space-y-6 lg:space-y-8">
              <ProgressIndicator percentage={calculateProgress()} />

              <div className="bg-card border border-border rounded-lg p-4 md:p-6 lg:p-8">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
                    Today's Tasks
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm md:text-base text-muted-foreground data-text">
                      {tasks?.filter(t => t?.completed)?.length}/{tasks?.length}
                    </span>
                    <Icon name="ListTodo" size={24} className="text-primary" />
                  </div>
                </div>

                {!isDaySubmitted && (
                  <div className="mb-4 md:mb-6">
                    <div className="flex gap-2 md:gap-3">
                      <div className="flex-1">
                        <Input
                          type="text"
                          placeholder="Add a new task..."
                          value={newTaskText}
                          onChange={(e) => setNewTaskText(e?.target?.value)}
                          onKeyPress={handleKeyPress}
                        />
                      </div>
                      <Button
                        variant="default"
                        size="default"
                        onClick={handleAddTask}
                        iconName="Plus"
                        disabled={!newTaskText?.trim()}
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                )}

                <div className="space-y-3 md:space-y-4">
                  {tasks?.length === 0 ? (
                    <div className="text-center py-8 md:py-12">
                      <Icon name="ListTodo" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm md:text-base text-muted-foreground">
                        No tasks yet. Add your first task to get started!
                      </p>
                    </div>
                  ) : (
                    tasks?.map(task => (
                      <TaskCard
                        key={task?.id}
                        task={task}
                        onToggle={handleToggleTask}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4 md:space-y-6 lg:space-y-8">
              <StreakCounter 
                currentStreak={currentStreak} 
                longestStreak={longestStreak} 
              />
              
              <DaySubmissionPanel
                isSubmitted={isDaySubmitted}
                onSubmit={handleSubmitDay}
                completionPercentage={calculateProgress()}
              />

              <QuickAnalytics weeklyData={weeklyData} />
            </div>
          </div>

          <ContributionCalendar contributions={contributions} />
        </div>
      </div>
      <MobileNav />
    </>
  );
};

export default Dashboard;