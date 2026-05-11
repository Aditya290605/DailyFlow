import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import TaskCard from './TaskCard';

const COLUMN_COLORS = [
  '#7c3aed', '#2563eb', '#0891b2', '#059669', '#d97706', '#dc2626', '#db2777', '#9333ea'
];

const BucketColumn = ({
  bucket,
  tasks,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onToggleTask,
  onDeleteBucket,
  onRenameBucket,
  onDragStartTask,
  onDragOverColumn,
  onDropOnColumn,
  onDropOnTask,
  draggingTask,
}) => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskText, setNewTaskText] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [bucketName, setBucketName] = useState(bucket.name);
  const [showMenu, setShowMenu] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const addInputRef = useRef(null);
  const menuRef = useRef(null);

  const completedCount = tasks.filter(t => t.completed).length;

  const handleAddTask = async () => {
    if (!newTaskText.trim()) return;
    await onAddTask(newTaskText.trim(), bucket._id);
    setNewTaskText('');
    setIsAddingTask(false);
  };

  const handleRenameBlur = () => {
    setIsEditingName(false);
    if (bucketName.trim() && bucketName.trim() !== bucket.name) {
      onRenameBucket(bucket._id, bucketName.trim());
    } else {
      setBucketName(bucket.name);
    }
  };

  const handleColumnDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
    onDragOverColumn && onDragOverColumn(e, bucket._id);
  };

  const handleColumnDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    onDropOnColumn && onDropOnColumn(e, bucket._id);
  };

  const handleColumnDragLeave = (e) => {
    // Only fire if leaving the column entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsDragOver(false);
    }
  };

  return (
    <div
      className="flex-shrink-0 flex flex-col rounded-xl"
      style={{
        width: '280px',
        background: 'rgba(22, 27, 45, 0.85)',
        border: isDragOver
          ? '1.5px solid rgba(124, 58, 237, 0.6)'
          : '1.5px solid rgba(255,255,255,0.07)',
        boxShadow: isDragOver
          ? '0 0 20px rgba(124, 58, 237, 0.15)'
          : '0 4px 24px rgba(0,0,0,0.25)',
        transition: 'border-color 0.15s, box-shadow 0.15s',
        maxHeight: 'calc(100vh - 140px)',
      }}
      onDragOver={handleColumnDragOver}
      onDrop={handleColumnDrop}
      onDragLeave={handleColumnDragLeave}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          {/* Color dot */}
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: bucket.color || '#7c3aed' }}
          />

          {isEditingName ? (
            <input
              autoFocus
              className="flex-1 text-sm font-semibold text-white bg-white/10 border border-white/20 rounded px-2 py-0.5 outline-none focus:border-violet-400"
              value={bucketName}
              onChange={(e) => setBucketName(e.target.value)}
              onBlur={handleRenameBlur}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameBlur();
                if (e.key === 'Escape') { setBucketName(bucket.name); setIsEditingName(false); }
              }}
            />
          ) : (
            <span
              className="text-sm font-semibold text-white/90 cursor-pointer hover:text-white truncate"
              onDoubleClick={() => setIsEditingName(true)}
              title="Double-click to rename"
            >
              {bucket.name}
            </span>
          )}

          {/* Task count badge */}
          <span
            className="flex-shrink-0 text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)' }}
          >
            {tasks.length}
          </span>
        </div>

        {/* Column menu */}
        <div className="relative ml-2" ref={menuRef}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
          >
            <Icon name="MoreHorizontal" size={16} />
          </button>

          {showMenu && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
              <div
                className="absolute right-0 top-8 z-20 w-44 rounded-xl overflow-hidden shadow-2xl"
                style={{ background: 'rgba(20, 24, 40, 0.97)', border: '1px solid rgba(255,255,255,0.1)' }}
              >
                <button
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/70 hover:text-white hover:bg-white/8 transition-colors text-left"
                  onClick={() => { setIsEditingName(true); setShowMenu(false); }}
                >
                  <Icon name="Pencil" size={14} />
                  Rename
                </button>

                {/* Color pickers */}
                <div className="px-4 py-2.5 border-t border-white/5">
                  <p className="text-xs text-white/30 mb-2">Color</p>
                  <div className="flex flex-wrap gap-1.5">
                    {COLUMN_COLORS.map(c => (
                      <button
                        key={c}
                        className="w-5 h-5 rounded-full hover:scale-110 transition-transform"
                        style={{
                          backgroundColor: c,
                          outline: bucket.color === c ? '2px solid white' : 'none',
                          outlineOffset: '1px'
                        }}
                        onClick={() => { onRenameBucket(bucket._id, bucket.name, c); setShowMenu(false); }}
                      />
                    ))}
                  </div>
                </div>

                <button
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors text-left border-t border-white/5"
                  onClick={() => { onDeleteBucket(bucket._id); setShowMenu(false); }}
                >
                  <Icon name="Trash2" size={14} />
                  Delete list
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Completed progress bar */}
      {tasks.length > 0 && (
        <div className="px-4 pb-2">
          <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.round((completedCount / tasks.length) * 100)}%`,
                background: 'linear-gradient(90deg, #7c3aed, #2563eb)'
              }}
            />
          </div>
          {completedCount > 0 && (
            <p className="text-xs text-white/30 mt-1">
              {completedCount}/{tasks.length} done
            </p>
          )}
        </div>
      )}

      {/* Task list */}
      <div
        className="flex-1 overflow-y-auto px-3 pb-2 space-y-2"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
      >
        {tasks.length === 0 && !isDragOver && (
          <div
            className="flex flex-col items-center justify-center py-8 text-center rounded-lg"
            style={{ border: '1.5px dashed rgba(255,255,255,0.07)' }}
          >
            <Icon name="LayoutList" size={24} color="rgba(255,255,255,0.15)" />
            <p className="text-xs text-white/25 mt-2">No cards yet</p>
          </div>
        )}

        {isDragOver && tasks.length === 0 && (
          <div
            className="h-16 rounded-lg"
            style={{ border: '1.5px dashed rgba(124,58,237,0.5)', background: 'rgba(124,58,237,0.05)' }}
          />
        )}

        {tasks.map(task => (
          <TaskCard
            key={task._id || task.id}
            task={task}
            onToggle={onToggleTask}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
            onDragStart={onDragStartTask}
            onDrop={onDropOnTask}
            isDragging={draggingTask?._id === (task._id || task.id)}
          />
        ))}
      </div>

      {/* Add card form */}
      <div className="px-3 pb-3">
        {isAddingTask ? (
          <div
            className="rounded-lg p-3 space-y-2"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <textarea
              ref={addInputRef}
              autoFocus
              rows={2}
              placeholder="Enter a title for this card..."
              className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none resize-none"
              value={newTaskText}
              onChange={(e) => setNewTaskText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleAddTask(); }
                if (e.key === 'Escape') { setIsAddingTask(false); setNewTaskText(''); }
              }}
            />
            <div className="flex items-center gap-2">
              <button
                onClick={handleAddTask}
                disabled={!newTaskText.trim()}
                className="px-3 py-1.5 rounded-lg text-sm font-medium transition-all disabled:opacity-40"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #2563eb)', color: 'white' }}
              >
                Add card
              </button>
              <button
                onClick={() => { setIsAddingTask(false); setNewTaskText(''); }}
                className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAddingTask(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-white/40 hover:text-white/70 hover:bg-white/5 transition-all"
          >
            <Icon name="Plus" size={16} />
            Add a card
          </button>
        )}
      </div>
    </div>
  );
};

export default BucketColumn;
