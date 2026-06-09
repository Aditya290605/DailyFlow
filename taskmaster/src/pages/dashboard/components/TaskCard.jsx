import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TaskCard = ({ task, onToggle, onEdit, onDelete, onDragStart, onDrop, isDragging }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task?.text || '');
  const [showActions, setShowActions] = useState(false);

  const taskId = task?._id || task?.id;

  const handleSave = () => {
    if (editedText.trim() && editedText.trim() !== task.text) {
      onEdit(taskId, editedText.trim());
    }
    setIsEditing(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div
      draggable={!isEditing}
      onDragStart={(e) => onDragStart && onDragStart(e, task)}
      onDragOver={handleDragOver}
      onDrop={(e) => onDrop && onDrop(e, task)}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
      className="relative group rounded-lg transition-all duration-150"
      style={{
        background: isDragging ? 'rgba(16, 185, 129, 0.15)' : 'rgba(30, 35, 55, 0.9)',
        border: isDragging
          ? '1.5px solid rgba(16, 185, 129, 0.5)'
          : '1.5px solid rgba(255,255,255,0.06)',
        boxShadow: isDragging
          ? '0 8px 32px rgba(16,185,129,0.2)'
          : '0 2px 8px rgba(0,0,0,0.2)',
        opacity: isDragging ? 0.7 : 1,
        cursor: isEditing ? 'default' : 'grab',
        transform: isDragging ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {/* Completed indicator bar */}
      {task?.completed && (
        <div
          className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l-lg"
          style={{ background: 'linear-gradient(180deg, #34d399, #059669)' }}
        />
      )}

      <div className="p-3">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              autoFocus
              rows={2}
              className="w-full bg-white/5 border border-white/15 rounded-md px-2.5 py-1.5 text-sm text-white placeholder-white/30 outline-none focus:border-emerald-400 resize-none transition-colors"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSave(); }
                if (e.key === 'Escape') { setEditedText(task.text); setIsEditing(false); }
              }}
            />
            <div className="flex gap-1.5">
              <button
                onClick={handleSave}
                className="px-2.5 py-1 rounded-md text-xs font-medium transition-all"
                style={{ background: 'linear-gradient(135deg, #10B981, #059669)', color: 'white' }}
              >
                Save
              </button>
              <button
                onClick={() => { setEditedText(task.text); setIsEditing(false); }}
                className="px-2.5 py-1 rounded-md text-xs font-medium text-white/50 hover:text-white hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2.5">
            {/* Checkbox */}
            <button
              onClick={() => onToggle(taskId)}
              className="flex-shrink-0 mt-0.5 w-4 h-4 rounded border transition-all duration-200"
              style={{
                background: task?.completed ? 'linear-gradient(135deg, #34d399, #059669)' : 'transparent',
                border: task?.completed ? 'none' : '1.5px solid rgba(255,255,255,0.2)',
                boxShadow: task?.completed ? '0 0 8px rgba(52,211,153,0.3)' : 'none',
              }}
            >
              {task?.completed && (
                <svg viewBox="0 0 12 12" fill="none" className="w-full h-full p-0.5">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </button>

            {/* Text */}
            <p
              className="flex-1 text-sm leading-relaxed"
              style={{
                color: task?.completed ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.85)',
                textDecoration: task?.completed ? 'line-through' : 'none',
              }}
            >
              {task?.text}
            </p>

            {/* Actions (shown on hover) */}
            <div
              className="flex-shrink-0 flex items-center gap-0.5 transition-all duration-150"
              style={{ opacity: showActions ? 1 : 0 }}
            >
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 rounded-md text-white/30 hover:text-white/70 hover:bg-white/10 transition-colors"
                title="Edit"
              >
                <Icon name="Pencil" size={12} />
              </button>
              <button
                onClick={() => onDelete(taskId)}
                className="p-1 rounded-md text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Delete"
              >
                <Icon name="Trash2" size={12} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;