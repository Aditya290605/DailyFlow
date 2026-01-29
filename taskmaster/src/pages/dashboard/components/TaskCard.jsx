import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const TaskCard = ({ task, onToggle, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task?.text);

  const handleSave = () => {
    if (editedText?.trim()) {
      onEdit(task?.id, editedText?.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedText(task?.text);
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-5 lg:p-6 transition-smooth hover:border-primary/30">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="pt-1">
          <Checkbox
            checked={task?.completed}
            onChange={() => onToggle(task?._id || task?.id)}
            size="lg"
          />
        </div>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <Input
                type="text"
                value={editedText}
                onChange={(e) => setEditedText(e?.target?.value)}
                placeholder="Enter task description"
                className="w-full"
              />
              <div className="flex items-center gap-2">
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    if (editedText?.trim()) {
                      onEdit(task?._id || task?.id, editedText?.trim());
                      setIsEditing(false);
                    }
                  }}
                  iconName="Check"
                  iconPosition="left"
                >
                  Save
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancel}
                  iconName="X"
                  iconPosition="left"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className={`text-sm md:text-base lg:text-lg ${task?.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
              {task?.text}
            </p>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Edit task"
            >
              <Icon name="Pencil" size={18} className="text-muted-foreground" />
            </button>
            <button
              onClick={() => onDelete(task?._id || task?.id)}
              className="p-2 rounded-lg hover:bg-destructive/10 transition-smooth"
              aria-label="Delete task"
            >
              <Icon name="Trash2" size={18} className="text-destructive" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;