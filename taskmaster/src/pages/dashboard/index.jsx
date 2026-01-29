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
  const [tasks, setTasks] = useState([]);
  const [contributions, setContributions] = useState([]);
  const [isDaySubmitted, setIsDaySubmitted] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const api = await import('../../services/api');
        const tasksData = await api.getTasks();
        setTasks(tasksData);

        const { stats, metrics } = await api.getAnalytics();
        setContributions(stats); // Stats are now the source of truth for contributions

        setCurrentStreak(metrics?.currentStreak || 0);
        setLongestStreak(metrics?.longestStreak || 0);

        // Check if today is already submitted
        const today = new Date();
        const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const todayStat = stats.find(s => s.date === dateString);
        if (todayStat) {
          setIsDaySubmitted(true);
        }

      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };
    loadData();
  }, []);

  const calculateProgress = () => {
    if (tasks?.length === 0) return 0;
    const completedTasks = tasks?.filter(task => task?.completed)?.length;
    return Math.round((completedTasks / tasks?.length) * 100);
  };

  const calculateTotalCompleted = () => {
    return tasks?.filter(task => task?.completed)?.length || 0;
  };

  const handleAddTask = async () => {
    if (newTaskText?.trim()) {
      try {
        const { addTask } = await import('../../services/api');
        const newTask = await addTask(newTaskText.trim());
        setTasks([newTask, ...tasks]);
        setNewTaskText('');
      } catch (err) {
        console.error("Failed to add task", err);
      }
    }
  };

  const handleToggleTask = async (taskId) => {
    const task = tasks.find(t => t._id === taskId || t.id === taskId);
    if (!task) return;

    try {
      const { updateTask } = await import('../../services/api');
      // Optimistic update
      const updatedTasks = tasks.map(t =>
        (t._id === taskId || t.id === taskId) ? { ...t, completed: !t.completed } : t
      );
      setTasks(updatedTasks);

      await updateTask(taskId, { completed: !task.completed });
    } catch (err) {
      console.error("Failed to toggle task", err);
    }
  };

  const handleEditTask = async (taskId, newText) => {
    try {
      const { updateTask } = await import('../../services/api');
      const updatedTask = await updateTask(taskId, { text: newText });

      setTasks(tasks.map(task =>
        (task._id === taskId || task.id === taskId) ? updatedTask : task
      ));
    } catch (err) {
      console.error("Failed to edit task", err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const { deleteTask } = await import('../../services/api');
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId && task.id !== taskId));
    } catch (err) {
      console.error("Failed to delete task", err);
    }
  };

  const handleSubmitDay = async () => {
    try {
      const { submitDay } = await import('../../services/api');
      const { metrics } = await submitDay();

      setIsDaySubmitted(true);
      setCurrentStreak(metrics.currentStreak);
      setLongestStreak(metrics.longestStreak);

      // Ideally re-fetch or optimistically add to contributions to update calendar immediately
      // For simplicity in this step, we just update streaks and panel state
    } catch (err) {
      console.error("Failed to submit day", err);
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

  // Calculate Weekly Data for Chart from Real Stats
  const getWeeklyData = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const last7Days = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateString = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

      const stat = contributions.find(c => c.date === dateString);
      last7Days.push({
        day: days[d.getDay()],
        completion: stat ? stat.percentage : 0
      });
    }
    return last7Days;
  };

  const weeklyData = getWeeklyData();

  return (
    <>
      <Header />
      <div className="content-container">
        <div className="page-content">
          <div className="mb-6 md:mb-8 lg:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Welcome back! 👋
              </h1>
              <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
                {currentDate}
              </p>
            </div>
            {/* Removed Profile Section from here */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Indicator Row */}
              <div>
                <ProgressIndicator percentage={calculateProgress()} />
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-foreground">
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
                        key={task?._id || task?.id}
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