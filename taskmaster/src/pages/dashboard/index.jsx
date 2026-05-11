import React, { useState, useEffect, useCallback, useRef } from 'react';
import Icon from '../../components/AppIcon';
import MobileNav from '../../components/ui/MobileNav';
import BoardHeader from './components/BoardHeader';
import BucketColumn from './components/BucketColumn';
import ContributionCalendar from './components/ContributionCalendar';
import StreakCounter from './components/StreakCounter';

// ─── Helpers ────────────────────────────────────────────────────────────────

const groupTasksByBucket = (tasks) => {
  const map = {};
  tasks.forEach(task => {
    const bid = task.bucketId ? task.bucketId.toString() : '__none__';
    if (!map[bid]) map[bid] = [];
    map[bid].push(task);
  });
  // Sort tasks within each bucket by position
  Object.keys(map).forEach(bid => {
    map[bid].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
  });
  return map;
};

// ─── Dashboard ────────────────────────────────────────────────────────────────

const Dashboard = () => {
  const [buckets, setBuckets] = useState([]);
  const [tasksByBucket, setTasksByBucket] = useState({});
  const [contributions, setContributions] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [isAddingBucket, setIsAddingBucket] = useState(false);
  const [newBucketName, setNewBucketName] = useState('');
  const [draggingTask, setDraggingTask] = useState(null);
  const [draggingFromBucket, setDraggingFromBucket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const boardRef = useRef(null);

  // ── Load data on mount ─────────────────────────────────────────────────

  useEffect(() => {
    const loadData = async () => {
      try {
        const api = await import('../../services/api');
        const [bucketsData, tasksData, analyticsData] = await Promise.all([
          api.getBuckets(),
          api.getTasks(),
          api.getAnalytics(),
        ]);

        setBuckets(bucketsData);
        setTasksByBucket(groupTasksByBucket(tasksData));
        setContributions(analyticsData.stats);
        setCurrentStreak(analyticsData.metrics?.currentStreak || 0);
        setLongestStreak(analyticsData.metrics?.longestStreak || 0);
      } catch (err) {
        console.error('Failed to load board data', err);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // ── Computed values ────────────────────────────────────────────────────

  const totalCompleted = Object.values(tasksByBucket).flat().filter(t => t.completed).length;
  const totalTasks = Object.values(tasksByBucket).flat().length;

  // ── Task handlers ──────────────────────────────────────────────────────

  const handleAddTask = async (text, bucketId) => {
    try {
      const api = await import('../../services/api');
      const newTask = await api.addTask(text, bucketId);
      setTasksByBucket(prev => {
        const bid = bucketId.toString();
        return { ...prev, [bid]: [...(prev[bid] || []), newTask] };
      });
    } catch (err) {
      console.error('Failed to add task', err);
    }
  };

  const handleToggleTask = async (taskId) => {
    // Find which bucket this task is in
    let foundBucket = null;
    let foundTask = null;
    for (const [bid, tasks] of Object.entries(tasksByBucket)) {
      const t = tasks.find(t => (t._id || t.id) === taskId);
      if (t) { foundBucket = bid; foundTask = t; break; }
    }
    if (!foundTask) return;

    const newCompleted = !foundTask.completed;

    // Optimistic update
    setTasksByBucket(prev => ({
      ...prev,
      [foundBucket]: prev[foundBucket].map(t =>
        (t._id || t.id) === taskId ? { ...t, completed: newCompleted } : t
      )
    }));

    try {
      const api = await import('../../services/api');
      await api.updateTask(taskId, { completed: newCompleted });
      // Refresh analytics to update streak/heatmap
      const analyticsData = await api.getAnalytics();
      setContributions(analyticsData.stats);
      setCurrentStreak(analyticsData.metrics?.currentStreak || 0);
      setLongestStreak(analyticsData.metrics?.longestStreak || 0);
    } catch (err) {
      console.error('Failed to toggle task', err);
      // Revert optimistic update
      setTasksByBucket(prev => ({
        ...prev,
        [foundBucket]: prev[foundBucket].map(t =>
          (t._id || t.id) === taskId ? { ...t, completed: foundTask.completed } : t
        )
      }));
    }
  };

  const handleEditTask = async (taskId, newText) => {
    // Optimistic update
    setTasksByBucket(prev => {
      const updated = {};
      for (const [bid, tasks] of Object.entries(prev)) {
        updated[bid] = tasks.map(t =>
          (t._id || t.id) === taskId ? { ...t, text: newText } : t
        );
      }
      return updated;
    });

    try {
      const api = await import('../../services/api');
      await api.updateTask(taskId, { text: newText });
    } catch (err) {
      console.error('Failed to edit task', err);
    }
  };

  const handleDeleteTask = async (taskId) => {
    // Optimistic remove
    setTasksByBucket(prev => {
      const updated = {};
      for (const [bid, tasks] of Object.entries(prev)) {
        updated[bid] = tasks.filter(t => (t._id || t.id) !== taskId);
      }
      return updated;
    });

    try {
      const api = await import('../../services/api');
      await api.deleteTask(taskId);
    } catch (err) {
      console.error('Failed to delete task', err);
    }
  };

  // ── Bucket handlers ────────────────────────────────────────────────────

  const handleAddBucket = async () => {
    if (!newBucketName.trim()) return;
    try {
      const api = await import('../../services/api');
      const bucket = await api.createBucket(newBucketName.trim());
      setBuckets(prev => [...prev, bucket]);
      setTasksByBucket(prev => ({ ...prev, [bucket._id.toString()]: [] }));
      setNewBucketName('');
      setIsAddingBucket(false);
    } catch (err) {
      console.error('Failed to create bucket', err);
    }
  };

  const handleDeleteBucket = async (bucketId) => {
    if (!window.confirm('Delete this list and all its cards?')) return;
    setBuckets(prev => prev.filter(b => b._id.toString() !== bucketId.toString()));
    setTasksByBucket(prev => {
      const updated = { ...prev };
      delete updated[bucketId.toString()];
      return updated;
    });
    try {
      const api = await import('../../services/api');
      await api.deleteBucket(bucketId);
    } catch (err) {
      console.error('Failed to delete bucket', err);
    }
  };

  const handleRenameBucket = async (bucketId, newName, newColor) => {
    setBuckets(prev =>
      prev.map(b => b._id.toString() === bucketId.toString()
        ? { ...b, name: newName, color: newColor !== undefined ? newColor : b.color }
        : b
      )
    );
    try {
      const api = await import('../../services/api');
      await api.updateBucket(bucketId, {
        name: newName,
        ...(newColor !== undefined ? { color: newColor } : {})
      });
    } catch (err) {
      console.error('Failed to rename bucket', err);
    }
  };

  // ── Drag and Drop ──────────────────────────────────────────────────────

  const handleDragStartTask = (e, task) => {
    setDraggingTask(task);
    // Find source bucket
    for (const [bid, tasks] of Object.entries(tasksByBucket)) {
      if (tasks.find(t => (t._id || t.id) === (task._id || task.id))) {
        setDraggingFromBucket(bid);
        break;
      }
    }
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEndTask = () => {
    setDraggingTask(null);
    setDraggingFromBucket(null);
  };

  const handleDropOnColumn = useCallback(async (e, targetBucketId) => {
    e.preventDefault();
    if (!draggingTask) return;
    const taskId = draggingTask._id || draggingTask.id;
    const sourceBucketId = draggingFromBucket;
    const targetBid = targetBucketId.toString();

    if (sourceBucketId === targetBid) return; // Same bucket — no-op (reorder handled by task drop)

    // Optimistic move to end of target bucket
    const targetTasks = tasksByBucket[targetBid] || [];
    const newPosition = targetTasks.length;

    setTasksByBucket(prev => {
      const updatedSource = (prev[sourceBucketId] || []).filter(t => (t._id || t.id) !== taskId);
      const movedTask = { ...draggingTask, bucketId: targetBucketId, position: newPosition };
      const updatedTarget = [...(prev[targetBid] || []), movedTask];
      return { ...prev, [sourceBucketId]: updatedSource, [targetBid]: updatedTarget };
    });

    setDraggingTask(null);
    setDraggingFromBucket(null);

    try {
      const api = await import('../../services/api');
      await api.moveTask(taskId, targetBucketId, newPosition);
    } catch (err) {
      console.error('Failed to move task', err);
    }
  }, [draggingTask, draggingFromBucket, tasksByBucket]);

  const handleDropOnTask = useCallback(async (e, dropTask) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggingTask) return;
    const dragId = draggingTask._id || draggingTask.id;
    const dropId = dropTask._id || dropTask.id;
    if (dragId === dropId) return;

    // Find buckets
    let sourceBid = draggingFromBucket;
    let targetBid = null;
    for (const [bid, tasks] of Object.entries(tasksByBucket)) {
      if (tasks.find(t => (t._id || t.id) === dropId)) { targetBid = bid; break; }
    }
    if (!targetBid) return;

    const isSameBucket = sourceBid === targetBid;

    setTasksByBucket(prev => {
      // Remove dragged task from source
      const sourceTasks = (prev[sourceBid] || []).filter(t => (t._id || t.id) !== dragId);
      const dropIndex = (prev[targetBid] || []).findIndex(t => (t._id || t.id) === dropId);

      if (isSameBucket) {
        // Reorder within same bucket
        const newTasks = [...sourceTasks];
        newTasks.splice(dropIndex, 0, { ...draggingTask, position: dropIndex });
        const reindexed = newTasks.map((t, i) => ({ ...t, position: i }));
        return { ...prev, [targetBid]: reindexed };
      } else {
        // Cross-bucket move
        const targetTasks = [...(prev[targetBid] || [])];
        targetTasks.splice(dropIndex, 0, { ...draggingTask, bucketId: targetBid, position: dropIndex });
        const reindexed = targetTasks.map((t, i) => ({ ...t, position: i }));
        return { ...prev, [sourceBid]: sourceTasks, [targetBid]: reindexed };
      }
    });

    setDraggingTask(null);
    setDraggingFromBucket(null);

    // Persist reorder
    try {
      const api = await import('../../services/api');
      if (isSameBucket) {
        const updated = (tasksByBucket[sourceBid] || [])
          .filter(t => (t._id || t.id) !== dragId);
        const dropIndex = updated.findIndex(t => (t._id || t.id) === dropId);
        updated.splice(dropIndex, 0, draggingTask);
        await api.reorderTasks(updated.map((t, i) => ({ id: t._id || t.id, position: i, bucketId: targetBid })));
      } else {
        await api.moveTask(dragId, targetBid, 0);
      }
    } catch (err) {
      console.error('Failed to persist task reorder', err);
    }
  }, [draggingTask, draggingFromBucket, tasksByBucket]);

  // ── Render ─────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0b0d1a' }}>
        <div className="flex flex-col items-center gap-4">
          <div
            className="w-10 h-10 rounded-full border-2 border-transparent animate-spin"
            style={{ borderTopColor: '#7c3aed', borderRightColor: '#2563eb' }}
          />
          <p className="text-white/40 text-sm">Loading your board...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        background: 'linear-gradient(135deg, #0b0d1a 0%, #0f1128 40%, #0d1020 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{ background: 'radial-gradient(circle, #7c3aed, transparent)' }}
        />
        <div
          className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
          style={{ background: 'radial-gradient(circle, #2563eb, transparent)' }}
        />
        <div
          className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-10"
          style={{ background: 'radial-gradient(circle, #0891b2, transparent)' }}
        />
      </div>

      {/* Board Header */}
      <div className="relative z-10">
        <BoardHeader
          boardName="Daily Tasks"
          currentStreak={currentStreak}
          longestStreak={longestStreak}
          totalCompleted={totalCompleted}
          onShowAnalytics={() => setShowAnalytics(p => !p)}
          showAnalytics={showAnalytics}
        />
      </div>

      {/* Analytics panel (collapsible) */}
      {showAnalytics && (
        <div
          className="relative z-10 border-b border-white/5"
          style={{ background: 'rgba(10, 12, 25, 0.9)' }}
        >
          <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Streak mini cards */}
            <div
              className="col-span-1 rounded-xl p-4 flex items-center gap-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(251, 146, 60, 0.15)' }}
              >
                <Icon name="Flame" size={24} color="#fb923c" />
              </div>
              <div>
                <p className="text-xs text-white/40">Current Streak</p>
                <p className="text-2xl font-bold text-white">{currentStreak} <span className="text-sm text-white/40 font-normal">days</span></p>
              </div>
            </div>
            <div
              className="col-span-1 rounded-xl p-4 flex items-center gap-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(124, 58, 237, 0.15)' }}
              >
                <Icon name="Trophy" size={24} color="#a78bfa" />
              </div>
              <div>
                <p className="text-xs text-white/40">Longest Streak</p>
                <p className="text-2xl font-bold text-white">{longestStreak} <span className="text-sm text-white/40 font-normal">days</span></p>
              </div>
            </div>
            <div
              className="col-span-1 rounded-xl p-4 flex items-center gap-4"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(52, 211, 153, 0.15)' }}
              >
                <Icon name="CheckCircle2" size={24} color="#34d399" />
              </div>
              <div>
                <p className="text-xs text-white/40">Tasks Completed</p>
                <p className="text-2xl font-bold text-white">{totalCompleted} <span className="text-sm text-white/40 font-normal">/ {totalTasks}</span></p>
              </div>
            </div>

            {/* Heatmap */}
            <div className="col-span-1 md:col-span-3">
              <ContributionCalendar contributions={contributions} />
            </div>
          </div>
        </div>
      )}

      {/* Board */}
      <div
        ref={boardRef}
        className="relative z-10 flex-1 flex items-start gap-4 p-4 overflow-x-auto"
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255,255,255,0.1) transparent',
          minHeight: 'calc(100vh - 60px)',
          paddingBottom: '80px', // room for MobileNav
        }}
        onDragEnd={handleDragEndTask}
      >
        {/* Bucket columns */}
        {buckets.map(bucket => (
          <BucketColumn
            key={bucket._id}
            bucket={bucket}
            tasks={tasksByBucket[bucket._id.toString()] || []}
            onAddTask={handleAddTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onToggleTask={handleToggleTask}
            onDeleteBucket={handleDeleteBucket}
            onRenameBucket={handleRenameBucket}
            onDragStartTask={handleDragStartTask}
            onDragOverColumn={() => {}}
            onDropOnColumn={handleDropOnColumn}
            onDropOnTask={handleDropOnTask}
            draggingTask={draggingTask}
          />
        ))}

        {/* Add another list */}
        <div className="flex-shrink-0" style={{ width: '280px' }}>
          {isAddingBucket ? (
            <div
              className="rounded-xl p-3 space-y-2"
              style={{
                background: 'rgba(22, 27, 45, 0.85)',
                border: '1.5px solid rgba(255,255,255,0.08)',
              }}
            >
              <input
                autoFocus
                className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-violet-400 transition-colors"
                placeholder="Enter list name..."
                value={newBucketName}
                onChange={(e) => setNewBucketName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleAddBucket();
                  if (e.key === 'Escape') { setIsAddingBucket(false); setNewBucketName(''); }
                }}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAddBucket}
                  disabled={!newBucketName.trim()}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white' }}
                >
                  Add list
                </button>
                <button
                  onClick={() => { setIsAddingBucket(false); setNewBucketName(''); }}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <Icon name="X" size={16} />
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingBucket(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all group"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1.5px dashed rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.5)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(124,58,237,0.1)';
                e.currentTarget.style.borderColor = 'rgba(124,58,237,0.4)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              <Icon name="Plus" size={16} />
              Add another list
            </button>
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  );
};

export default Dashboard;